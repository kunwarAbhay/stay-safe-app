---
name: frontend-code-review
description: Use this skill whenever the user asks for a code review, pull request (PR) review, frontend architecture review, component review, refactoring audit, or code quality feedback on frontend code — including React, React Native, Vue, Angular, or TypeScript files. Triggers on requests like "review this component", "check this PR", "audit this code for architecture issues", "how can I improve this component", or explicit mentions of frontend design patterns, state management, reusability, or maintainability.
---

# Frontend Code Review Guidelines

## Overview & Execution Mindset
Perform thorough, actionable, context-aware frontend code reviews. Focus strictly on architectural integrity, component design, long-term maintainability, correctness, and user/developer experience across React, React Native, Vue, and Angular applications.

## Trigger Conditions
Activate this review workflow when:
- **Direct Review Requests**: "Review this component", "Review my code", "PR review for X", "Audit this file".
- **Refactoring & Optimization**: "How can I clean this up?", "Refactor this component", "Is this over-engineered?", "Optimize this frontend code".
- **Quality & Architecture Inquiries**: "Check for anti-patterns", "Evaluate state management", "Review type safety", "Is this component generic enough?".

---

## Review Dimensions & Concrete Checkable Criteria

Each dimension provides concrete, checkable criteria rather than abstract software principles.

### 1. DRY (Don't Repeat Yourself) vs. Coincidental Similarity
- **Actual Duplication**: Look for identical business logic, duplicate data transformations, or synchronized state logic across multiple files.
- **Coincidental Similarity**: Do NOT flag two blocks as duplicate if their underlying business domains, validation rules, or lifecycles differ and are expected to diverge over time.
- **Checkable Criteria**:
  - Are two functions >80% identical in AST structure handling the *exact same domain entity*? -> Extract shared utility or custom hook.
  - Are two UI components visually similar but bound to distinct domain models (e.g., `UserProfileCard` vs `ProductVariantCard`)? -> Keep separate; do not couple with a premature abstract wrapper.

### 2. KISS (Keep It Simple, Stupid)
- **Premature Abstraction Layers**: Flag custom wrappers around native or library primitives that add no validation, styling, or state encapsulation.
- **Unnecessary Indirection**: Flag chains of pass-through functions, redundant custom events, or multi-layered wrapper HOCs/render functions that merely forward props without modification.
- **Over-Engineered Generics**: Flag complex generic types (`<T extends Record<K, any>...>`) where a concrete interface or simple union type suffices for current consumers.
- **Checkable Criteria**:
  - Does a helper file or abstraction have only 1 caller and <5 lines of logic? -> Inline unless required for unit test isolation.
  - Are props passed through >2 intermediate components without being read? -> Use composition (`children` / slots) or localized Context.

### 3. YAGNI (You Aren't Gonna Need It)
- **Speculative Extensibility**: Flag unused prop flags (e.g., `isExperimental`, `futureTheme`, `allowCustomX`), fallback branches for conditions that can never occur in the current application scope, and unused generic params.
- **Unconsumed Hooks/Utilities**: Flag custom hooks or utility helpers exported for hypothetical future use without active callers in the codebase.
- **Checkable Criteria**:
  - Search for prop or configuration references across the repository: 0 external consumers -> Remove or defer implementation until required.

### 4. Component Design & API Surface
- **Single Responsibility**: Ensure components don't mix data fetching, complex data transformation, visual rendering, and animation management in a single monolithic file.
- **Prop Surface Size & Shape**:
  - Flag components with >7-8 individual props when related props can be grouped into a domain object, union type, or composed.
  - Flag boolean flag proliferation (`isHeaderVisible`, `isFooterVisible`, `isSidebarOpen`) that can result in invalid/impossible state combinations. Prefer finite state machines or discriminated unions (`mode: 'compact' | 'expanded' | 'full'`).
- **Controlled vs. Uncontrolled**: Ensure form inputs and disclosure elements don't mix controlled (`value`) and uncontrolled (`defaultValue`) patterns ambiguously.
- **Composition vs. Configuration**:
  - Avoid "god components" driven by dozens of configuration props (`renderHeader`, `renderFooter`, `headerTitle`, `headerIcon`, `onHeaderClick`).
  - Prefer compound components or `children`/slots (`<Card><Card.Header title="..." /></Card>`).

### 5. Design Patterns (Appropriate Application vs. Overkill)
- **Container / Presentational**: Separate side-effectful data fetching/store hooks from pure UI rendering when testability or Storybook/preview setup is required.
- **Compound Components**: Use for tightly coupled UI elements sharing implicit state (e.g., `Accordion`, `Tabs`, `Select`, `DropdownMenu`).
- **Hooks / Composables Extraction**: Extract custom hooks (React/React Native) or composables (Vue) when state logic, side effects, or lifecycle handlers obscure the JSX/template layout (>30 lines of state/effect setup before return).
- **Overkill Warning**: Do NOT suggest Factory or Strategy patterns for 2-3 simple `if/else` or `switch` branches. A simple object lookup dictionary or inline conditional is preferred.

### 6. State Management
- **Locality of State**: State must live as close to where it is consumed as possible. Flag global store state (Redux, Zustand, Vuex, Pinia) used for local UI toggles (e.g., modal open/closed).
- **Derived vs. Stored State**:
  - Flag state duplicates that store calculated data (e.g., `const [fullName, setFullName] = useState(...)` when `firstName` and `lastName` exist as state).
  - Compute derived data during render or with `useMemo` / `computed` / selectors.
- **Unnecessary Re-renders & Prop Drilling**:
  - Flag Context providers passing inline un-memoized object values to deeply nested component trees.
  - Flag prop drilling beyond 3 levels where layout composition (`children`) or context/store hooks cleanly eliminate pass-throughs.

### 7. Reusability Boundaries (Generic vs. Falsely Generic)
- **Falsely Generic Components**: Components named `GenericCard` or `UniversalTable` filled with `if (type === 'user') ... else if (type === 'product')` conditionals.
- **True Generics**: Components with zero domain knowledge that rely entirely on props, slots, or polymorphic renders (`as` prop, slot components).
- **Checkable Criteria**:
  - If a "shared/ui" component contains imports from specific domain features (e.g. `@/features/checkout`), it violates the reusability boundary.

### 8. Type Safety
- **Precise TypeScript**:
  - `any` is forbidden unless strictly unavoidable and accompanied by an inline rationale comment.
  - Flag overly loose types like `object`, `{}`, or `Function`. Use `Record<string, unknown>` or explicit function signatures (`() => void`).
  - Prefer Discriminated Unions for async state (`type State = { status: 'idle' } | { status: 'loading' } | { status: 'success'; data: Data } | { status: 'error'; error: Error }`).
  - Flag redundant type assertions (`as string`) where proper type narrowing (type guards, optional chaining) should be used.

### 9. Naming & Readability
- **Intent-Conveying Names**: Boolean variables/props must use prefixes (`isOpen`, `hasPermission`, `canSubmit`, `shouldFetch`). Event handler props use `onAction` (`onSelect`), internal handlers use `handleAction` (`handleSelect`).
- **Magic Numbers & Strings**: Extract hardcoded thresholds, timeout delays, and status string literals into named `const` variables, enums, or config objects.

### 10. Testability
- **Pure Function Extraction**: Complex calculations, formatters, and data mappers embedded inside component bodies must be extracted to pure functions outside the component.
- **Isolated Side Effects**: Side effects (API calls, browser API access, device storage) must be wrapped in mockable services or custom hooks.

### 11. Performance Smells
- **Targeted Optimization Only**: Do not blindly wrap every callback or value in `useMemo` / `useCallback` / `React.memo`.
- **Where Memoization Matters**:
  - Passing callbacks to long/heavy virtualized lists or deeply nested heavy component trees.
  - Expensive calculations (array sorting/filtering over large arrays, complex data transformations).
- **Unstable References**: Flag inline object/array creation or inline arrow functions passed to memoized components or effect dependency arrays that trigger unnecessary re-render cascades or infinite loops.

### 12. Accessibility (a11y) & Platform Correctness
- **Web**: Interactive elements must be semantic (`<button>`, `<a>`, `<input>`) or have appropriate `role`, `tabIndex`, `aria-*` attributes and keyboard event handlers (`onKeyDown`).
- **React Native**: Interactive elements must have `accessibilityRole`, `accessibilityLabel`, and appropriate touch hitSlop (`hitSlop`). Touchables must respond appropriately across iOS & Android (e.g., `Pressable` with ripple feedback on Android).
- **Vue / Angular**: Ensure proper template directive accessibility, ARIA bindings, and focus management during modal disclosures or routing.

---

## Explicit Anti-Goals (What NOT To Do)

1. **Do NOT review style/formatting**: Do not comment on trailing commas, indentation, single vs double quotes, semi-colons, or import sorting. Assume Linters/Prettier handle that.
2. **Do NOT suggest abstraction for its own sake**: Never request a factory, context, custom hook, or wrapper component unless it solves an active defect, reduces measurable complexity, or unlocks needed testability.
3. **Do NOT apply design patterns dogmatically**: Patterns exist to solve specific friction. If inline code is 10 lines of clear procedural logic, do not force a Strategy pattern.
4. **Do NOT rewrite working code without clear wins**: Never demand a rewrite simply because you would have structured it differently if there is no improvement in maintainability, correctness, performance, or type safety.
5. **Do NOT ignore established codebase conventions**: Respect local project patterns (e.g., if the project uses Zustand over Redux, or CSS Modules over Tailwind), do not impose alien paradigms unless explicitly asked to modernize the architecture.

---

## Findings Output Format

Organize all review findings into clear, severity-tagged groups. ALWAYS follow this exact markdown structure:

### Summary
[Brief 2-3 sentence overview of the code quality, main strengths, and primary areas for improvement.]

### Review Findings

#### [BLOCKER | SUGGESTION | NITPICK] Finding Title
- **Dimension**: [e.g. State Management / Component Design / DRY / Type Safety / Accessibility]
- **Location**: [`[filename.tsx:L15-L28]`](file:///path/to/filename.tsx#L15-L28)
- **Problem**: Concise description of the anti-pattern or defect.
- **Why It Matters**: Rationale explaining the maintenance burden, performance impact, runtime bug risk, or accessibility gap.
- **Refactoring Suggestion**:

```typescript
// ❌ BEFORE
[Problematic code snippet]

// ✅ AFTER
[Improved, production-ready refactoring]
```

---

### Severity Tags Definition
- **`[BLOCKER]`**: Defects causing runtime crashes, memory leaks, broken accessibility, invalid state traps, severe security/type safety breaches, or severe performance degradation.
- **`[SUGGESTION]`**: Architectural improvements, cleaner component boundaries, code deduplication, better state locality, or design pattern applications that meaningfully improve maintainability.
- **`[NITPICK]`**: Minor readability, naming clarity, or small type refinement opportunities with low urgency.

---

## Calibration Examples

### ❌ Vague Review Comment (DO NOT DO THIS)
> **Comment**: "This component has bad reusability and violates DRY. Please refactor to make it cleaner."
> *Why it fails*: Gives no file location, no concrete reason why duplication matters, cites no specific pattern, and provides no actionable before/after code suggestion.

### ✅ Specific, Actionable Review Comment (DO THIS)
> #### `[SUGGESTION]` Extract Address Fields into a Composed Form Section
> - **Dimension**: Reusability Boundaries & Component Design
> - **Location**: [`src/features/checkout/components/ShippingForm.tsx:L45-L89`](file:///d:/coding/stay-safe-app/src/features/checkout/components/ShippingForm.tsx#L45-L89)
> - **Problem**: `ShippingForm` duplicates 12 identical address input fields and validation schemas already implemented in `BillingForm.tsx`. Additionally, it passes 14 individual address props (`street`, `setStreet`, `city`, `setCity`, etc.) instead of a unified address object.
> - **Why It Matters**: Any schema change to address validation (e.g., postal code format validation) requires updating both forms in sync. If one form is updated without the other, checkout validation diverges silently.
> - **Refactoring Suggestion**:
>
> ```tsx
> // ❌ BEFORE: Duplicate inline fields with 14 individual props
> export function ShippingForm({ street, setStreet, city, setCity, zip, setZip, ...props }: Props) {
>   return (
>     <form>
>       <input value={street} onChange={(e) => setStreet(e.target.value)} />
>       <input value={city} onChange={(e) => setCity(e.target.value)} />
>       <input value={zip} onChange={(e) => setZip(e.target.value)} />
>     </form>
>   );
> }
> 
> // ✅ AFTER: Composed AddressFields component with unified domain object
> interface AddressFieldsProps {
>   value: Address;
>   onChange: (address: Address) => void;
> }
> 
> export function AddressFields({ value, onChange }: AddressFieldsProps) {
>   const handleChange = (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
>     onChange({ ...value, [field]: e.target.value });
>   };
> 
>   return (
>     <fieldset>
>       <input value={value.street} onChange={handleChange('street')} />
>       <input value={value.city} onChange={handleChange('city')} />
>       <input value={value.zip} onChange={handleChange('zip')} />
>     </fieldset>
>   );
> }
> ```
