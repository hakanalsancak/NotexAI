'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Sparkles, Pin, Archive, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { AIEnhanceModal } from '@/components/editor/AIEnhanceModal';
import { updateNote, deleteNote } from '@/lib/notes-actions';
import toast from 'react-hot-toast';

interface NoteEditorProps {
  note: {
    id: string;
    title: string;
    content: string;
    isPinned: boolean;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function NoteEditor({ note }: NoteEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes
  useEffect(() => {
    setHasChanges(title !== note.title || content !== note.content);
  }, [title, content, note.title, note.content]);

  // Auto-save on changes (debounced)
  useEffect(() => {
    if (!hasChanges) return;

    const timer = setTimeout(() => {
      handleSave(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, content, hasChanges]);

  async function handleSave(auto = false) {
    if (!hasChanges && !auto) return;
    
    setIsSaving(true);
    const result = await updateNote(note.id, { title, content });
    
    if (result.success) {
      if (!auto) toast.success('Saved!');
      setHasChanges(false);
    } else {
      toast.error(result.error || 'Failed to save');
    }
    setIsSaving(false);
  }

  async function handlePin() {
    const result = await updateNote(note.id, { isPinned: !note.isPinned });
    if (result.success) {
      toast.success(note.isPinned ? 'Unpinned' : 'Pinned!');
      router.refresh();
    } else {
      toast.error(result.error || 'Failed to update');
    }
  }

  async function handleArchive() {
    const result = await updateNote(note.id, { isArchived: !note.isArchived });
    if (result.success) {
      toast.success(note.isArchived ? 'Restored' : 'Archived');
      router.push('/dashboard');
    } else {
      toast.error(result.error || 'Failed to update');
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    const result = await deleteNote(note.id);
    if (result.success) {
      toast.success('Note deleted');
      router.push('/dashboard');
    } else {
      toast.error(result.error || 'Failed to delete');
    }
  }

  function handleAIEnhance(enhancedContent: string) {
    setContent(enhancedContent);
    setIsAIModalOpen(false);
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-midnight-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to notes</span>
        </Link>
        
        <div className="flex items-center gap-2 flex-wrap">
          {/* AI Enhance Button */}
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Enhance with AI</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Pin Button */}
          <button
            onClick={handlePin}
            className={`p-2 rounded-lg transition-colors ${
              note.isPinned 
                ? 'bg-amber-500/20 text-amber-400' 
                : 'hover:bg-white/10 text-midnight-300'
            }`}
            title={note.isPinned ? 'Unpin' : 'Pin'}
          >
            <Pin className={`w-5 h-5 ${note.isPinned ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Archive Button */}
          <button
            onClick={handleArchive}
            className="p-2 rounded-lg hover:bg-white/10 text-midnight-300 transition-colors"
            title={note.isArchived ? 'Restore' : 'Archive'}
          >
            <Archive className="w-5 h-5" />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg hover:bg-coral-500/20 text-coral-400 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Save Button */}
          <button
            onClick={() => handleSave()}
            disabled={isSaving || !hasChanges}
            className="btn-primary flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span className="hidden sm:inline">
                  {hasChanges ? 'Save' : 'Saved'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Auto-save indicator */}
      {hasChanges && (
        <div className="text-xs text-midnight-400 mb-4">
          Auto-saving changes...
        </div>
      )}

      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title..."
        className="w-full text-3xl font-display font-bold bg-transparent border-none outline-none text-white placeholder-midnight-500 mb-6"
      />

      {/* Editor */}
      <RichTextEditor
        content={content}
        onChange={setContent}
        placeholder="Start writing your thoughts..."
      />

      {/* AI Enhancement Modal */}
      <AIEnhanceModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        content={content}
        onApply={handleAIEnhance}
      />
    </>
  );
}
