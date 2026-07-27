import { useState, useMemo } from "react";
import { Contact, ContactGroup } from "@/src/features/contacts/types/contact";
import { ContactFilterOption } from "@/src/features/contacts/types/contact-filter";
import { useFilterSelection } from "./use-filter-selection";
import { useContactGroupTab } from "./use-contact-group-tab";
import {
  composeContactFilters,
  createSearchFilterDecorator,
  createCategoryFilterDecorator,
} from "@/src/features/contacts/utils/filter-contacts";

export interface UseContactFiltersOptions {
  initialContacts: Contact[];
  initialFilters?: ContactFilterOption[];
  initialGroup?: ContactGroup;
}

export const useContactFilters = ({
  initialContacts,
  initialFilters = [],
  initialGroup = ContactGroup.INNER_CIRCLE,
}: UseContactFiltersOptions) => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    selectedFilters,
    chipFilters,
    setSelectedFilters,
    handleAddFilter,
    handleRemoveFilter,
  } = useFilterSelection(initialFilters);

  const { activeContactGroup, handleContactGroupTabChange } = useContactGroupTab({
    initialGroup,
    onAddFilter: handleAddFilter,
    onRemoveFilter: handleRemoveFilter,
  });

  const filteredContacts = useMemo(() => {
    const searchDecorator = createSearchFilterDecorator(searchQuery);
    const categoryDecorator = createCategoryFilterDecorator(selectedFilters);

    return composeContactFilters(searchDecorator, categoryDecorator)(initialContacts);
  }, [initialContacts, searchQuery, selectedFilters]);

  return {
    searchQuery,
    setSearchQuery,

    selectedFilters,
    setSelectedFilters,
    chipFilters,
    handleAddFilter,
    handleRemoveFilter,
    
    activeContactGroup,
    handleContactGroupTabChange,
    
    filteredContacts,
  };
};
