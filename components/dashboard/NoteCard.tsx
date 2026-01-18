'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pin, Archive, Trash2, MoreVertical, Clock } from 'lucide-react';
import { updateNote, deleteNote } from '@/lib/notes-actions';
import toast from 'react-hot-toast';

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    isPinned: boolean;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
    folder?: { name: string; color: string } | null;
    tags?: { id: string; name: string; color: string }[];
  };
  index: number;
}

export function NoteCard({ note, index }: NoteCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeAgo, setTimeAgo] = useState<string>('');

  // Calculate time ago only on client to avoid hydration mismatch
  useEffect(() => {
    setTimeAgo(getTimeAgo(note.updatedAt));
  }, [note.updatedAt]);

  // Strip HTML tags for preview
  const contentPreview = note.content
    .replace(/<[^>]*>/g, '')
    .substring(0, 150);

  async function handlePin() {
    setIsLoading(true);
    const result = await updateNote(note.id, { isPinned: !note.isPinned });
    if (result.success) {
      toast.success(note.isPinned ? 'Unpinned' : 'Pinned!');
    } else {
      toast.error(result.error || 'Failed to update');
    }
    setIsLoading(false);
    setIsMenuOpen(false);
  }

  async function handleArchive() {
    setIsLoading(true);
    const result = await updateNote(note.id, { isArchived: !note.isArchived });
    if (result.success) {
      toast.success(note.isArchived ? 'Restored' : 'Archived');
    } else {
      toast.error(result.error || 'Failed to update');
    }
    setIsLoading(false);
    setIsMenuOpen(false);
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    setIsLoading(true);
    const result = await deleteNote(note.id);
    if (result.success) {
      toast.success('Note deleted');
    } else {
      toast.error(result.error || 'Failed to delete');
    }
    setIsLoading(false);
    setIsMenuOpen(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative"
    >
      <Link
        href={`/dashboard/note/${note.id}`}
        className="block glass-card rounded-xl p-5 hover:border-amber-500/30 transition-all duration-300 h-full"
      >
        {/* Pin indicator */}
        {note.isPinned && (
          <div className="absolute top-3 right-3">
            <Pin className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-white mb-2 pr-8 line-clamp-1">
          {note.title || 'Untitled'}
        </h3>

        {/* Content preview */}
        <p className="text-midnight-300 text-sm line-clamp-3 mb-4">
          {contentPreview || 'No content yet...'}
        </p>

        {/* Folder badge */}
        {note.folder && (
          <div className="mb-3">
            <span
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium"
              style={{ 
                backgroundColor: `${note.folder.color}20`,
                color: note.folder.color 
              }}
            >
              {note.folder.name}
            </span>
          </div>
        )}

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-0.5 rounded text-xs"
                style={{ 
                  backgroundColor: `${tag.color}20`,
                  color: tag.color 
                }}
              >
                {tag.name}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded text-xs text-midnight-400">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className="flex items-center gap-1 text-xs text-midnight-500">
          <Clock className="w-3 h-3" />
          <span suppressHydrationWarning>{timeAgo}</span>
        </div>
      </Link>

      {/* Menu button */}
      <div className="absolute top-3 right-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className={`p-1.5 rounded-lg transition-all ${
            isMenuOpen 
              ? 'bg-white/10' 
              : 'opacity-0 group-hover:opacity-100 hover:bg-white/10'
          }`}
        >
          <MoreVertical className="w-4 h-4 text-midnight-300" />
        </button>

        {/* Dropdown menu */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 top-8 w-40 rounded-lg glass-card py-1 z-50"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handlePin();
                }}
                disabled={isLoading}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-white/5 transition-colors"
              >
                <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-amber-400 text-amber-400' : ''}`} />
                {note.isPinned ? 'Unpin' : 'Pin'}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleArchive();
                }}
                disabled={isLoading}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-white/5 transition-colors"
              >
                <Archive className="w-4 h-4" />
                {note.isArchived ? 'Restore' : 'Archive'}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isLoading}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left text-coral-400 hover:bg-white/5 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
