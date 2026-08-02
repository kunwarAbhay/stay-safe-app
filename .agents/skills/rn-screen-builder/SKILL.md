---
name: rn-screen-builder
description: Guides the implementation of production-quality React Native screens, routes, and feature components using Expo, TypeScript, NativeWind, and ScreenLayout. Use this whenever building a new screen, implementing a feature route or page, converting Figma designs into screen code, or refactoring single-consumer screen components. Distinct from reusable UI component building.
---

# Building React Native Feature Screens

This skill guides the construction of single-use React Native screens and feature components. Unlike shared design-system components, feature screens serve **exactly one consumer** (a screen route or feature module). Design choices must prioritize locality, directness, readability, and safe maintenance six months from now over reusability or configurable abstractions.

---

## 1. Core Architectural Rules

1. **Route Re-Export Rule**: Files in `app/` (Expo Router) MUST serve strictly as minimal 1-line re-export entrypoints. Full screen implementations belong in `src/features/<feature>/screens/<ScreenName>.tsx`.
   ```tsx
   // app/(auth)/login.tsx
   export { Login as default } from "@/src/features/auth/screens/Login";
   ```
2. **Screen Logic Delegation**: Extract all state management, validation, and API side-effects into custom feature hooks (`useLogin`, `useProfileSetup`) in `src/features/<feature>/hooks/`. Screen components should remain purely declarative view layouts.
3. **Native Keyboard & Layout Management**: Use `ScreenLayout` from `@/src/shared/components/layout/screen-layout` with `useKeyboardAvoiding` for form screens rather than manually nesting raw `KeyboardAvoidingView` wrappers.
4. **Sub-View Modularization**: Extract complex input blocks, option grids, or feature-specific selectors (`PhoneInput`, `GenderSelector`, `AgeSelector`) into `src/features/<feature>/components/` when screen files approach ~150 lines.

---

## 2. Directory Structure & Organization

```text
app/(auth)/
├── login.tsx                        # Minimal Expo Router re-export
├── signup.tsx                       # Minimal Expo Router re-export
└── profile.tsx                      # Minimal Expo Router re-export

src/features/auth/
├── screens/
│   ├── login.tsx                    # Screen layout container
│   ├── signup.tsx                   # Screen layout container
│   ├── verify.tsx                   # Screen layout container
│   └── profile.tsx                  # Screen layout container
├── components/                      # Feature sub-components
│   ├── phone-input.tsx
│   ├── gender-selector.tsx
│   └── age-selector.tsx
├── hooks/
│   ├── use-login.ts                  # Screen state & API side-effects
│   ├── use-signup.ts
│   └── use-profile-setup.ts
└── types/
    └── auth.types.ts
```

---

## 3. Canonical Screen Implementation Pattern

Below is the standard, production-ready pattern for feature screens in this application:

```tsx
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { UserCircle2 } from "lucide-react-native";
import { useProfileSetup } from "@/src/features/auth/hooks/useProfileSetup";
import { AgeSelector } from "@/src/features/auth/components/AgeSelector";
import { GenderSelector } from "@/src/features/auth/components/GenderSelector";
import { SubmitButton } from "@/src/shared/components/button/SubmitButton";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";

export default function Profile() {
  // 1. Delegate logic to feature hook
  const {
    fullname,
    setFullname,
    age,
    setAge,
    gender,
    setGender,
    isSaving,
    errorMsg,
    isFormValid,
    handleSave,
  } = useProfileSetup();

  return (
    // 2. Use ScreenLayout for automatic scrolling & keyboard avoiding
    <ScreenLayout
      scrollable={true}
      useKeyboardAvoiding
      useSafeArea={false}
      className="px-6 py-12"
    >
      <VStack className="flex-1" space="xl">
        <Box className="items-center mb-6">
          <UserCircle2 size={120} className="text-primary-500" strokeWidth={1} />
        </Box>

        <VStack space="md" className="mb-4">
          <Heading size="2xl">Tell Us About Yourself</Heading>
          <Text size="md" className="text-typography-500">
            Help us personalize your experience. You can always update this later.
          </Text>
        </VStack>

        {/* 3. Wrap inputs in Gluestack FormControl */}
        <FormControl isRequired isDisabled={isSaving} className="mb-2">
          <FormControlLabel>
            <FormControlLabelText className="text-typography-900 font-medium">
              Full Name
            </FormControlLabelText>
          </FormControlLabel>
          <Input className="bg-white">
            <InputField
              placeholder="Enter Your Full name"
              value={fullname}
              onChangeText={setFullname}
            />
          </Input>
        </FormControl>

        {/* 4. Use modular feature components */}
        <FormControl isDisabled={isSaving} className="mb-2">
          <FormControlLabel>
            <FormControlLabelText className="text-typography-900 font-medium">
              Age
            </FormControlLabelText>
          </FormControlLabel>
          <AgeSelector value={age} onChange={setAge} isDisabled={isSaving} />
        </FormControl>

        <FormControl isDisabled={isSaving} className="mb-4">
          <FormControlLabel>
            <FormControlLabelText className="text-typography-900 font-medium">
              Gender
            </FormControlLabelText>
          </FormControlLabel>
          <GenderSelector value={gender} onChange={setGender} isDisabled={isSaving} />
        </FormControl>

        {/* 5. Standardized submit button */}
        <SubmitButton
          isLoading={isSaving}
          isDisabled={!isFormValid}
          onPress={handleSave}
          className="mt-auto mb-4"
        >
          Finish Setup
        </SubmitButton>
      </VStack>
    </ScreenLayout>
  );
}
```

---

## 4. Accessibility & Layout Standards

1. **Touch Targets & Accessibility Roles**: Ensure all interactive elements on screens meet target dimensions (min 44x44 iOS, 48x48 Android) and carry accessible labels and roles (`accessibilityRole`, `accessibilityLabel`).
2. **Keyboard Avoidance & Screen Layout**: Use `ScreenLayout` from `@/src/shared/components/layout/screen-layout` with `useKeyboardAvoiding={true}` for input-heavy screens rather than nesting raw `KeyboardAvoidingView` wrappers manually.
3. **Screen Reader Focus Order**: Arrange form fields in logical linear order so screen readers move predictably from input to input down to the submit button.

---

## 5. Anti-Goals (Strictly Prohibited Patterns)

1. **No Direct Screen Code in `app/` Routes**: Never write screen layouts directly inside `app/` files. Always re-export from `src/features/<feature>/screens/<ScreenName>.tsx`.
2. **No Inline KeyboardAvoidingView**: Never wrap screens manually with `KeyboardAvoidingView`. Pass `useKeyboardAvoiding={true}` to `ScreenLayout`.
3. **No Unwrapped Form Inputs**: Never render raw `<Input>` or `<Text>` error blocks without Gluestack `<FormControl>`, `<FormControlLabel>`, and `<FormControlError>`.
4. **No Inline Choice Arrays**: Never hardcode select options or choices inline inside screens. Centralize them in `src/config/constants.ts`.

---

## 6. Pre-Merge Checklist

- [ ] **Route Entrypoint**: `app/` file is a 1-line re-export from `src/features/<feature>/screens/`.
- [ ] **Screen Layout**: Uses `ScreenLayout` with `useKeyboardAvoiding` for form screens.
- [ ] **Hook Extraction**: State, API calls, and handlers extracted to a custom feature hook in `src/features/<feature>/hooks/`.
- [ ] **Sub-Component Extraction**: Modular input blocks (`GenderSelector`, `AgeSelector`, `PhoneInput`) extracted to `src/features/<feature>/components/`.
- [ ] **Form Validation**: Inputs wrapped in Gluestack UI `FormControl` suite (`FormControl`, `FormControlLabel`, `FormControlError`).
- [ ] **Accessibility Standards**: Touch target sizes (44x44 / 48x48) met; `accessibilityRole` and `accessibilityLabel` present.
- [ ] **Option Centralization**: Choice arrays and option lists imported from `src/config/constants.ts`.
- [ ] **Type Safety**: Props, navigation params, and hook return objects strictly typed without `any`.
