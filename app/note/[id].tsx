// app/note/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchNotes } from '../../src/api/notesApi';
import type { Note } from '../../src/types';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const notes = await fetchNotes();
        const found = notes.find((n) => n.id === id);
        if (!found) {
          setError('Nie znaleziono notatki');
        } else {
          setNote(found);
        }
      } catch (e: any) {
        setError(e.message || 'Błąd podczas wczytywania notatki');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Ładowanie...</Text>
      </View>
    );
  }

  if (error || !note) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error ?? 'Nie znaleziono notatki'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>
        {note.createdAt.toLocaleString('pl-PL')}
      </Text>

      {note.imageUrl ? (
        <Image source={{ uri: note.imageUrl }} style={styles.image} />
      ) : null}

      <Text style={styles.label}>Opis</Text>
      <Text style={styles.description}>{note.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: { color: 'tomato' },
  container: {
    padding: 16,
    backgroundColor: '#020617',
    flexGrow: 1,
  },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  date: { color: '#9ca3af', marginTop: 4, marginBottom: 16 },
  image: { width: '100%', height: 250, borderRadius: 12, marginBottom: 16 },
  label: { color: '#e5e7eb', fontWeight: 'bold', marginBottom: 4 },
  description: { color: '#e5e7eb', fontSize: 16, marginTop: 4 },
});
