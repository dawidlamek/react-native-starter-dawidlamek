// app/index.tsx
import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { fetchNotes } from '../src/api/notesApi';
import type { Note } from '../src/types';

export default function NotesListScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (e: any) {
      setError(e.message || 'Nie udało się pobrać notatek');
    } finally {
      setLoading(false);
    }
  };

  // odświeżanie przy powrocie na ekran
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  if (loading && notes.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Ładowanie notatek...</Text>
      </View>
    );
  }

  if (error && notes.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Wystąpił błąd: {error}</Text>
        <Pressable style={styles.button} onPress={loadNotes}>
          <Text style={styles.buttonText}>Spróbuj ponownie</Text>
        </Pressable>
      </View>
    );
  }

  if (!loading && notes.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Brak notatek.</Text>
        <Link href="/note/new" style={styles.button}>
          <Text style={styles.buttonText}>Dodaj pierwszą notatkę</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        onRefresh={loadNotes}
        refreshing={loading}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <Link href={`/note/${item.id}`} asChild>
            <Pressable style={styles.item}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.date}>
                  {item.createdAt.toLocaleString('pl-PL')}
                </Text>
              </View>
              <Text style={styles.chevron}>{'>'}</Text>
            </Pressable>
          </Link>
        )}
      />

      <Link href="/note/new" asChild>
        <Pressable style={styles.fab} accessibilityLabel="Dodaj notatkę">
          <Text style={styles.fabText}>+</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  center: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#020617',
  },
  empty: { color: 'white', marginBottom: 12, fontSize: 16 },
  error: { color: 'tomato', marginBottom: 12, textAlign: 'center' },
  button: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: { color: 'black', fontWeight: 'bold' },
  item: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { color: 'white', fontSize: 16, fontWeight: '600' },
  date: { color: '#9ca3af', fontSize: 12, marginTop: 4 },
  chevron: { color: '#9ca3af', fontSize: 24, paddingHorizontal: 8 },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 32,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: 'black', fontSize: 32, lineHeight: 32, fontWeight: 'bold' },
});
