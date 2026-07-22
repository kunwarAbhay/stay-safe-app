---
name: rn-component-builder
description: Build production-ready, reusable React Native/Expo components in TypeScript. Use this whenever the user asks to create, build, or refactor a UI component for a React Native or Expo app — buttons, inputs, cards, lists, modals, form fields, headers, or any reusable piece of UI. Trigger for requests like "build a Button component," "create a reusable Card," "make this component production ready," "add a design system component," or "refactor this into a shared component." Covers variant/prop API design, accessibility, platform differences (iOS/Android), theming, performance, loading/error/empty states, and Storybook-style preview/testing setup. Not for full-screen composition, navigation setup, or backend integration — use this after those exist, when building the reusable building blocks that screens are made of.
---

# React Native Component Builder

Produces individual, reusable, production-grade React Native components — not full screens. A component built with this skill should be droppable into any screen in the app without modification, fully typed, accessible, and tested.

## Step 0: Gather context before writing any code

Don't generate a component from the name alone. Confirm or infer from the existing codebase:

- **Existing patterns** — this project uses **gluestack-ui v5** (NativeWind / Tailwind CSS v4). All components must be built using the standard gluestack-ui primitives from `components/ui/` and styled with Tailwind utility classes (`className`). Do not introduce or use `StyleSheet.create`, styled-components, or any other styling pattern.
- **Design tokens** — utilize the existing gluestack-ui / Tailwind design tokens (colors, spacing, typography). Use Tailwind utility classes for all styling. Never hardcode hex values or magic numbers.
- **Target variants and states** — what visual variants does this component need (e.g. primary/secondary/destructive for a button)? What states (default, pressed, disabled, loading, error)?

If this context can't be inferred and isn't given, ask one focused question rather than guessing a design system into existence.

## Step 1: Design the prop API first

Write the TypeScript interface before the implementation. A good RN component prop API:

- Extends the underlying primitive's props where sensible (e.g. `TouchableOpacityProps`, `TextInputProps`) via `Omit<>`/intersection rather than re-declaring `onPress`, `style`, etc.
- Uses a closed union for variants (`variant: 'primary' | 'secondary' | 'destructive'`), never a loose `string`
- Separates **content props** (label, value, icon) from **behavior props** (onPress, onChange) from **appearance props** (variant, size) — don't let one `style` prop become the only customization path
- Makes accessibility props first-class, not an afterthought: `accessibilityLabel`, `accessibilityHint`, `accessibilityRole` should have sensible defaults but remain overridable
- Has zero required props where a sensible default exists — every optional prop needs an explicit default, not an implicit `undefined` fallthrough

Show this interface to the user (or state it briefly) before writing the full implementation if the component has a non-trivial API (5+ props) — cheap to correct now, expensive after the implementation is built on top of it.

## Step 2: Implement with production concerns built in, not bolted on

Every component this skill produces must handle:

- **All interactive states**: default, pressed/active (use `Pressable` with a style function, not bare `TouchableOpacity` opacity guessing), disabled (visually distinct AND `accessibilityState={{ disabled: true }}`, AND actually blocks the handler), loading (spinner replaces content without layout shift — reserve the space)
- **Touch layer target**: non-interactive primitives (`View`, `Box`, `Badge`) do not handle touch events. Any interactive component (e.g. `Chip` wrapping `Badge`) MUST wrap its container in a `Pressable` to capture `onPress` handlers.
- **No inline handlers on components**: avoid inline arrow functions (e.g., `onPress={() => handle(item)}`). Extract dedicated item sub-components or named handler functions.
- **Platform differences where they matter**: shadow (`shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius` on iOS vs `elevation` on Android — use `Platform.select` rather than shipping an iOS-only shadow), safe-area awareness for anything near screen edges, haptics via `expo-haptics` on press for primary actions if the app already uses haptics elsewhere
- **Text and content overflow**: `numberOfLines` + `ellipsizeMode` on any text that could overflow from real (not placeholder-length) data; test the prop API mentally against a very long string and a very short one
- **Touch target size**: minimum 44x44pt hit area (use `hitSlop` if the visual element is smaller) — this is an accessibility and usability requirement, not optional polish
- **Memoization where it matters**: `React.memo` for components rendered in lists; `useCallback`/`useMemo` for handlers/derived values passed as props to memoized children — but don't cargo-cult memoization onto components with no measured re-render cost
- **Style performance**: styling must be applied exclusively via Tailwind utility classes (`className`). Never use inline object literals (`style={{...}}`) recreated every render for anything performance-sensitive.

## Step 3: Accessibility pass (explicit, not assumed)

For every component, verify:
- Every interactive element has `accessibilityRole` (`button`, `link`, `header`, etc.) and a meaningful `accessibilityLabel` — not the visible text blindly repeated if that text alone is ambiguous out of context (e.g. an icon-only button needs a real label)
- Sufficient color contrast for text/icon against background at every variant, including disabled state
- Dynamic font scaling isn't broken — don't hardcode `fontSize` + fixed-height containers that clip text when the user has increased system font size; test against `allowFontScaling`
- Focus order is logical if the component is part of a form (screen reader users navigate linearly)

## Step 4: States the component must render correctly

If the component displays async or list data, it isn't done until it handles:
- **Loading** — skeleton or spinner, not a blank flash
- **Empty** — explicit empty state, not just "nothing rendered"
- **Error** — a message and, where applicable, a retry action
- **Success/populated** — the obvious case, but verify it against realistic data lengths, not just short placeholder strings

## Step 5: Write a preview/story and a test

- Create a lightweight preview usage (either a Storybook story if the project uses `@storybook/react-native`, or a simple preview screen/file under `components/__previews__/` if it doesn't) that renders every variant × state combination in one place, so visual regressions are catchable at a glance
- Write a component test (React Native Testing Library) that verifies: renders with minimal required props, calls the right handler on interaction, respects `disabled`, and matches accessibility expectations (`getByRole`, `getByLabelText`) rather than testing implementation details

## Step 6: Self-review checklist before presenting the component

Walk through explicitly and report any gaps rather than silently shipping them:
- [ ] No hardcoded colors/spacing/fonts outside the theme/token system
- [ ] All props typed, no `any`, variants are closed unions
- [ ] Handles disabled, loading, error, and empty states as applicable
- [ ] 44x44pt minimum touch target
- [ ] No inline arrow functions on component
- [ ] Complex screens or forms decomposed into small, modular sub-components
- [ ] accessibilityRole + accessibilityLabel present and meaningful
- [ ] Works with dynamic font scaling and long/short real-world content
- [ ] Platform-specific styling (shadow/elevation) handled via `Platform.select`, not iOS-only
- [ ] No inline style objects on anything rendered in a list
- [ ] Preview/story covers every variant × state combination
- [ ] At least one test file exists and covers interaction + accessibility

## Guardrails

- **Don't invent a new styling system or state library** if the project already has one — match what's there, even if you'd personally choose differently. Flag the mismatch as a suggestion, don't unilaterally introduce a second pattern.
- **Don't build a full screen when asked for a component.** If the request is ambiguous between "a component" and "a screen," build the smallest reusable unit and note that screen composition is a separate step.
- **Don't create monolithic 200+ line form or view components.** Decompose complex forms or screens into small, dedicated field sub-components to ensure readability, maintainability, and clear prop interfaces.
- **Don't pass `onPress` to non-interactive primitives (`View`, `Box`, `Badge`).** React Native non-interactive primitives silently ignore touch props. Always wrap interactive containers in `Pressable`.
- **Don't write inline arrow functions on components.** Always extract named handler functions or dedicated item sub-components to avoid unnecessary function re-allocations and keep JSX clean.
- **Don't skip the states in Step 4** because the happy path is what's fun to build — a card that only renders when data is present isn't production ready, regardless of how polished that one render path looks.
- If the user's app already has a component with overlapping responsibility, say so and propose consolidating rather than creating a near-duplicate.