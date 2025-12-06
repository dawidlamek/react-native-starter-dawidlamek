// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Field Notes' }} />
        <Stack.Screen name="note/new" options={{ title: 'Nowa notatka' }} />
        <Stack.Screen name="note/[id]" options={{ title: 'Szczegóły notatki' }} />
        <Stack.Screen name="settings" options={{ title: 'Ustawienia' }} />
      </Stack>
    </>
  );
}
