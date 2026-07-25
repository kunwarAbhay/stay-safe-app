import {
  ContactGroup,
  ContactPermission,
  Relationship,
} from "@/src/features/contacts/types/contact";
import {
  ContactFilterCategory,
  ContactFilterOption,
} from "@/src/features/contacts/types/contact-filter";

/**
 * Factory helper for creating custom contact filters easily in the future.
 */
export const createContactFilter = (
  id: string,
  category: ContactFilterCategory,
  label: string,
  matches: ContactFilterOption["matches"],
): ContactFilterOption => ({
  id,
  category,
  label,
  matches,
});

/**
 * Pre-defined catalog of contact filters grouped by category.
 */
export const CONTACT_FILTERS = {
  // --- Permission Filters ---
  SOS: createContactFilter(
    "permission_sos",
    ContactFilterCategory.Permission,
    "SOS",
    (contact) => contact.sosPermission === ContactPermission.ALLOWED,
  ),
  STAY_WITH_ME: createContactFilter(
    "permission_stay_with_me",
    ContactFilterCategory.Permission,
    "Stay with Me",
    (contact) => contact.stayWithMePermission === ContactPermission.ALLOWED,
  ),

  // --- Group Filters ---
  INNER_CIRCLE: createContactFilter(
    "group_inner_circle",
    ContactFilterCategory.ContactGroup,
    "Inner Circle",
    (contact) => contact.contactGroup === ContactGroup.INNER_CIRCLE,
  ),
  NEARBY_HELPERS: createContactFilter(
    "group_nearby_helpers",
    ContactFilterCategory.ContactGroup,
    "Nearby Helpers",
    (contact) => contact.contactGroup === ContactGroup.NEARBY_HELPERS,
  ),

  // --- Relationship Filters ---
  FAMILY: createContactFilter(
    "relationship_family",
    ContactFilterCategory.Relationship,
    "Family",
    (contact) => contact.relationship === Relationship.FAMILY,
  ),
  FRIEND: createContactFilter(
    "relationship_friend",
    ContactFilterCategory.Relationship,
    "Friend",
    (contact) => contact.relationship === Relationship.FRIEND,
  ),
  CLOSE_FRIEND: createContactFilter(
    "relationship_close_friend",
    ContactFilterCategory.Relationship,
    "Close Friend",
    (contact) => contact.relationship === Relationship.CLOSE_FRIEND,
  ),
  PARTNER: createContactFilter(
    "relationship_partner",
    ContactFilterCategory.Relationship,
    "Partner",
    (contact) => contact.relationship === Relationship.PARTNER,
  ),
  COLLEAGUE: createContactFilter(
    "relationship_colleague",
    ContactFilterCategory.Relationship,
    "Colleague",
    (contact) => contact.relationship === Relationship.COLLEAGUE,
  ),
  CLASSMATE: createContactFilter(
    "relationship_classmate",
    ContactFilterCategory.Relationship,
    "Classmate",
    (contact) => contact.relationship === Relationship.CLASSMATE,
  ),
  NEIGHBOR: createContactFilter(
    "relationship_neighbor",
    ContactFilterCategory.Relationship,
    "Neighbor",
    (contact) => contact.relationship === Relationship.NEIGHBOR,
  ),
  OTHER: createContactFilter(
    "relationship_other",
    ContactFilterCategory.Relationship,
    "Other",
    (contact) => contact.relationship === Relationship.OTHER,
  ),
} as const;
