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

/**
 * Custom Array subclass for filter lists enabling direct method chaining on state:
 * `prev.addFilter(newFilter)`
 * `prev.toggleFilter(targetFilter)`
 * `prev.removeFilter(targetFilter)`
 */
export class FilterArray<T extends FilterOption = FilterOption> extends Array<T> {
  static create<T extends FilterOption>(items: T[] = []): FilterArray<T> {
    const list = new FilterArray<T>();
    if (Array.isArray(items) && items.length > 0) {
      list.push(...items);
    }
    return list;
  }

  hasFilter(filter: FilterOption): boolean {
    return this.some((f) => f.id === filter.id);
  }

  addFilter(newFilter: T): FilterArray<T> {
    if (this.hasFilter(newFilter)) return this;
    return FilterArray.create([...this, newFilter]);
  }

  removeFilter(targetFilter: FilterOption): FilterArray<T> {
    return FilterArray.create(this.filter((f) => f.id !== targetFilter.id));
  }

  toggleFilter(targetFilter: T): FilterArray<T> {
    if (this.hasFilter(targetFilter)) {
      return this.removeFilter(targetFilter);
    }
    return this.addFilter(targetFilter);
  }

  excludeCategory(categoryToExclude: ContactFilterCategory): FilterArray<T> {
    return FilterArray.create(
      this.filter((f) => (f as any).category !== categoryToExclude)
    );
  }

  getCategory(category: ContactFilterCategory): FilterArray<T> {
    return FilterArray.create(
      this.filter((f) => (f as any).category === category),
    );
  }
}
