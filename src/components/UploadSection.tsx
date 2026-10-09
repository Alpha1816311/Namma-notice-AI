import React, { useState, useRef } from 'react';
import { Upload, FileImage, Sparkles, X, Eye, FileText, Check, ArrowRight, AlertTriangle } from 'lucide-react';
import { LanguageCode, SampleNotice } from '../types/notice';
import { UI_TRANSLATIONS } from '../utils/translations';
import { SAMPLE_NOTICES, svgToPngDataUrl } from '../data/sampleNotices';

interface UploadSectionProps {
  language: LanguageCode;
  selectedImage: string | null;
  onImageSelected: (base64: string, name?: string) => void;
  onClearImage: () => void;
  onAnalyze: (model: string) => void;
  isAnalyzing: boolean;
  onInspectImage: () => void;
  errorMessage: string | null;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  language,
  selectedImage,
  onImageSelected,
  onClearImage,
  onAnalyze,
  isAnalyzing,
  onInspectImage,
  errorMessage,
}) => {
  const t = UI_TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('gemma-4-26b-a4b-it');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setActiveSampleId(null);
      onImageSelected(result, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setActiveSampleId(null);
        onImageSelected(result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = async (sample: SampleNotice) => {
    setActiveSampleId(sample.id);
    const pngData = await svgToPngDataUrl(sample.svgContent);
    onImageSelected(pngData, sample.name);
  };

  return (
    <div className="w-full">
      {/* Hero Description */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Hacktoberfest Hack Day Bengaluru × IEEE CIS · Gemma 4 Multimodal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
          {t.tagline}
        </h2>
        <p className="text-sm text-slate-600">
          Decodes Kannada & English circulars, marks unreadable or missing dates, and produces an actionable next-step checklist without hallucinations.
        </p>
      </div>

      {/* Main Upload & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Upload Dropzone or Active Preview */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{t.uploadTitle}</h3>
              <p className="text-xs text-slate-500">{t.uploadSubtitle}</p>
            </div>
            {selectedImage && (
              <button
                onClick={onClearImage}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 transition-colors px-2 py-1 rounded hover:bg-rose-50"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>

          {!selectedImage ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-amber-500 bg-amber-50/50 scale-[0.99]'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/jpg"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-3 shadow-2xs">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-800 mb-1">
                {t.dragDropText}{' '}
                <span className="text-amber-700 underline font-semibold">{t.browseFiles}</span>
              </p>
              <p className="text-xs text-slate-500">{t.supportedFormats}</p>
              <p className="text-[11px] text-slate-400 mt-3">
                Works with phone photos of notice boards, newspaper clips, and PDF screenshots
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-[380px] flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Uploaded public notice"
                  className="w-full h-auto max-h-[360px] object-contain object-top"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={onInspectImage}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-medium shadow-md hover:bg-slate-50 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Zoom & Inspect</span>
                  </button>
                  <button
                    onClick={onClearImage}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-medium shadow-md hover:bg-rose-700 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Change Image</span>
                  </button>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <label htmlFor="model-select" className="text-xs font-medium text-slate-600">Model:</label>
                  <select
                    id="model-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="gemma-4-26b-a4b-it">Gemma 4 26B A4B IT (Fast)</option>
                    <option value="gemma-4-31b-it">Gemma 4 31B IT (High Capacity)</option>
                  </select>
                </div>

                <button
                  onClick={() => onAnalyze(selectedModel)}
                  disabled={isAnalyzing}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm transition-all"
                >
                  <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  <span>{isAnalyzing ? t.analyzingButton : t.analyzeButton}</span>
                </button>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">Model Processing Alert</p>
                <p className="text-rose-700">{errorMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pre-configured Bengaluru / Karnataka Sample Notices */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="mb-3.5">
            <h3 className="text-base font-semibold text-slate-900">{t.sampleNoticesTitle}</h3>
            <p className="text-xs text-slate-500">{t.sampleNoticesSubtitle}</p>
          </div>

          <div className="space-y-2.5">
            {SAMPLE_NOTICES.map((sample) => {
              const isSelected = activeSampleId === sample.id;
              return (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                      {sample.badge}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        <Check className="w-3 h-3" /> Selected
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-0.5">{sample.name}</h4>
                  <p className="text-[11px] font-medium text-slate-600 mb-1">{sample.nameKannada}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{sample.summary}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Includes SSP, BBMP &amp; VTU circulars</span>
            <span>Forensic seal &amp; Kannada OCR</span>
          </div>
        </div>
      </div>
    </div>
  );
};
