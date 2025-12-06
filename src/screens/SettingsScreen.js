// src/screens/SettingsScreen.js
import { StyleSheet, Text, View } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O aplikacji</Text>
      <Text style={styles.text}>Field Notes – demo React Native.</Text>
      <Text style={styles.text}>Wersja: 1.0.0</Text>

      <Text style={styles.sectionTitle}>Dostępność</Text>
      <Text style={styles.text}>
        - Przyciski mają wysokość co najmniej 44–48 px{'\n'}
        - Etykiety dostępności dla głównych akcji (Dodaj, Ustawienia, Pobierz
        lokalizację, Zapisz)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  text: { fontSize: 14, marginBottom: 4 },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '600',
  },
});
