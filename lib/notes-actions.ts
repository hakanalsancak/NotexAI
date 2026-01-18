'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getNotes(search?: string) {
  const session = await auth();
  if (!session?.user?.id) return [];

  const notes = await db.note.findMany({
    where: {
      userId: session.user.id,
      isArchived: false,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      }),
    },
    include: {
      folder: true,
      tags: true,
    },
    orderBy: [
      { isPinned: 'desc' },
      { updatedAt: 'desc' },
    ],
  });

  return notes;
}

export async function getPinnedNotes() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db.note.findMany({
    where: {
      userId: session.user.id,
      isPinned: true,
      isArchived: false,
    },
    include: {
      folder: true,
      tags: true,
    },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getArchivedNotes() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db.note.findMany({
    where: {
      userId: session.user.id,
      isArchived: true,
    },
    include: {
      folder: true,
      tags: true,
    },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getNote(id: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  return db.note.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      folder: true,
      tags: true,
    },
  });
}

export async function createNote(data: {
  title: string;
  content: string;
  folderId?: string;
  isPinned?: boolean;
  isArchived?: boolean;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const note = await db.note.create({
      data: {
        title: data.title || 'Untitled',
        content: data.content,
        userId: session.user.id,
        folderId: data.folderId,
        isPinned: data.isPinned ?? false,
        isArchived: data.isArchived ?? false,
      },
    });

    revalidatePath('/dashboard');
    return { success: true, note };
  } catch (error) {
    console.error('Create note error:', error);
    return { success: false, error: 'Failed to create note' };
  }
}

export async function updateNote(
  id: string,
  data: {
    title?: string;
    content?: string;
    isPinned?: boolean;
    isArchived?: boolean;
    folderId?: string | null;
  }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const note = await db.note.update({
      where: {
        id,
        userId: session.user.id,
      },
      data,
    });

    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/note/${id}`);
    return { success: true, note };
  } catch (error) {
    console.error('Update note error:', error);
    return { success: false, error: 'Failed to update note' };
  }
}

export async function deleteNote(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    await db.note.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Delete note error:', error);
    return { success: false, error: 'Failed to delete note' };
  }
}

export async function getFolders() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return db.folder.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: {
        select: { notes: true },
      },
    },
    orderBy: { name: 'asc' },
  });
}

export async function createFolder(name: string, color?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const folder = await db.folder.create({
      data: {
        name,
        color: color || '#627d98',
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard/folders');
    return { success: true, folder };
  } catch (error) {
    console.error('Create folder error:', error);
    return { success: false, error: 'Failed to create folder' };
  }
}

export async function deleteFolder(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    await db.folder.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard/folders');
    return { success: true };
  } catch (error) {
    console.error('Delete folder error:', error);
    return { success: false, error: 'Failed to delete folder' };
  }
}
