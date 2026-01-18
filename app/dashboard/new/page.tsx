'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { RichTextEditor } from '@/components/editor/RichTextEditor';
import { createNote } from '@/lib/notes-actions';
import toast from 'react-hot-toast';

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    if (!title.trim() && !content.trim()) {
      toast.error('Please add a title or content');
      return;
    }

    setIsSaving(true);
    const result = await createNote({
      title: title || 'Untitled',
      content,
    });

    if (result.success && result.note) {
      toast.success('Note created!');
      router.push(`/dashboard/note/${result.note.id}`);
    } else {
      toast.error(result.error || 'Failed to create note');
    }
    setIsSaving(false);
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
    </div>
  );
}
