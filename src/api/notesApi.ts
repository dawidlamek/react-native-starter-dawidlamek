// src/api/notesApi.ts
import type { Note } from '../types';

const BASE_URL = 'https://6934200f4090fe3bf01f026e.mockapi.io/notes';

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Błąd API przy pobieraniu (${res.status}): ${text || res.statusText}`,
    );
  }

  const data = (await res.json()) as any[];
  return data.map((item) => ({
    id: String(item.id),
    title: item.title ?? '',
    description: item.description ?? '',
    createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
    imageUrl: item.imageUrl ?? null,
  }));
}

export async function createNote(payload: {
  title: string;
  description: string;
  imageUrl?: string | null;
}): Promise<Note> {
  const body = {
    title: payload.title,
    description: payload.description,
    createdAt: new Date().toISOString(),
    imageUrl: payload.imageUrl ?? null,
  };

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Błąd API przy zapisie (${res.status}): ${text || res.statusText}`,
    );
  }

  const data = (await res.json()) as any;

  return {
    id: String(data.id),
    title: data.title ?? '',
    description: data.description ?? '',
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    imageUrl: data.imageUrl ?? null,
  };
}
