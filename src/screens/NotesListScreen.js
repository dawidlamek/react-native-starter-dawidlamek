// src/screens/NotesListScreen.js
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useNotes } from '../context/NotesContext';

export default function NotesListScreen() {
  const { notes, loading, error, loadNotes } = useNotes();
  const navigation = useNavigation();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const renderItem = ({ item }) => {
    const createdAt = item.createdAt
      ? new Date(item.createdAt).toLocaleString()
      : '';

    const locationLabel =
      item.latitude && item.longitude
        ? `Lat: ${Number(item.latitude).toFixed(3)}, Lng: ${Number(
            item.longitude
          ).toFixed(3)}`
        : 'Brak lokalizacji';

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('NoteDetail', { note: item })}
        accessibilityLabel={`Otwórz szczegóły notatki ${item.title}`}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>{createdAt}</Text>
        <Text style={styles.meta}>{locationLabel}</Text>
      </TouchableOpacity>
    );
  };

  let content = null;

  if (loading) {
    content = <ActivityIndicator size="large" />;
  } else if (error) {
    content = (
      <View style={styles.center}>
        <Text style={styles.error}>Błąd: {error}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={loadNotes}
          accessibilityLabel="Spróbuj ponownie załadować notatki"
        >
          <Text style={styles.buttonText}>Spróbuj ponownie</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (notes.length === 0) {
    content = (
      <View style={styles.center}>
        <Text style={styles.empty}>
          Brak notatek. Dodaj pierwszą, aby rozpocząć 🙂
        </Text>
      </View>
    );
  } else {
    content = (
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EditNote')}
          accessibilityLabel="Dodaj nową notatkę"
        >
          <Text style={styles.buttonText}>+ Dodaj</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}
          accessibilityLabel="Przejdź do ustawień"
        >
          <Text style={styles.buttonText}>Ustawienia</Text>
        </TouchableOpacity>
      </View>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 16,
  },
  item: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    marginBottom: 12,
    minHeight: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    color: '#555',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});
