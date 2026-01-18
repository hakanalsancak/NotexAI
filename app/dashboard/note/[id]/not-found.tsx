import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function NoteNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-midnight-800/50 flex items-center justify-center mb-6">
        <FileText className="w-10 h-10 text-midnight-500" />
      </div>
      <h2 className="text-2xl font-display font-semibold mb-2">Note Not Found</h2>
      <p className="text-midnight-400 mb-6 max-w-sm">
        This note doesn't exist or has been deleted.
      </p>
      <Link href="/dashboard" className="btn-primary flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        Back to Notes
      </Link>
    </div>
  );
}
