// src/screens/EditNoteScreen.js
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNotes } from '../context/NotesContext';

export default function EditNoteScreen() {
  const { addNote } = useNotes();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [saving, setSaving] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleGetLocation = async () => {
    setGettingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Brak uprawnień',
          'Nie nadano uprawnień do lokalizacji. Zmień to w ustawieniach systemu.'
        );
        return;
      }

      const pos = await Location.getCurrentPositionAsync({});
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
      Alert.alert(
        'Lokalizacja pobrana',
        `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(
          4
        )}`
      );
    } catch (e) {
      Alert.alert('Błąd lokalizacji', String(e));
    } finally {
      setGettingLocation(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Błąd', 'Uzupełnij tytuł i opis.');
      return;
    }

    setSaving(true);
    try {
      await addNote({
        title: title.trim(),
        description: description.trim(),
        latitude,
        longitude,
      });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Błąd zapisu', String(e));
    } finally {
      setSaving(false);
    }
  };

  const locationLabel =
    latitude && longitude
      ? `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
      : 'Lokalizacja nieustawiona';

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tytuł"
        value={title}
        onChangeText={setTitle}
        accessibilityLabel="Pole tytuł notatki"
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Opis"
        value={description}
        onChangeText={setDescription}
        multiline
        accessibilityLabel="Pole opis notatki"
      />

      <View style={styles.locationRow}>
        <Text style={styles.locationText}>{locationLabel}</Text>
        <TouchableOpacity
          style={styles.buttonSmall}
          onPress={handleGetLocation}
          disabled={gettingLocation}
          accessibilityLabel="Pobierz aktualną lokalizację"
        >
          {gettingLocation ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Pobierz lokalizację</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonSave}
        onPress={handleSave}
        disabled={saving}
        accessibilityLabel="Zapisz nową notatkę"
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Zapisz notatkę</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.info}>
        Jeśli odmówisz uprawnień lokalizacji, pojawi się komunikat o błędzie –
        to część scenariusza testowego (brak uprawnień).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    marginRight: 8,
  },
  buttonSmall: {
    backgroundColor: '#34C759',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonSave: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 48,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  info: {
    fontSize: 12,
    color: '#555',
  },
});
