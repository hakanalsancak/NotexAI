import { Suspense } from 'react';
import { getNotes } from '@/lib/notes-actions';
import { NoteCard } from '@/components/dashboard/NoteCard';
import { FileText, Plus } from 'lucide-react';
import Link from 'next/link';

interface DashboardPageProps {
  searchParams: Promise<{ search?: string }>;
}

async function NotesList({ search }: { search?: string }) {
  const notes = await getNotes(search);

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-midnight-800/50 flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-midnight-500" />
        </div>
        <h2 className="text-2xl font-display font-semibold mb-2">
          {search ? 'No notes found' : 'No notes yet'}
        </h2>
        <p className="text-midnight-400 mb-6 max-w-sm">
          {search 
            ? `No notes matching "${search}". Try a different search term.`
            : 'Create your first note to get started on your journey to better thinking.'
          }
        </p>
        {!search && (
          <Link href="/dashboard/new" className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Note
          </Link>
        )}
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
      {[...Array(8)].map((_, i) => (
        <div key={i} className="glass-card rounded-xl p-5 animate-pulse">
          <div className="h-5 bg-midnight-700 rounded w-3/4 mb-3" />
          <div className="space-y-2">
            <div className="h-3 bg-midnight-700/50 rounded w-full" />
            <div className="h-3 bg-midnight-700/50 rounded w-5/6" />
            <div className="h-3 bg-midnight-700/50 rounded w-4/6" />
          </div>
          <div className="h-3 bg-midnight-700/30 rounded w-1/3 mt-4" />
        </div>
      ))}
    </div>
  );
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { search } = await searchParams;
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">
            {search ? 'Search Results' : 'All Notes'}
          </h1>
          <p className="text-midnight-400">
            {search 
              ? `Showing results for "${search}"`
              : 'Your personal knowledge base'
            }
          </p>
        </div>
        <Link href="/dashboard/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Note</span>
        </Link>
      </div>

      <Suspense fallback={<NotesLoading />}>
        <NotesList search={search} />
      </Suspense>
    </div>
  );
}
