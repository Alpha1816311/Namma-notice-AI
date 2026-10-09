import React from 'react';
import { Sparkles, Terminal, Globe, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { LanguageCode, ModelStatus } from '../types/notice';
import { UI_TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  modelStatus: ModelStatus | null;
  onRefreshModelStatus: () => void;
  onOpenRunLocally: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  modelStatus,
  onRefreshModelStatus,
  onOpenRunLocally,
}) => {
  const t = UI_TRANSLATIONS[language];

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Context */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
            ನ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {t.appTitle}
              </h1>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 rounded px-1.5 py-0.5">
                Gemma 4
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {t.appSubtitle} <span className="text-slate-300">·</span> Hack Day Bengaluru × IEEE CIS
            </p>
          </div>
        </div>

        {/* Status Pill, Language Selector, and Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Live Gemma 4 Model Status Pill */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
              modelStatus?.ok
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                : modelStatus?.status === 'missing_key'
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
            title={
              modelStatus?.ok
                ? `Model: ${modelStatus.model} | Latency: ${modelStatus.latencyMs}ms | Live Verified`
                : modelStatus?.error || 'Checking model status'
            }
          >
            {modelStatus?.ok ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            )}
            <span className="truncate max-w-[150px] sm:max-w-none">
              {modelStatus?.ok
                ? `gemma-4-26b-a4b-it · ${modelStatus.latencyMs ?? 0}ms`
                : modelStatus?.status === 'missing_key'
                ? 'API Key Needed in Secrets'
                : 'Model Connecting...'}
            </span>
            <button
              onClick={onRefreshModelStatus}
              className="p-0.5 hover:bg-black/5 rounded transition-colors text-slate-500"
              title="Re-verify model connectivity"
              aria-label="Re-verify model connectivity"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-0.5" />
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-md font-medium transition-colors ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => onLanguageChange('kn')}
              className={`px-2 py-1 rounded-md font-medium transition-colors ${
                language === 'kn'
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 rounded-md font-medium transition-colors ${
                language === 'hi'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Run Locally Button */}
          <button
            onClick={onOpenRunLocally}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.runLocallyBtn}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
