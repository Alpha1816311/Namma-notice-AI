import React from 'react';
import { X, Terminal, Copy, Check, ExternalLink, Cpu, ShieldCheck } from 'lucide-react';

interface RunLocallyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RunLocallyModal: React.FC<RunLocallyModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  if (!isOpen) return null;

  const copyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-mono">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Run NammaNotice AI Locally</h3>
              <p className="text-xs text-slate-500">Hacktoberfest Hack Day Bengaluru × IEEE CIS Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-xs text-slate-700">
          {/* Architecture Overview */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
              <Cpu className="w-4 h-4 text-amber-700" />
              <span>Gemma 4 Multimodal Architecture</span>
            </div>
            <p className="text-amber-950 leading-relaxed">
              NammaNotice AI runs fullstack TypeScript with an Express backend proxying official Google{' '}
              <code className="font-mono text-amber-900 font-bold">@google/genai</code> SDK calls to the{' '}
              <code className="font-mono text-amber-900 font-bold">models/gemma-4-26b-a4b-it</code> model.
              Browser clients communicate solely through server API routes, keeping API keys strictly confidential.
            </p>
          </div>

          {/* Step 1: Clone & Install */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">1. Install Dependencies</h4>
            <div className="relative group bg-slate-900 rounded-xl p-3.5 text-slate-100 font-mono text-[11px] overflow-x-auto">
              <p className="text-slate-400"># Install client &amp; server dependencies</p>
              <code>npm install</code>
              <button
                onClick={() => copyCode('npm install', 1)}
                className="absolute right-3 top-3 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy command"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 2: Configure Secrets */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">2. Configure Environment Secret</h4>
            <p className="text-slate-600 mb-2">
              Create a <code className="font-mono text-slate-800 font-bold">.env</code> file in the project root:
            </p>
            <div className="relative group bg-slate-900 rounded-xl p-3.5 text-slate-100 font-mono text-[11px] overflow-x-auto">
              <p className="text-slate-400"># Required Gemini API Key with Gemma 4 model access</p>
              <code>GEMINI_API_KEY="your-gemini-api-key-here"</code>
              <button
                onClick={() => copyCode('GEMINI_API_KEY="your-gemini-api-key-here"', 2)}
                className="absolute right-3 top-3 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy snippet"
              >
                {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 3: Run Dev Server */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">3. Start Fullstack Dev Server</h4>
            <div className="relative group bg-slate-900 rounded-xl p-3.5 text-slate-100 font-mono text-[11px] overflow-x-auto">
              <p className="text-slate-400"># Launches Express + Vite middleware at http://localhost:3000</p>
              <code>npm run dev</code>
              <button
                onClick={() => copyCode('npm run dev', 3)}
                className="absolute right-3 top-3 p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy command"
              >
                {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 4: Verification Endpoints */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">4. Built-in Verification Endpoints</h4>
            <div className="space-y-1.5 text-slate-600">
              <p>
                <code className="font-mono font-bold text-slate-800">GET /api/status</code> — Live Gemma 4 connectivity test and token latency ping.
              </p>
              <p>
                <code className="font-mono font-bold text-slate-800">POST /api/analyze-notice</code> — Primary multimodal circular extraction route.
              </p>
              <p>
                <code className="font-mono font-bold text-slate-800">POST /api/ask-notice</code> — Grounded citizen Q&amp;A on notice images.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-100 flex items-center justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
