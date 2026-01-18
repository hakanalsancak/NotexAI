import { Suspense } from 'react';
import { getArchivedNotes } from '@/lib/notes-actions';
import { NoteCard } from '@/components/dashboard/NoteCard';
import { Archive, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function ArchivedNotesList() {
  const notes = await getArchivedNotes();

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-midnight-800/50 flex items-center justify-center mb-6">
          <Archive className="w-10 h-10 text-midnight-500" />
        </div>
        <h2 className="text-2xl font-display font-semibold mb-2">No archived notes</h2>
        <p className="text-midnight-400 mb-6 max-w-sm">
          Archive notes you don't need right now but want to keep for later.
        </p>
        <Link href="/dashboard" className="btn-secondary flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notes.map((note, index) => (
        <NoteCard key={note.id} note={note} index={index} />
      ))}
    </div>
  );
}

function NotesLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="glass-card rounded-xl p-5 animate-pulse">
          <div className="h-5 bg-midnight-700 rounded w-3/4 mb-3" />
          <div className="space-y-2">
            <div className="h-3 bg-midnight-700/50 rounded w-full" />
            <div className="h-3 bg-midnight-700/50 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ArchivedPage() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">Archived Notes</h1>
          <p className="text-midnight-400">Notes you've put away for safekeeping</p>
        </div>
      </div>

      <Suspense fallback={<NotesLoading />}>
        <ArchivedNotesList />
      </Suspense>
    </div>
  );
}
