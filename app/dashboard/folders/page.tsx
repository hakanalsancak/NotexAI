'use client';

import { useState, useEffect } from 'react';
import { FolderOpen, Plus, Trash2, Loader2 } from 'lucide-react';
import { getFolders, createFolder, deleteFolder } from '@/lib/notes-actions';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Folder {
  id: string;
  name: string;
  color: string;
  _count: { notes: number };
}

const folderColors = [
  '#f59e0b', // amber
  '#ef4444', // red
  '#22c55e', // green
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
];

export default function FoldersPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedColor, setSelectedColor] = useState(folderColors[0]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadFolders();
  }, []);

  async function loadFolders() {
    const data = await getFolders();
    setFolders(data as Folder[]);
    setIsLoading(false);
  }

  async function handleCreateFolder(e: React.FormEvent) {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    setIsCreating(true);
    const result = await createFolder(newFolderName, selectedColor);
    
    if (result.success) {
      toast.success('Folder created!');
      setNewFolderName('');
      setShowCreateForm(false);
      loadFolders();
    } else {
      toast.error(result.error || 'Failed to create folder');
    }
    setIsCreating(false);
  }

  async function handleDeleteFolder(id: string, name: string) {
    if (!confirm(`Delete folder "${name}"? Notes inside will be moved to "All Notes".`)) return;

    const result = await deleteFolder(id);
    if (result.success) {
      toast.success('Folder deleted');
      loadFolders();
    } else {
      toast.error(result.error || 'Failed to delete folder');
    }
  }

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="h-10 bg-midnight-700 rounded w-48 mb-8" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-6 animate-pulse">
              <div className="h-12 w-12 bg-midnight-700 rounded-xl mb-4" />
              <div className="h-5 bg-midnight-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-midnight-700/50 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">Folders</h1>
          <p className="text-midnight-400">Organize your notes into folders</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Folder</span>
        </button>
      </div>

      {/* Create Folder Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6 mb-6"
        >
          <form onSubmit={handleCreateFolder}>
            <h3 className="font-display text-lg font-semibold mb-4">Create New Folder</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-midnight-200 mb-2">
                Folder Name
              </label>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name..."
                className="input-field"
                autoFocus
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-midnight-200 mb-2">
                Color
              </label>
              <div className="flex gap-2">
                {folderColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-lg transition-all ${
                      selectedColor === color 
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-midnight-900' 
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || !newFolderName.trim()}
                className="btn-primary flex items-center gap-2"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Folder'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Folders Grid */}
      {folders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-midnight-800/50 flex items-center justify-center mb-6">
            <FolderOpen className="w-10 h-10 text-midnight-500" />
          </div>
          <h2 className="text-2xl font-display font-semibold mb-2">No folders yet</h2>
          <p className="text-midnight-400 mb-6 max-w-sm">
            Create folders to organize your notes by project, topic, or any way you like.
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create First Folder
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {folders.map((folder, index) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl p-6 hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${folder.color}20` }}
                >
                  <FolderOpen className="w-6 h-6" style={{ color: folder.color }} />
                </div>
                <button
                  onClick={() => handleDeleteFolder(folder.id, folder.name)}
                  className="p-2 rounded-lg hover:bg-coral-500/20 text-coral-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">{folder.name}</h3>
              <p className="text-sm text-midnight-400">
                {folder._count.notes} {folder._count.notes === 1 ? 'note' : 'notes'}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
