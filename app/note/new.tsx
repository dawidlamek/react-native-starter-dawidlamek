// app/note/new.tsx
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import { createNote } from '../../src/api/notesApi';

export default function NewNoteScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Brak uprawnień',
        'Aby dodać zdjęcie, musisz zezwolić na dostęp do galerii.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const save = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Błąd', 'Podaj tytuł i opis.');
      return;
    }

    setSaving(true);
    try {
      await createNote({
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUri ?? undefined,
      });
      router.back(); // wróć do listy
    } catch (e: any) {
      Alert.alert('Błąd zapisu', e.message || 'Nie udało się zapisać notatki.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Tytuł</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Wpisz tytuł"
        placeholderTextColor="#6b7280"
      />

      <Text style={styles.label}>Opis</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        placeholder="Opis notatki"
        placeholderTextColor="#6b7280"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Zdjęcie (opcjonalne)</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.hint}>Brak zdjęcia</Text>
      )}

      <Pressable style={styles.secondaryButton} onPress={pickImage}>
        <Text style={styles.secondaryText}>Wybierz zdjęcie z galerii</Text>
      </Pressable>

      <Pressable
        style={[styles.primaryButton, saving && { opacity: 0.7 }]}
        onPress={save}
        disabled={saving}
      >
        <Text style={styles.primaryText}>
          {saving ? 'Zapisywanie...' : 'Zapisz notatkę'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#020617',
    flexGrow: 1,
  },
  label: { color: 'white', marginBottom: 4, marginTop: 12 },
  input: {
    backgroundColor: '#111827',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  hint: { color: '#9ca3af', marginBottom: 8 },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  primaryText: { color: 'black', fontWeight: 'bold' },
  secondaryButton: {
    borderColor: '#22c55e',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryText: { color: '#22c55e' },
});
