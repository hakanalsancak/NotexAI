'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Wand2, BookOpen, CheckCircle, List, Loader2, AlertCircle } from 'lucide-react';

interface AIEnhanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  onApply: (enhancedContent: string) => void;
}

const enhancementOptions = [
  {
    id: 'improve',
    name: 'Improve Writing',
    description: 'Fix grammar, enhance clarity, and improve flow',
    icon: Wand2,
    prompt: 'improve',
  },
  {
    id: 'summarize',
    name: 'Summarize',
    description: 'Create a concise summary of the content',
    icon: BookOpen,
    prompt: 'summarize',
  },
  {
    id: 'expand',
    name: 'Expand Ideas',
    description: 'Elaborate on key points with more detail',
    icon: List,
    prompt: 'expand',
  },
  {
    id: 'professional',
    name: 'Make Professional',
    description: 'Convert to a professional, formal tone',
    icon: CheckCircle,
    prompt: 'professional',
  },
];

export function AIEnhanceModal({ isOpen, onClose, content, onApply }: AIEnhanceModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [enhancedContent, setEnhancedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure portal only renders on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleEnhance(option: typeof enhancementOptions[0]) {
    if (!content.trim()) {
      setError('Please add some content to enhance first');
      return;
    }

    setSelectedOption(option.id);
    setIsLoading(true);
    setError(null);
    setEnhancedContent(null);

    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          type: option.prompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to enhance content');
      }

      setEnhancedContent(data.enhanced);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  function handleApply() {
    if (enhancedContent) {
      onApply(enhancedContent);
      handleReset();
    }
  }

  function handleReset() {
    setSelectedOption(null);
    setEnhancedContent(null);
    setError(null);
  }

  function handleClose() {
    handleReset();
    onClose();
  }

  // Don't render anything on server side
  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl max-h-[80vh] glass-card rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold">AI Enhancement</h2>
                  <p className="text-sm text-midnight-400">Transform your notes with AI</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-midnight-300" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!enhancedContent && !isLoading ? (
                <>
                  {error && (
                    <div className="mb-4 p-4 rounded-xl bg-coral-500/20 border border-coral-500/30 flex items-center gap-3 text-coral-300">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  <p className="text-midnight-300 mb-6">
                    Select how you'd like AI to enhance your note:
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {enhancementOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleEnhance(option)}
                        className={`
                          p-4 rounded-xl text-left transition-all duration-200 border
                          ${selectedOption === option.id
                            ? 'border-purple-500/50 bg-purple-500/20'
                            : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                            <option.icon className="w-4 h-4 text-purple-300" />
                          </div>
                          <span className="font-semibold text-white">{option.name}</span>
                        </div>
                        <p className="text-sm text-midnight-400">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center mb-4">
                    <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                  </div>
                  <p className="text-midnight-300">Enhancing your content...</p>
                  <p className="text-sm text-midnight-500 mt-1">This may take a few seconds</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-midnight-300">Here's your enhanced content:</p>
                    <button
                      onClick={handleReset}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Try another option
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-midnight-900/50 border border-white/10 max-h-[300px] overflow-y-auto">
                    <div
                      className="prose prose-invert max-w-none text-sm"
                      dangerouslySetInnerHTML={{ __html: enhancedContent || '' }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {enhancedContent && (
              <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  className="btn-primary flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Apply Changes
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
