import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { AnalysisView } from './components/AnalysisView';
import { RunLocallyModal } from './components/RunLocallyModal';
import { NoticeInspectorModal } from './components/NoticeInspectorModal';
import { LanguageCode, NoticeAnalysis, ModelStatus } from './types/notice';
import { UI_TRANSLATIONS } from './utils/translations';
import { Sparkles, ArrowUp, RefreshCw } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<NoticeAnalysis | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('gemma-4-26b-a4b-it');
  const [modelStatus, setModelStatus] = useState<ModelStatus | null>(null);
  const [isRunLocallyOpen, setIsRunLocallyOpen] = useState<boolean>(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[language];

  // Check model connectivity on startup
  const fetchModelStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setModelStatus(data);
    } catch (err: any) {
      console.warn('Could not fetch model status:', err);
      setModelStatus({
        ok: false,
        status: 'error',
        model: 'gemma-4-26b-a4b-it',
        supportedModels: ['gemma-4-26b-a4b-it', 'gemma-4-31b-it'],
        testedLive: false,
        error: err.message,
      });
    }
  };

  useEffect(() => {
    fetchModelStatus();
  }, []);

  const handleImageSelected = (base64: string, name?: string) => {
    setSelectedImage(base64);
    setImageFileName(name || 'Uploaded Circular');
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImageFileName(null);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleAnalyze = async (modelToUse: string) => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setErrorMessage(null);
    setSelectedModel(modelToUse);

    try {
      const res = await fetch('/api/analyze-notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          language,
          selectedModel: modelToUse,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze notice with Gemma 4.');
      }

      setAnalysisResult(data.data);

      // Smooth scroll down to results
      setTimeout(() => {
        document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(
        err.message ||
          'Failed to decode notice. Please ensure your image is legible and your GEMINI_API_KEY has Gemma 4 access.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Re-run analysis if citizen switches language after having results
  const handleLanguageChange = (newLang: LanguageCode) => {
    setLanguage(newLang);
    // If we have an active notice and image, auto-trigger translation analysis in the new language
    if (analysisResult && selectedImage && !isAnalyzing) {
      // Prompt user or re-run seamlessly
      setTimeout(() => {
        fetch('/api/analyze-notice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: selectedImage,
            language: newLang,
            selectedModel,
          }),
        })
          .then((r) => r.json())
          .then((d) => {
            if (d.success) {
              setAnalysisResult(d.data);
            }
          })
          .catch((e) => console.warn('Language switch analysis failed:', e));
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navigation & Status */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        modelStatus={modelStatus}
        onRefreshModelStatus={fetchModelStatus}
        onOpenRunLocally={() => setIsRunLocallyOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Upload & Sample Selector Section */}
        <UploadSection
          language={language}
          selectedImage={selectedImage}
          onImageSelected={handleImageSelected}
          onClearImage={handleClearImage}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          onInspectImage={() => setIsInspectorOpen(true)}
          errorMessage={errorMessage}
        />

        {/* Results Section */}
        {analysisResult && (
          <div id="analysis-results" className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  Forensic Extraction Results
                </h3>
              </div>
              <button
                onClick={() => handleAnalyze(selectedModel)}
                disabled={isAnalyzing}
                className="flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-900 font-medium px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>Re-Analyze</span>
              </button>
            </div>

            <AnalysisView
              analysis={analysisResult}
              language={language}
              originalImage={selectedImage}
              onInspectImage={() => setIsInspectorOpen(true)}
              selectedModel={selectedModel}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">NammaNotice AI</span>
            <span>·</span>
            <span>Hacktoberfest Hack Day Bengaluru × IEEE CIS</span>
            <span>·</span>
            <span className="text-amber-700 font-semibold">Best Use of Gemma 4</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Server-side @google/genai SDK</span>
            <span>·</span>
            <span>Multimodal Vision</span>
            <span>·</span>
            <span>Zero Hallucination Fact Flagging</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RunLocallyModal
        isOpen={isRunLocallyOpen}
        onClose={() => setIsRunLocallyOpen(false)}
      />

      <NoticeInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        imageUrl={selectedImage}
        title={imageFileName || 'Notice'}
      />
    </div>
  );
}
