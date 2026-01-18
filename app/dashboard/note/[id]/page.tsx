import { notFound } from 'next/navigation';
import { getNote } from '@/lib/notes-actions';
import { NoteEditor } from '@/components/editor/NoteEditor';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const note = await getNote(id);

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <NoteEditor note={note} />
    </div>
  );
}
