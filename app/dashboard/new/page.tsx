'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Sparkles, Pin, Archive, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { AIEnhanceModal } from '@/components/editor/AIEnhanceModal';
import { createNote } from '@/lib/notes-actions';
import toast from 'react-hot-toast';

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  async function handleSave() {
    if (!title.trim() && !content.trim()) {
      toast.error('Please add a title or content');
      return;
    }

    setIsSaving(true);
    const result = await createNote({
      title: title || 'Untitled',
      content,
      isPinned,
      isArchived,
    });

    if (result.success && result.note) {
      toast.success('Note created!');
      router.push(`/dashboard/note/${result.note.id}`);
    } else {
      toast.error(result.error || 'Failed to create note');
    }
    setIsSaving(false);
  }

  function handlePin() {
    setIsPinned(!isPinned);
    toast.success(isPinned ? 'Will not be pinned' : 'Will be pinned on save');
  }

  function handleArchive() {
    setIsArchived(!isArchived);
    toast.success(isArchived ? 'Will not be archived' : 'Will be archived on save');
  }

  function handleDiscard() {
    if ((title.trim() || content.trim()) && !confirm('Discard this note? Your changes will be lost.')) {
      return;
    }
    router.push('/dashboard');
  }

  function handleAIApply(enhancedContent: string) {
    setContent(enhancedContent);
    setIsAIModalOpen(false);
    toast.success('Content enhanced!');
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
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
              isPinned 
                ? 'bg-amber-500/20 text-amber-400' 
                : 'hover:bg-white/10 text-midnight-300'
            }`}
            title={isPinned ? 'Unpin' : 'Pin'}
          >
            <Pin className={`w-5 h-5 ${isPinned ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Archive Button */}
          <button
            onClick={handleArchive}
            className={`p-2 rounded-lg transition-colors ${
              isArchived 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'hover:bg-white/10 text-midnight-300'
            }`}
            title={isArchived ? 'Unarchive' : 'Archive'}
          >
            <Archive className="w-5 h-5" />
          </button>

          {/* Discard Button */}
          <button
            onClick={handleDiscard}
            className="p-2 rounded-lg hover:bg-coral-500/20 text-coral-400 transition-colors"
            title="Discard"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Note
              </>
            )}
          </button>
        </div>
      </div>

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
        onApply={handleAIApply}
      />
    </div>
  );
}
