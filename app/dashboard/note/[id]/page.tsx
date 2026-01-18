import { notFound } from 'next/navigation';
import { getNote } from '@/lib/notes-actions';
import { NoteEditor } from '@/components/editor/NoteEditor';

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await getNote(params.id);

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <NoteEditor note={note} />
    </div>
  );
}
