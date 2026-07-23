import { Contact } from "@/src/features/contacts/types/contact";
import {
  ContactFilterOption,
  ContactFiltersByCategory,
} from "@/src/features/contacts/types/contact-filter";

/**
 * Evaluates whether a contact matches the search query (name or phone number).
 */
const matchesSearchQuery = (contact: Contact, searchQuery: string): boolean => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) return true;
  const matchesName = contact.name.toLowerCase().includes(normalizedQuery);
  const matchesPhone = contact.mobileNumberValue.includes(normalizedQuery);
  return matchesName || matchesPhone;
};

/**
 * Groups active filter options by their category key.
 */
const groupFiltersByCategory = (
  selectedFilters: ContactFilterOption[],
): ContactFiltersByCategory => {
  return selectedFilters.reduce<ContactFiltersByCategory>((acc, filter) => {
    acc[filter.category] = acc[filter.category] || [];
    acc[filter.category].push(filter);
    return acc;
  }, {});
};

/**
 * Checks if a contact satisfies at least one filter within a given category (OR logic).
 */
const matchesCategoryFilters = (
  contact: Contact,
  categoryFilters: ContactFilterOption[],
): boolean => {
  return categoryFilters.some((filter) => filter.matches(contact));
};

/**
 * Checks if a contact satisfies all active filter categories (AND logic across categories).
 */
const matchesAllFilterCategories = (
  contact: Contact,
  filtersByCategory: ContactFiltersByCategory,
): boolean => {
  return Object.values(filtersByCategory).every((categoryFilters) =>
    matchesCategoryFilters(contact, categoryFilters),
  );
};

/**
 * Filter contacts by search query and active filter options.
 *
 * Rules:
 * - Search query matches name or phone number.
 * - Filters in different categories are combined with AND.
 * - Filters in the same category are combined with OR.
 */
export const filterContacts = (
  contacts: Contact[],
  searchQuery: string,
  selectedFilters: ContactFilterOption[],
): Contact[] => {
  const filtersByCategory = groupFiltersByCategory(selectedFilters);

  return contacts.filter(
    (contact) =>
      matchesSearchQuery(contact, searchQuery) &&
      matchesAllFilterCategories(contact, filtersByCategory),
  );
};
