// src/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EditNoteScreen from './screens/EditNoteScreen';
import NoteDetailScreen from './screens/NoteDetailScreen';
import NotesListScreen from './screens/NotesListScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NotesList"
          component={NotesListScreen}
          options={{ title: 'Field Notes' }}
        />
        <Stack.Screen
          name="NoteDetail"
          component={NoteDetailScreen}
          options={{ title: 'Szczegóły notatki' }}
        />
        <Stack.Screen
          name="EditNote"
          component={EditNoteScreen}
          options={{ title: 'Nowa notatka' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Ustawienia' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
