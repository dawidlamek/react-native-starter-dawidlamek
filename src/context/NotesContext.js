// src/context/NotesContext.js
import { createContext, useCallback, useContext, useState } from 'react';

const NotesContext = createContext(null);

const API_URL = 'https://6934200f4090fe3bf01f026e.mockapi.io/notes';

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Błąd API: ${response.status}`);
      }
      const data = await response.json();
      setNotes(data);
    } catch (e) {
      setError(e.message || 'Nie udało się pobrać notatek');
    } finally {
      setLoading(false);
    }
  }, []);

  const addNote = useCallback(
    async ({ title, description, latitude, longitude }) => {
      setError(null);
      const newNote = {
        title,
        description,
        latitude,
        longitude,
        createdAt: new Date().toISOString(),
      };

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newNote),
        });

        if (!response.ok) {
          throw new Error(`Błąd przy zapisie: ${response.status}`);
        }

        const created = await response.json();
        setNotes((prev) => [...prev, created]);
        return created;
      } catch (e) {
        setError(e.message || 'Nie udało się zapisać notatki');
        throw e;
      }
    },
    []
  );

  return (
    <NotesContext.Provider
      value={{ notes, loading, error, loadNotes, addNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) {
    throw new Error('useNotes musi być użyte wewnątrz NotesProvider');
  }
  return ctx;
}
