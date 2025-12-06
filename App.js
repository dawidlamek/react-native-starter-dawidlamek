// App.js
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/AppNavigator';
import { NotesProvider } from './src/context/NotesContext';

export default function App() {
  return (
    <NotesProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </NotesProvider>
  );
}
