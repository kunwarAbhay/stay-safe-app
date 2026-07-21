# API Integration Reference — Stay Safe Backend
Generated from `d:\coding\stay-safe-backend` on 2026-07-20.

## Authentication
- **Mechanism**: JWT Bearer token via Clerk.
- **Header format**: `Authorization: Bearer <token>`
- **Token lifetime**: Depends on Clerk configuration (check Clerk settings).
- **Identity mapping**: The user's principal is derived from the Clerk `sub` claim. The role is mapped via `ClerkJwtGrantedAuthoritiesConverter`.

## Domain Entities
### User
- Fields:
  - `id`: Long
  - `externalAuthId`: String, nullable=false, unique=true
  - `name`: String, nullable=false
  - `mobileCountryCode`: String, length=10
  - `mobileNumberValue`: String, length=20
  - `stayWithMe`: SessionStatus (STRING), nullable=false, default `INACTIVE`
  - `sos`: SessionStatus (STRING), nullable=false, default `INACTIVE`
  - `stayWithMeInitiationTimestamp`: ZonedDateTime
  - `stayWithMeClosedTimestamp`: ZonedDateTime
  - `sosInitiationTimestamp`: ZonedDateTime
  - `sosClosedTimestamp`: ZonedDateTime
  - `version`: Integer, nullable=false (optimistic locking)
  - `createdAt`: ZonedDateTime, updatable=false
  - `updatedAt`: ZonedDateTime
  - `createdBy`: String
  - `updatedBy`: String
- Primary key: Long + `GenerationType.IDENTITY`
- Exposed via: `UserResponse` — fields NOT exposed to frontend: `version`, `createdBy`, `updatedBy`.

### Contact
- Fields:
  - `id`: Long
  - `name`: String, nullable=false
  - `mobileCountryCode`: String, nullable=false, length=10
  - `mobileNumberValue`: String, nullable=false, length=20
  - `relationship`: Relationship (STRING), nullable=false
  - `contactGroup`: ContactGroup (STRING), nullable=false
  - `stayWithMePermission`: ContactPermission (STRING), nullable=false
  - `sosPermission`: ContactPermission (STRING), nullable=false
  - `version`: Integer, nullable=false
  - `createdAt`: ZonedDateTime, updatable=false
  - `updatedAt`: ZonedDateTime
- Primary key: Long + `GenerationType.IDENTITY`
- Relationships: `user` → `User`, ManyToOne, lazy, optional=false
- Exposed via: `ContactResponse` — fields NOT exposed to frontend: `version`, `user` (no cyclic reference).

## Endpoints

All responses are wrapped in an `ApiResponse` envelope:
```json
{
  "status": "SUCCESS" | "ERROR",
  "message": "string (optional)",
  "data": { ... } // Or array for paginated data
}
```

### Users
#### GET /api/v1/users/me
- Auth: `USER` or `ADMIN`
- Request body: None
- Success response (200):
  ```json
  {
    "id": "Long",
    "externalAuthId": "string",
    "name": "string",
    "mobileCountryCode": "string",
    "mobileNumberValue": "string",
    "stayWithMe": "ACTIVE | INACTIVE",
    "sos": "ACTIVE | INACTIVE",
    "stayWithMeInitiationTimestamp": "ZonedDateTime",
    "stayWithMeClosedTimestamp": "ZonedDateTime",
    "sosInitiationTimestamp": "ZonedDateTime",
    "sosClosedTimestamp": "ZonedDateTime",
    "createdAt": "ZonedDateTime",
    "updatedAt": "ZonedDateTime"
  }
  ```

#### POST /api/v1/users
- Auth: Required (authenticated user via token)
- Request body:
  ```json
  {
    "name": "string, required, min 3 max 255, alphabets only",
    "mobileCountryCode": "string, required, digits only",
    "mobileNumberValue": "string, optional, length 10-15, digits only"
  }
  ```
- Success response (201): `UserResponse` (same as GET /me)

#### PUT /api/v1/users/me
- Auth: `USER`
- Request body: (Update details, same structure as POST /users but requires valid values)
- Success response (200): `UserResponse` (same as GET /me)

### Contacts
#### GET /api/v1/contact
- Auth: `USER`
- Query Params: `page`, `size` (Spring Data Pageable)
- Success response (200): Returns a Spring Data `Page<ContactResponse>` inside `data` (contains `content` array).

#### POST /api/v1/contact
- Auth: `USER`
- Request body:
  ```json
  {
    "name": "string, required, min 3 max 255, alphabets only",
    "mobileCountryCode": "string, required, max 10 chars, digits only",
    "mobileNumberValue": "string, required, length 10-15, digits only",
    "relationship": "FAMILY | FRIEND | COLLEAGUE | OTHER",
    "contactGroup": "INNER_CIRCLE | NEARBY_HELPERS",
    "stayWithMePermission": "ALLOWED | DENIED",
    "sosPermission": "ALLOWED | DENIED"
  }
  ```
- Success response (201):
  ```json
  {
    "id": "Long",
    "name": "string",
    "mobileCountryCode": "string",
    "mobileNumberValue": "string",
    "relationship": "FAMILY | FRIEND | COLLEAGUE | OTHER",
    "contactGroup": "INNER_CIRCLE | NEARBY_HELPERS",
    "stayWithMePermission": "ALLOWED | DENIED",
    "sosPermission": "ALLOWED | DENIED",
    "createdAt": "ZonedDateTime",
    "updatedAt": "ZonedDateTime"
  }
  ```

#### PUT /api/v1/contact
- Auth: `USER`
- Request body: Same as POST, but includes the contact details to update.
- Success response (200): `ContactResponse`

#### DELETE /api/v1/contact/{id}
- Auth: `USER`
- Path variable: `id` (Long)
- Success response (200): `{ "status": "SUCCESS", "message": "Contact deleted successfully" }`

## Error Response Shape
All exception responses are wrapped in `ApiResponse`.

- `400 BAD_REQUEST`: Validation errors (`MethodArgumentNotValidException`).
  ```json
  {
    "status": "ERROR",
    "message": "Validation failed",
    "data": {
      "fieldName": "error message"
    }
  }
  ```
- `400 BAD_REQUEST`: Invalid contact state (`InvalidContactException`).
- `404 NOT_FOUND`: Resource not found (`UserNotFoundException`, `ContactNotFoundException`).
- `409 CONFLICT`: Duplicate entities (`DuplicateUserException`, `DuplicateContactException`, `DataIntegrityViolationException`).
- `500 INTERNAL_SERVER_ERROR`: Fallback for all other exceptions.

## Enums
- **SessionStatus**: `ACTIVE`, `INACTIVE`
- **ContactGroup**: `INNER_CIRCLE`, `NEARBY_HELPERS`
- **ContactPermission**: `ALLOWED`, `DENIED`
- **Relationship**: `FAMILY`, `FRIEND`, `COLLEAGUE`, `OTHER`

## Pagination
When requesting paginated data (like `GET /api/v1/contact`), append standard Spring query params:
- `?page=0&size=20` (0-indexed pages)
- The envelope inside `data` will be a standard Spring `Page` object, with `content` (array), `totalElements`, `totalPages`, `number`, `size`.

## Open Questions / Gaps
- `UserUpdateRequest` shape was not explicitly detailed (it likely shares similarities with `UserCreateRequest`, verify exact required fields).
- Ensure frontend maps Java's `ZonedDateTime` output properly (usually serialized to ISO-8601 strings).


