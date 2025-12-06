import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function NotesListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Field Notes</Text>
      <Text>Tu będzie lista notatek 🙂</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101010',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
});
