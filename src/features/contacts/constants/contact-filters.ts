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
    "permission",
    "SOS",
    (contact) => contact.sosPermission === ContactPermission.ALLOWED,
  ),
  STAY_WITH_ME: createContactFilter(
    "permission_stay_with_me",
    "permission",
    "Stay with Me",
    (contact) => contact.stayWithMePermission === ContactPermission.ALLOWED,
  ),

  // --- Group Filters ---
  INNER_CIRCLE: createContactFilter(
    "group_inner_circle",
    "contactGroup",
    "Inner Circle",
    (contact) => contact.contactGroup === ContactGroup.INNER_CIRCLE,
  ),
  NEARBY_HELPERS: createContactFilter(
    "group_nearby_helpers",
    "contactGroup",
    "Nearby Helpers",
    (contact) => contact.contactGroup === ContactGroup.NEARBY_HELPERS,
  ),

  // --- Relationship Filters ---
  FAMILY: createContactFilter(
    "relationship_family",
    "relationship",
    "Family",
    (contact) => contact.relationship === Relationship.FAMILY,
  ),
  FRIEND: createContactFilter(
    "relationship_friend",
    "relationship",
    "Friend",
    (contact) => contact.relationship === Relationship.FRIEND,
  ),
  CLOSE_FRIEND: createContactFilter(
    "relationship_close_friend",
    "relationship",
    "Close Friend",
    (contact) => contact.relationship === Relationship.CLOSE_FRIEND,
  ),
  PARTNER: createContactFilter(
    "relationship_partner",
    "relationship",
    "Partner",
    (contact) => contact.relationship === Relationship.PARTNER,
  ),
  COLLEAGUE: createContactFilter(
    "relationship_colleague",
    "relationship",
    "Colleague",
    (contact) => contact.relationship === Relationship.COLLEAGUE,
  ),
  CLASSMATE: createContactFilter(
    "relationship_classmate",
    "relationship",
    "Classmate",
    (contact) => contact.relationship === Relationship.CLASSMATE,
  ),
  NEIGHBOR: createContactFilter(
    "relationship_neighbor",
    "relationship",
    "Neighbor",
    (contact) => contact.relationship === Relationship.NEIGHBOR,
  ),
  OTHER: createContactFilter(
    "relationship_other",
    "relationship",
    "Other",
    (contact) => contact.relationship === Relationship.OTHER,
  ),
} as const;
