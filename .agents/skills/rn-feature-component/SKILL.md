---
name: rn-feature-component
description: Guides the implementation of production-quality, single-use React Native screen and feature components using Expo, TypeScript, and NativeWind. Use this whenever building a new screen, implementing a feature-specific UI component, converting Figma designs or prototypes into feature code, or refactoring single-consumer screen code. Distinct from reusable design-system component building.
---

# Building Single-Use React Native Feature Components

This skill guides the construction of single-use React Native feature components and screens. Unlike shared design-system components, feature components serve **exactly one consumer** (a screen or feature module). Design choices must prioritize locality, directness, readability, and safe maintenance six months from now over reusability or configurable abstractions.

---

## 1. Trigger Conditions

### When to Apply This Skill
- Building a new screen-level component (e.g., `ProfileScreen`, `CheckoutScreen`, `ContactsListScreen`).
- Building feature-bound sub-views (e.g., `ContactDetailHeader`, `CartSummaryCard`).
- Translating Figma designs or prototypes into feature code.
- Refactoring single-consumer screen code into manageable internal pieces.

### When NOT to Apply (Use `rn-component-builder` Instead)
- Creating reusable UI controls shared across 2+ distinct features (e.g., `Button`, `TextField`, `Modal`, `Avatar`).
- Building system-wide primitives or design system tokens.

---

## 2. Structure & Organization

### Colocated Directory Structure
Keep feature code encapsulated in the feature directory. Do not extract to global `components/` until a second real consumer requires it.

```text
src/features/contacts/
├── screens/
│   └── ContactsScreen.tsx           # Entry point / route container
├── components/                      # Single-consumer sub-components for this feature ONLY
│   ├── ContactHeader.tsx
│   ├── ContactListItem.tsx
│   └── ContactSearchInput.tsx
├── hooks/
│   └── useContactsSearch.ts         # Feature-specific hooks
├── utils/
│   └── formatPhoneNumber.ts         # Pure, testable helper functions
└── types/
    └── contacts.types.ts            # Feature types & navigation params
```

### When to Split into Sub-components
Split a screen/component **only** when file length exceeds ~200–300 lines or when distinct UI sections have high internal complexity. 
- **DO split** for cognitive clarity (e.g., `ContactListItem` separated from `ContactsScreen` for clean list rendering).
- **DO NOT split** purely for theoretical reusability.
- Keep non-exported internal components in the same file if under ~50 lines and tightly coupled.

### Colocating Pure Helper Functions
Extract business logic, formatters, and calculations into pure functions placed at the bottom of the file or in a colocated `utils/` file. Do not inline complex calculations inside JSX or component bodies.

```tsx
// Good: Colocated pure helper function (easily unit tested)
export const formatContactSubtitle = (company?: string, jobTitle?: string): string => {
  if (company && jobTitle) return `${jobTitle} at ${company}`;
  return company || jobTitle || 'No title provided';
};
```

---

## 3. Styling with NativeWind

Use NativeWind (`className`) for styling. Rely on shared design tokens (theme colors, spacing, typography) from Tailwind configuration rather than hardcoded hex values.

### Token Usage & Platform Specifics
```tsx
import React from 'react';
import { View, Text, Platform } from 'react-native';

// Good: NativeWind using design tokens + platform-specific classes
export const ContactHeader = ({ title }: { title: string }) => {
  return (
    <View className="bg-background-paper border-b border-border-subtle p-4 ios:pt-2 android:pt-4">
      <Text className="text-xl font-semibold text-text-primary">
        {title}
      </Text>
    </View>
  );
};
```
## 4. State & Data Management

### Local State vs. Lifted State
Keep state as local as possible. Because there is only one consumer, state does not need to be lifted to global Context or Zustand unless cross-feature persistence or app-wide synchronization is strictly required.

### Deriving State (No Redundant State)
Never store derived data in `useState` or synchronize state with `useEffect`. Compute it on the fly during render or wrap in `useMemo` if computationally expensive.

```tsx
// Bad: Redundant state sync
const [filteredItems, setFilteredItems] = useState([]);
useEffect(() => {
  setFilteredItems(items.filter(i => i.name.includes(query)));
}, [items, query]);

// Good: Derived state computed during render
const filteredItems = items.filter(item => 
  item.name.toLowerCase().includes(query.toLowerCase())
);
```

### Data Fetching
Colocate data fetching with the feature screen using React Query or custom feature hooks.

```tsx
// src/features/contacts/hooks/useContacts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchContacts } from '../api/contactsApi';

export const useContacts = (searchQuery: string) => {
  return useQuery({
    queryKey: ['contacts', searchQuery],
    queryFn: () => fetchContacts(searchQuery),
    staleTime: 1000 * 60 * 5,
  });
};
```

---

## 5. Performance Guidelines

### Pragmatic Memoization
Do NOT wrap every component or function in `memo`/`useCallback`/`useMemo` by default. Apply them strictly when:
1. Passing callbacks to items rendered in long, virtualized lists (`FlatList` / `FlashList`).
2. Performing heavy array transforms or calculations on large data sets.

### List Optimization (`FlatList` / `FlashList`)
Always provide explicit key extractors and performance configurations for lists.

```tsx
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { ContactListItem } from './ContactListItem';
import { Contact } from '../types/contacts.types';

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (id: string) => void;
}

export const ContactList = ({ contacts, onSelectContact }: ContactListProps) => {
  // useCallback is justified here to maintain stable reference for list items
  const renderItem = useCallback<ListRenderItem<Contact>>(({ item }) => (
    <ContactListItem contact={item} onPress={onSelectContact} />
  ), [onSelectContact]);

  const keyExtractor = useCallback((item: Contact) => item.id, []);

  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};
```

### High-Performance Image Handling
Prefer `expo-image` over React Native standard `Image` for disk/memory caching, smooth transition fades, and placeholder blurhashes.

```tsx
import { Image } from 'expo-image';

export const ContactAvatar = ({ uri, name }: { uri?: string; name: string }) => {
  return (
    <Image
      source={uri ? { uri } : undefined}
      placeholder={blurhashPlaceholder}
      contentFit="cover"
      transition={200}
      className="w-12 h-12 rounded-full bg-neutral-200"
      accessibilityLabel={`Avatar for ${name}`}
    />
  );
};
```

---

## 6. Type Safety & Discriminated Unions

### Precise Props & Navigation Types
Define tight TypeScript interfaces. Avoid `any` or loose string unions.

```tsx
// Feature UI State represented via Discriminated Union
export type ScreenState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: Contact[] };
```

### Discriminated Union Rendering
```tsx
export const ContactsContent = ({ state }: { state: ScreenState }) => {
  switch (state.status) {
    case 'idle':
    case 'loading':
      return <ContactsListSkeleton />;
    case 'error':
      return <ErrorStateCard error={state.error} />;
    case 'success':
      if (state.data.length === 0) {
        return <EmptyContactsState />;
      }
      return <ContactList contacts={state.data} onSelectContact={handleSelect} />;
  }
};
```

---

## 7. Accessibility & Platform Correctness

### Touch Targets & Accessibility Roles
Ensure all interactive elements meet target dimensions (min 44x44 iOS, 48x48 Android) and carry accessible labels.

```tsx
import React from 'react';
import { Pressable, Text } from 'react-native';

export const ActionButton = ({ label, onPress }: { label: string; onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8} // Expands touch area if visual container is small
      accessibilityRole="button"
      accessibilityLabel={label}
      className="min-h-[44px] min-w-[44px] justify-center items-center px-4 py-2 bg-primary rounded-lg active:opacity-80"
    >
      <Text className="text-white font-medium">{label}</Text>
    </Pressable>
  );
};
```

### Keyboard Avoidance & Input Handling
Wrap forms and input containers with `KeyboardAvoidingView` or `ScrollView` with proper keyboard props (`keyboardShouldPersistTaps="handled"`).

---

## 8. Explicit UI States (Loading / Error / Empty)

Never build only the happy path. Feature components consuming async data MUST implement explicit views for loading, error, and empty states.

```tsx
// Skeleton Loader Example using NativeWind
export const ContactsListSkeleton = () => (
  <View className="p-4 space-y-4" testID="contacts-skeleton">
    {[1, 2, 3, 4].map((key) => (
      <View key={key} className="flex-row items-center space-x-3">
        <View className="w-12 h-12 rounded-full bg-neutral-200 animate-pulse" />
        <View className="flex-1 space-y-2">
          <View className="h-4 w-3/4 bg-neutral-200 rounded animate-pulse" />
          <View className="h-3 w-1/2 bg-neutral-200 rounded animate-pulse" />
        </View>
      </View>
    ))}
  </View>
);
```

---

## 9. Testability & `testID` Conventions

### Structuring `testID` Keys
Use explicit, structured `testID` names following the pattern `<feature>:<component>:<element>`.

```tsx
export const ContactSearchInput = ({ value, onChangeText }: SearchProps) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder="Search contacts..."
    testID="contacts:search-input:field"
    accessibilityLabel="Search contacts input field"
  />
);
```

### Extracting Business Logic for Testing
Keep component render trees lightweight by extracting data transformations out of JSX so they can be unit-tested without rendering React Native components.

---

## 10. Anti-Goals (Strictly Prohibited Patterns)

Do NOT introduce unnecessary complexity for single-consumer components:

1. **No Premature Reusability (YAGNI)**: Do not add optional variant props, generic render callbacks, or configurable style overrides "just in case" another screen might need this later.
2. **No Premature Shared Directory Extraction**: Do not put feature-specific UI components in `src/shared/components/`. Keep them inside `src/features/<feature>/components/`.
3. **No Over-Abstraction**: Do not use HOCs, render props, or complex compound component APIs when a straightforward functional component works.
4. **No Cargo-Cult Memoization**: Do not wrap simple functions or static layout components in `useCallback`/`memo` without measured performance issues or virtualized list requirements.
5. **No Micro-Splitting**: Do not split components into 10 tiny files of 15 lines each if keeping them in one coherent file is easier to read.

---

## 11. Pre-Merge Checklist

Before finalizing or reviewing a feature component, verify against this checklist:

- [ ] **Single Consumer Focus**: No unused prop options, generic abstractions, or unnecessary reusability logic.
- [ ] **Feature Colocation**: File sits inside `src/features/<feature-name>/`, not shared global folders.
- [ ] **Type Safety**: Props, navigation params, and screen states are strictly typed without `any`.
- [ ] **State Handling**: State is derived where possible; no redundant sync `useEffect` blocks.
- [ ] **UI States**: Explicit components exist for Loading, Error, and Empty states.
- [ ] **Styling & Tokens**: NativeWind `className` used with theme design tokens instead of hardcoded hex values.
- [ ] **Safe Area & Insets**: Notch, navigation bar, and keyboard insets are handled via `useSafeAreaInsets` or `KeyboardAvoidingView`.
- [ ] **Accessibility & Touch**: Minimum touch targets (44x44 / 48x48) met; `accessibilityRole` and `accessibilityLabel` present on interactive elements.
- [ ] **Performance & Lists**: `expo-image` used for remote images; `FlatList`/`FlashList` has stable `keyExtractor` and optimized batch props.
- [ ] **Testability**: Pure functions extracted for unit testing; structured `testID` attributes included (`feature:component:element`).
