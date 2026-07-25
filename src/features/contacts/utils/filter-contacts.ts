import { Contact } from "@/src/features/contacts/types/contact";
import {
  ContactFilterCategory,
  ContactFilterOption,
  ContactFiltersByCategory,
  FilterOption,
} from "@/src/features/contacts/types/contact-filter";

/**
 * Filter Decorator type.
 * Takes an array of contacts and returns a decorated/filtered array of contacts.
 */
export type ContactFilterDecorator = (contacts: Contact[]) => Contact[];

/**
 * Decorator Composer / Pipeline.
 * Chains multiple filter decorators together sequentially.
 */
export const composeContactFilters = (
  ...decorators: (ContactFilterDecorator | undefined | null | false)[]
): ContactFilterDecorator => {
  const activeDecorators = decorators.filter(
    (d): d is ContactFilterDecorator => typeof d === "function",
  );

  return (contacts: Contact[]) =>
    activeDecorators.reduce(
      (currentContacts, decorator) => decorator(currentContacts),
      contacts,
    );
};

/**
 * Decorator Factory: Filters contacts by search query (name or phone number).
 */
export const createSearchFilterDecorator = (
  searchQuery: string,
): ContactFilterDecorator => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return (contacts: Contact[]) => {
    if (!normalizedQuery) return contacts;
    return contacts.filter((contact) => {
      const matchesName = contact.name.toLowerCase().includes(normalizedQuery);
      const matchesPhone = contact.mobileNumberValue.includes(normalizedQuery);
      return matchesName || matchesPhone;
    });
  };
};

/**
 * Decorator Factory: Filters contacts by active category filter options.
 * - OR matching within the same category
 * - AND matching across different categories
 */
export const createCategoryFilterDecorator = (
  selectedFilters: ContactFilterOption[],
): ContactFilterDecorator => {
  if (!selectedFilters || selectedFilters.length === 0) {
    return (contacts: Contact[]) => contacts;
  }

  const filtersByCategory = selectedFilters.reduce<ContactFiltersByCategory>(
    (acc, filter) => {
      acc[filter.category] = acc[filter.category] || [];
      acc[filter.category].push(filter);
      return acc;
    },
    {},
  );

  const activeCategories = Object.keys(filtersByCategory);

  return (contacts: Contact[]) =>
    contacts.filter((contact) =>
      activeCategories.every((category) => {
        const categoryFilters = filtersByCategory[category];
        return categoryFilters.some((filter) => filter.matches(contact));
      }),
    );
};

/**
 * Custom Predicate Decorator Factory.
 * Wraps any boolean predicate function into a filter decorator.
 */
export const createPredicateFilterDecorator = (
  predicate: (contact: Contact) => boolean,
): ContactFilterDecorator => {
  return (contacts: Contact[]) => contacts.filter(predicate);
};

/**
 * Convenience evaluator using the Decorator Pattern to filter contacts.
 */
export const filterContacts = (
  contacts: Contact[],
  searchQuery: string,
  selectedFilters: ContactFilterOption[],
): Contact[] => {
  const searchDecorator = createSearchFilterDecorator(searchQuery);
  const categoryDecorator = createCategoryFilterDecorator(selectedFilters);

  return composeContactFilters(searchDecorator, categoryDecorator)(contacts);
};

// --- Pure Filter State Helpers ---

export const addFilter = (
  filters: ContactFilterOption[],
  newFilter: ContactFilterOption,
): ContactFilterOption[] => {
  if (filters.some((f) => f.id === newFilter.id)) return filters;
  return [...filters, newFilter];
};

/**
 * Immutably removes a filter option by filter object or ID.
 */
export const removeFilter = (
  filters: ContactFilterOption[],
  targetFilter: FilterOption,
): ContactFilterOption[] => {
  return filters.filter((f) => f.id !== targetFilter.id);
};

/**
 * Immutably excludes all filters belonging to a specific category.
 */
export const excludeCategoryFilters = (
  filters: ContactFilterOption[],
  categoryToExclude: ContactFilterCategory,
): ContactFilterOption[] => {
  return filters.filter((f) => f.category !== categoryToExclude);
};

/**
 * Retrieves all active filters belonging to a specific category.
 */
export const getCategoryFilters = (
  filters: ContactFilterOption[],
  category: ContactFilterCategory,
): ContactFilterOption[] => {
  return filters.filter((f) => f.category === category);
};
