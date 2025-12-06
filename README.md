# Field Notes – React Native

Prosta aplikacja mobilna napisana w **React Native (Expo)**, umożliwiająca tworzenie notatek terenowych.
Aplikacja wykorzystuje **natywną funkcję urządzenia** oraz **komunikację z API**.

Projekt wykonany w ramach zajęć z budowy aplikacji mobilnych.

---

## Funkcjonalności

- Lista notatek (tytuł, data)
- Szczegóły notatki (opis, zdjęcie)
- Dodawanie nowej notatki
- Integracja z API (pobieranie i zapisywanie danych)
- Obsługa stanów: ładowanie, błąd, pusty widok

---

## Natywna funkcja

**Galeria / zdjęcia (expo-image-picker)**  
Użytkownik może dodać zdjęcie do notatki, wybierając je z galerii urządzenia.
Aplikacja prosi o odpowiednie uprawnienia systemowe i obsługuje ich brak.

---

## API

Aplikacja korzysta z **MockAPI**.

- `GET /notes` – pobranie listy notatek
- `POST /notes` – zapis nowej notatki

Każda notatka zawiera:
- tytuł
- opis
- datę utworzenia
- (opcjonalnie) URL zdjęcia

---

## Widoki

1. **Lista notatek**
2. **Szczegóły notatki**
3. **Dodaj notatkę**
4. **Ustawienia / O aplikacji**

---

## Dostępność

- Przyciski mają odpowiedni rozmiar do obsługi dotykiem (ok. 44–48 px)
- Czytelne etykiety tekstowe
- Zachowany kontrast elementów UI

---

## Instalacja i uruchomienie

```bash
npm install
npx expo start
