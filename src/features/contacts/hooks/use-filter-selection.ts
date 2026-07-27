import { useState, useMemo, useCallback } from "react";
import {
  ContactFilterCategory,
  ContactFilterOption,
  FilterOption,
} from "@/src/features/contacts/types/contact-filter";
import { FilterArray } from "@/src/features/contacts/utils/filter-contacts";

export const useFilterSelection = (
  initialFilters: ContactFilterOption[] = [],
) => {
  const [selectedFilters, setSelectedFilters] = useState<
    FilterArray<ContactFilterOption>
  >(() => FilterArray.create(initialFilters));

  const handleAddFilter = useCallback((filter: ContactFilterOption) => {
    setSelectedFilters((prev) => prev.addFilter(filter));
  }, []);

  const handleRemoveFilter = useCallback((filter: FilterOption) => {
    setSelectedFilters((prev) => prev.removeFilter(filter));
  }, []);

  const chipFilters = useMemo(
    () => selectedFilters.excludeCategory(ContactFilterCategory.ContactGroup),
    [selectedFilters],
  );

  return {
    selectedFilters,
    chipFilters,
    handleAddFilter,
    handleRemoveFilter,
    setSelectedFilters,
  };
};
