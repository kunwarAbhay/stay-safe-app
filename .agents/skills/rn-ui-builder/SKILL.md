---
name: rn-ui-builder
description: Build production-ready, reusable React Native & Gluestack UI components in TypeScript. Use this whenever asked to create, build, or refactor a reusable UI component — buttons, inputs, pickers, cards, modals, form fields, headers, or shared UI widgets. Covers variant/prop API design, FormControl integration, accessibility, theming, loading/error/empty states, and preview setup. Not for full-screen routing or screen layout composition — use rn-screen-builder for full screens.
---

# React Native & Gluestack UI Component Builder

Produces individual, reusable, production-grade React Native & Gluestack UI components. A component built with this skill should be droppable into any screen in the app without modification, fully typed, accessible, and compliant with Gluestack UI v5 standards.

---

## 1. Context & Prop API Design Rules

### Gather Context First
Before implementing a component, verify or infer:
- **Visual Variants**: What variants does this component need (`variant?: "primary" | "secondary" | "destructive" | "outline"`)?
- **Interactive States**: How does the component render in `default`, `pressed`/`active`, `disabled`, `loading`, and `error` states?

### Prop API Guidelines
1. **Primitive Prop Extension (`...props` forwarding)**: Interfaces MUST extend the underlying primitive component props (e.g. `extends React.ComponentProps<typeof Select>` or `React.ComponentProps<typeof FormControl>`) and forward `...props` to the root container rather than inventing ad-hoc boolean props.
2. **React Component Composition**: Action components (e.g. `SubmitButton`) MUST support React component composition via `children?: React.ReactNode` alongside an optional string `label` fallback, allowing consumers to render composed nodes (`<HStack><Icon /><Text /></HStack>`).
3. **Closed Union Variants**: Use closed string unions for variants (`variant: "primary" | "secondary" | "destructive"`), never a loose `string`.
4. **Gluestack `FormControl` Integration**: Form field inputs, select controls, and pickers MUST integrate seamlessly with Gluestack UI's `FormControl` suite (`FormControl`, `FormControlLabel`, `FormControlError`, `FormControlErrorText`) natively for labels and error messages.
5. **Option Constants Centralization**: Option arrays, country codes, select dropdown choices, and default configuration values MUST be defined in `src/config/constants.ts` (or feature constants) rather than hardcoded inline inside component files.

---

## 2. Interactive & Render States

Every reusable component MUST handle all applicable states:

### Interactive States
- **Default**: Standard idle visual style matching design tokens.
- **Pressed/Active**: Feedback for touch interactions using `Pressable` style functions or NativeWind active classes (`active:opacity-80`).
- **Disabled**: Visually distinct (muted opacity), blocking touch handlers, and passing `accessibilityState={{ disabled: true }}`.
- **Loading**: Spinner replaces content without layout shift (reserving container dimensions).
- **Error/Invalid**: Highlighted border (`border-error-500`) and message (`FormControlErrorText`).

### Async Data & List Render States (Loading / Empty / Error / Success)
If a component displays async, feed, or list data, it MUST handle:
- **Loading**: Render explicit skeleton loaders (`animate-pulse`) or activity spinners rather than a blank flash.
- **Empty**: Render an explicit empty state view with an icon, title, and helper text (e.g. "No contacts found").
- **Error**: Render a clear error message with an optional retry button.
- **Success / Populated**: Render populated items with realistic text lengths and truncation handling (`numberOfLines`).

---

## 3. Canonical Component Implementation Patterns

### Pattern A: Reusable Selector Component (`AgeSelector.tsx`)
Extends underlying Gluestack primitive props and forwards `...props`.

```tsx
import { ChevronDown } from "lucide-react-native";
import { AGE_OPTIONS } from "@/src/config/constants";

export interface AgeSelectProps extends React.ComponentProps<typeof Select> {
  value: string;
  onChange: (age: string) => void;
}

export function AgeSelector({ value, onChange, ...props }: AgeSelectProps) {
  return (
    <Select onValueChange={onChange} selectedValue={value} {...props}>
      <SelectTrigger
        variant="outline"
        size="lg"
        className="bg-white justify-between"
        accessibilityRole="combobox"
        accessibilityLabel="Select age"
      >
        <SelectInput placeholder="Select Age" />
        <SelectIcon className="mr-3" as={ChevronDown} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {AGE_OPTIONS.map((a) => (
            <SelectItem key={a} label={a} value={a} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
```

---

### Pattern B: Composable Action Button (`SubmitButton.tsx`)
Supports string `label`, string `children`, or custom React node composition.

```tsx
export interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  isDisabled?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export function SubmitButton({
  children,
  label,
  isLoading = false,
  isDisabled = false,
  onPress,
  className,
  ...props
}: SubmitButtonProps) {
  const disabled = isLoading || isDisabled;
  const content = children ?? label;

  return (
    <Button
      size="lg"
      className={cn("rounded-full bg-primary-500 mt-4", className)}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner color="white" />
      ) : typeof content === "string" ? (
        <ButtonText>{content}</ButtonText>
      ) : (
        content
      )}
    </Button>
  );
}

```

---

### Pattern C: Custom Form Component (`EmailInput.tsx`)
Use for form inputs with labels, validation, and error messages.

```tsx
interface EmailInputProps {
  readonly label?: string;
  readonly placeholder?: string;
  readonly helperText?: string;
  readonly value: string;
  readonly error?: string;
  readonly onChange: (value: string) => void;
  readonly className?: string;
}

export const EmailInput = ({
  label = 'Email Address',
  placeholder = 'Enter your email',
  helperText,
  value,
  error,
  onChange,
  className,
}: EmailInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FormControl isInvalid={!!error} className={className}>
      <FormControlLabel>
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>

      <Input>
        <InputSlot>
          <InputIcon
            as={MailIcon}
            className={isFocused ? 'text-primary' : 'text-muted-foreground'}
          />
        </InputSlot>
        <InputField
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Input>

      {error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      )}

      {helperText && !error && (
        <FormControlHelper>
          <FormControlHelperText>{helperText}</FormControlHelperText>
        </FormControlHelper>
      )}
    </FormControl>
  );
};
```

**Key points:**
- ✅ FormControl wrapper for validation
- ✅ InputIcon wrapped in InputSlot (CRITICAL)
- ✅ Error and helper text handling
- ✅ Focus state management
- ✅ Proper keyboard type

---

## 4. Accessibility & Usability Standards

1. **Accessibility Roles & Labels**: Every interactive component MUST carry an explicit `accessibilityRole` (`button`, `combobox`, `search`, `header`, etc.) and a meaningful `accessibilityLabel`. Icon-only buttons MUST have a descriptive `accessibilityLabel`.
2. **Touch Target Dimensions**: Minimum touch target size is 44x44pt on iOS and 48x48pt on Android. Use `hitSlop` (e.g. `hitSlop={8}`) to expand the tap area if the visual element is smaller.
3. **Disabled State Communication**: Interactive elements in disabled states MUST pass `accessibilityState={{ disabled: true }}` to inform screen readers.
4. **Dynamic Font Scaling & Overflow**: Never hardcode fixed container heights with rigid `fontSize`. Ensure text respects system font size scaling (`allowFontScaling`) without clipping or layout truncation.
5. **Color Contrast**: Ensure interactive states (default, pressed, disabled) maintain WCAG-compliant contrast for text/icons against background colors.

---

## 5. Anti-Goals (Strictly Prohibited Patterns)

1. **No Ad-Hoc Props Without Primitive Extension**: Never create custom input or select wrappers that fail to extend `React.ComponentProps<typeof Primitive>` or fail to pass `...props`.
2. **No Monolithic Component Files**: Keep reusable components modular and under ~120 lines.
3. **No Unwrapped Input Layout Blocks**: Never create input controls with manual `<Text>` error messages when `FormControlError` exists.
4. **No String-Only Button Props**: Always allow React node composition (`children?: React.ReactNode`) on action components.
5. **No Inline Option Arrays**: Always import select choices from `src/config/constants.ts`.
6. **No Inaccessible Interactive Elements**: Never leave icon-only buttons or custom touchables without `accessibilityRole` and `accessibilityLabel`.
7. **No Unhandled Render States**: Never omit loading, empty, or error states for components consuming dynamic or async data.

---

## 6. Pre-Merge Checklist

- [ ] **Primitive Extension**: Extends `React.ComponentProps<typeof Primitive>` and forwards `...props`.
- [ ] **Composition Support**: Action components accept `children?: React.ReactNode`.
- [ ] **FormControl Integration**: Wrapped in Gluestack UI `FormControl` suite (`FormControl`, `FormControlLabel`, `FormControlError`).
- [ ] **Option Centralization**: Static dropdown choices and options imported from `src/config/constants.ts`.
- [ ] **Render & Interactive States**: Default, pressed, disabled, loading, empty, and error states handled correctly.
- [ ] **Type Safety**: All props strictly typed without `any`, variants use closed string unions.
- [ ] **Accessibility Roles & Labels**: `accessibilityRole` and `accessibilityLabel` present on interactive elements.
- [ ] **Accessibility State**: `accessibilityState={{ disabled: true }}` provided for disabled components.
- [ ] **Touch Target Size**: Minimum 44x44pt (iOS) / 48x48pt (Android) hit area ensured (`hitSlop` used if visual element is smaller).
- [ ] **Dynamic Font Scaling**: Respects system font scaling without text truncation.
