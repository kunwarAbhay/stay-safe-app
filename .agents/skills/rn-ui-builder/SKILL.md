---
name: rn-ui-builder
description: Build production-ready, reusable React Native & Gluestack UI components in TypeScript. Use this whenever asked to create, build, or refactor a reusable UI component — buttons, inputs, pickers, cards, modals, form fields, headers, or shared UI widgets. Covers variant/prop API design, FormControl integration, accessibility, theming, loading/error/empty states, and preview setup. Not for full-screen routing or screen layout composition — use rn-screen-builder for full screens.
---

# React Native & Gluestack UI Component Builder

Produces individual, reusable, production-grade React Native & Gluestack UI components.

---

## 1. Core Architecture & Prop API Rules

1. **Primitive Prop Extension (`...props`)**: Interfaces MUST extend underlying primitive component props (`extends React.ComponentProps<typeof Primitive>`) and forward `...props` to root. _Never create ad-hoc component interfaces without primitive extension._
2. **Composition (`children`)**: Action components MUST accept `children?: React.ReactNode` alongside an optional string `label`.
3. **Compound Slots vs. Shorthand Props**: Use shorthand props ONLY for primitive scalar values (`title`, `subtitle`, `showBackButton`). Use compound sub-components (`<Header.Left>`, `<Header.Right>`) for layout slots taking custom component trees. _Never pass `ReactNode` props for structural slots (`left?: ReactNode`)._
4. **FormControl Suite Integration**: Form inputs, select controls, and pickers MUST use Gluestack `FormControl`, `FormControlLabel`, `FormControlError`, `FormControlErrorText`. _Never render manual `<Text>` error blocks._
5. **Centralized Options**: Import select/picker choices from `@/src/config/constants`. _Never inline static option arrays._
6. **Closed Union Variants**: Use strict string unions for variants (`variant: "primary" | "secondary" | "destructive"`).
7. **Interactive & Render States**: Handle `default`, `pressed` (`active:`), `disabled` (`accessibilityState={{ disabled: true }}`), and `loading` (reserve dimensions to prevent layout shift).

---

## 2. Canonical Implementation Patterns

### Pattern A: Reusable Selector (`AgeSelector.tsx`)

Extends primitive props, uses centralized constants.

```tsx
import { ChevronDown } from "lucide-react-native";
import { AGE_OPTIONS } from "@/src/config/constants";

export interface AgeSelectProps extends React.ComponentProps<typeof Select> {
  value: string;
  onChange: (age: string) => void;
}

export const AgeSelector = ({ value, onChange, ...props }: AgeSelectProps) => (
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
```

### Pattern B: Composable Action Button (`SubmitButton.tsx`)

Supports ReactNode composition and scalar `label`.

```tsx
export interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  isDisabled?: boolean;
  label?: string;
  children?: React.ReactNode;
}

export const SubmitButton = ({
  children,
  label,
  isLoading = false,
  isDisabled = false,
  onPress,
  className,
  ...props
}: SubmitButtonProps) => {
  const content = children ?? label;
  return (
    <Button
      size="lg"
      className={cn("rounded-full bg-primary-500", className)}
      onPress={onPress}
      disabled={isLoading || isDisabled}
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
};
```

### Pattern C: Custom Form Input (`EmailInput.tsx`)

Uses `FormControl` suite and `InputSlot` icon wrappers.

```tsx
export const EmailInput = ({
  label = "Email Address",
  placeholder = "Enter email",
  error,
  onChange,
  value,
  className,
}: EmailInputProps) => (
  <FormControl isInvalid={!!error} className={className}>
    <FormControlLabel>
      <FormControlLabelText>{label}</FormControlLabelText>
    </FormControlLabel>
    <Input>
      <InputSlot>
        <InputIcon as={MailIcon} />
      </InputSlot>
      <InputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
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
  </FormControl>
);
```

### Pattern D: Composable Compound Layout (`ScreenHeader.tsx`)

Compound sub-components for structural layout slots + primitive shorthand props for text/navigation.

```tsx
export interface ScreenHeaderProps extends React.ComponentProps<typeof HStack> {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  children?: React.ReactNode;
}

ScreenHeader.Left = ScreenHeaderLeft;
ScreenHeader.Content = ScreenHeaderContent;
ScreenHeader.Title = ScreenHeaderTitle;
ScreenHeader.Subtitle = ScreenHeaderSubtitle;
ScreenHeader.Right = ScreenHeaderRight;
ScreenHeader.BackButton = ScreenHeaderBackButton;
```

---

## 3. Accessibility & Usability Standards

1. **Accessibility Attributes**: Provide explicit `accessibilityRole` (`button`, `combobox`, `header`) and `accessibilityLabel` and `accessibilityHint` on interactive controls.
2. **Touch Targets**: Ensure min 44x44pt (iOS) / 48x48pt (Android) hit area (use `hitSlop` if visual element is smaller).
3. **Typography**: Respect system font scaling (`allowFontScaling`) without layout clipping or fixed height truncation.

---

## 4. Pre-Merge Checklist

- [ ] Extends primitive props (`ComponentProps<typeof Primitive>`) and forwards `...props`.
- [ ] Uses `FormControl` suite for form controls and errors.
- [ ] Compound slots (`Header.Left`) for layout slots; scalar shorthands (`title`) for text/nav.
- [ ] Centralizes static options in `constants.ts`.
- [ ] Handles interactive/loading/disabled/empty/error states cleanly.
- [ ] Includes `accessibilityRole`, `accessibilityLabel`, `accessibilityHint`, and `accessibilityState={{ disabled }}`.
