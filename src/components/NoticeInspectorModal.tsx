import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

interface NoticeInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  title?: string;
}

export const NoticeInspectorModal: React.FC<NoticeInspectorModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
}) => {
  const [zoom, setZoom] = useState(1);

  if (!isOpen || !imageUrl) return null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden border border-slate-200 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Document Forensic Viewer</h3>
            <p className="text-xs text-slate-500 truncate max-w-[300px] sm:max-w-md">
              {title || 'Original Uploaded Notice'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={handleZoomOut}
                className="p-1 text-slate-600 hover:text-slate-900 rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-medium px-2 text-slate-700">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1 text-slate-600 hover:text-slate-900 rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 text-slate-600 hover:text-slate-900 rounded ml-1 border-l border-slate-200"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href={imageUrl}
              download="NammaNotice_Document.png"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              title="Download image"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Image Pan & Scroll Area */}
        <div className="flex-1 bg-slate-100 overflow-auto p-4 flex items-center justify-center">
          <div
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
            className="transition-transform duration-150 max-w-full"
          >
            <img
              src={imageUrl}
              alt="Public notice original document"
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-md border border-slate-300 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
