// src/screens/NoteDetailScreen.js
import { StyleSheet, Text, View } from 'react-native';

export default function NoteDetailScreen({ route }) {
  const { note } = route.params;

  const createdAt = note.createdAt
    ? new Date(note.createdAt).toLocaleString()
    : '';

  const locationLabel =
    note.latitude && note.longitude
      ? `Lat: ${Number(note.latitude).toFixed(4)}, Lng: ${Number(
          note.longitude
        ).toFixed(4)}`
      : 'Brak lokalizacji';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.meta}>{createdAt}</Text>
      <Text style={styles.meta}>{locationLabel}</Text>

      <Text style={styles.sectionTitle}>Opis</Text>
      <Text style={styles.description}>{note.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  meta: { fontSize: 12, color: '#666' },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  description: { fontSize: 14 },
});
