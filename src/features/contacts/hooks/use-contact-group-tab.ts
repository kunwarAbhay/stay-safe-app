import { useState, useCallback } from "react";
import { ContactGroup } from "@/src/features/contacts/types/contact";
import { ContactFilterOption, FilterOption } from "@/src/features/contacts/types/contact-filter";
import { CONTACT_FILTERS } from "@/src/features/contacts/constants/contact-filters";

export interface UseContactGroupTabProps {
  initialGroup?: ContactGroup;
  onAddFilter: (filter: ContactFilterOption) => void;
  onRemoveFilter: (filter: FilterOption) => void;
}

export const useContactGroupTab = ({
  initialGroup = ContactGroup.INNER_CIRCLE,
  onAddFilter,
  onRemoveFilter,
}: UseContactGroupTabProps) => {
  const [activeContactGroup, setActiveContactGroup] = useState<ContactGroup>(initialGroup);

  const handleContactGroupTabChange = useCallback(
    (newGroup: ContactGroup) => {
      setActiveContactGroup((prevGroup) => {
        if (newGroup === prevGroup) return prevGroup;

        const currentTabFilter =
          newGroup === ContactGroup.INNER_CIRCLE
            ? CONTACT_FILTERS.INNER_CIRCLE
            : CONTACT_FILTERS.NEARBY_HELPERS;

        const prevTabFilter =
          newGroup === ContactGroup.INNER_CIRCLE
            ? CONTACT_FILTERS.NEARBY_HELPERS
            : CONTACT_FILTERS.INNER_CIRCLE;

        onRemoveFilter(prevTabFilter);
        onAddFilter(currentTabFilter);
        return newGroup;
      });
    },
    [onAddFilter, onRemoveFilter]
  );

  return {
    activeContactGroup,
    handleContactGroupTabChange,
  };
};
