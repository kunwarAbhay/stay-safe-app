---
name: rn-api-integrator
description: Use this whenever the user asks to integrate a backend API, hook up a frontend screen to an endpoint, connect React Native/Expo to the server, fetch data, or implement an API client. Triggers on requests like "connect this screen to the backend", "integrate the user profile API", or "wire up the login endpoint".
---

# React Native API Integrator

This skill guides you through integrating a React Native/Expo (TypeScript) frontend against a backend. The existing `API_INTEGRATION.md` is your single source of truth for endpoints, entities, DTOs, auth, and error shapes.

You must enforce production-grade, scalable, maintainable code — not just "make the API call work."

## 1. Context Gathering (Do this before writing any code)

1. **Locate and read `API_INTEGRATION.md`**: If it is missing or stale, STOP and inform the user rather than guessing endpoint shapes.
2. **Inspect the existing frontend codebase**: Look for established patterns already in use:
   - API client setup
   - Data-fetching library (TanStack Query, RTK Query, or raw fetch/axios)
   - Folder structure
   - Existing type conventions
   - Auth/token handling
3. **No Competing Patterns**: NEVER introduce a second competing pattern. If `fetch` is standardized, don't add `axios`. If TanStack Query owns server state, don't add Redux for it. Match what exists, or flag the inconsistency and ask before deviating.

## 2. Layered Architecture (Mandatory)

You must enforce this exact layered architecture:

- **API Client Layer**: One typed client per resource/domain. These must be generated or hand-written from `API_INTEGRATION.md`'s exact request/response shapes. NO inline fetch calls scattered inside components.
- **Type Layer**: TypeScript types/interfaces must match `API_INTEGRATION.md`'s DTOs and entities exactly (field names, casing, nullability). Flag any mismatch between the doc and what's actually returned if discoverable.
- **Data-Fetching/Hook Layer**: One hook per query/mutation (e.g., `useUsers()`, `useCreateUser()`) wrapping the API client. Screens and components call hooks, NEVER the client directly.
- **Screens/Components Layer**: Consume hooks only. NO business logic, NO raw endpoint URLs, NO manual loading/error state management duplicated across screens when a shared pattern should handle it.

## 3. Cross-Cutting Production Concerns

Bake these in for EVERY integrated endpoint:

- **Auth**: Token attachment, refresh-on-401 flow, and logout-on-refresh-failure must be handled once centrally, not reimplemented per feature.
- **Error Handling**: Map the exact error shape from `API_INTEGRATION.md` to a consistent app-level error type. Distinguish network errors, validation errors (4xx with field-level detail), and server errors (5xx) so the UI can respond differently to each.
- **UI States**: Loading, empty, error, and success states are REQUIRED for every screen that consumes an endpoint. No exceptions.
- **Caching/Invalidation Strategy**: Define when queries refetch vs. use cached data, and which mutations invalidate which query keys. Prevent stale data bugs.
- **Logging**: Implement request/response logging or crash-reporting hooks for failed calls, if the project already has a crash reporter integrated.
- **Retry/Backoff**: Implement retry/backoff behavior for transient failures where appropriate, without retrying non-idempotent mutations blindly.

## 4. Type Safety and Drift Prevention

- **Treat `API_INTEGRATION.md` as the contract**: The integration code should fail to compile (TypeScript errors) if a response is used in a way that doesn't match the documented shape, rather than silently accepting `any`.
- **Open Questions**: Note explicitly wherever the doc's "Open Questions" section left something ambiguous. Require that ambiguity be resolved (asked about, or defensively coded) before shipping that endpoint's integration.

## 5. Per-Endpoint Integration Checklist

You must walk and report against this checklist (do not silently skip it) for every endpoint:

- [ ] Typed client method added
- [ ] Types match documented DTO/entity exactly
- [ ] Hook created with proper query key/cache strategy
- [ ] Auth applied if required
- [ ] All four UI states (loading, empty, error, success) handled in the consuming screen
- [ ] Errors mapped to user-facing messages (not raw backend error strings shown to users)
- [ ] Test written for the hook and/or consuming component

## 6. Guardrails

- **NEVER** fetch directly inside a component.
- **NEVER** duplicate a type instead of importing the shared one.
- **NEVER** hardcode a base URL or endpoint path outside the client config.
- **NEVER** swallow errors silently.
- **NEVER** trust a field's presence/shape without checking it against `API_INTEGRATION.md` first — if a field isn't documented there, treat it as unverified and flag it rather than assuming its shape.
