import { useState, useMemo, useCallback } from "react";
import {
  ContactFilterCategory,
  ContactFilterOption,
  FilterOption,
} from "@/src/features/contacts/types/contact-filter";
import {
  addFilter,
  removeFilter,
  excludeCategoryFilters,
} from "@/src/features/contacts/utils/filter-contacts";

export const useFilterSelection = (initialFilters: ContactFilterOption[] = []) => {
  const [selectedFilters, setSelectedFilters] = useState<ContactFilterOption[]>(initialFilters);

  const handleAddFilter = useCallback((filter: ContactFilterOption) => {
    setSelectedFilters((prev) => addFilter(prev, filter));
  }, []);

  const handleRemoveFilter = useCallback((filter: FilterOption) => {
    setSelectedFilters((prev) => removeFilter(prev, filter));
  }, []);

  const chipFilters = useMemo(
    () => excludeCategoryFilters(selectedFilters, ContactFilterCategory.ContactGroup),
    [selectedFilters]
  );

  return {
    selectedFilters,
    chipFilters,
    handleAddFilter,
    handleRemoveFilter,
    setSelectedFilters,
  };
};
