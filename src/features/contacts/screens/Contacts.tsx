import { useState, useMemo, useCallback } from "react";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { ContactSearchInput } from "@/src/features/contacts/components/contact-search-input";
import { FilterToggleButton } from "@/src/features/contacts/components/filter-toggle-button";
import { SelectedFilterChips } from "@/src/features/contacts/components/selected-filter-chips";
import { ContactList } from "@/src/features/contacts/components/contact-list";
import {
  Contact,
  ContactGroup,
  ContactPermission,
  Relationship,
} from "@/src/features/contacts/types/contact";
import { ContactFilterOption } from "@/src/features/contacts/types/contact-filter";
import { CONTACT_FILTERS } from "@/src/features/contacts/constants/contact-filters";
import { filterContacts } from "@/src/features/contacts/utils/filter-contacts";


const INITIAL_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Jessica Brown",
    mobileCountryCode: "1",
    mobileNumberValue: "5552849172",
    relationship: Relationship.FAMILY,
    contactGroup: ContactGroup.INNER_CIRCLE,
    sosPermission: ContactPermission.ALLOWED,
    stayWithMePermission: ContactPermission.DENIED,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jessica Brown",
    mobileCountryCode: "1",
    mobileNumberValue: "5552849172",
    relationship: Relationship.FAMILY,
    contactGroup: ContactGroup.INNER_CIRCLE,
    sosPermission: ContactPermission.ALLOWED,
    stayWithMePermission: ContactPermission.ALLOWED,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const DEFAULT_FILTERS: ContactFilterOption[] = [
  CONTACT_FILTERS.SOS,
  CONTACT_FILTERS.STAY_WITH_ME,
];

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] =
    useState<ContactFilterOption[]>(DEFAULT_FILTERS);

  const handleRemoveFilter = useCallback((filterId: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f.id !== filterId));
  }, []);

  const handleToggleFilter = useCallback(() => {
    // Modal implementation intentionally omitted as per requirement
  }, []);

  const filteredContacts = useMemo(() => {
    return filterContacts(INITIAL_CONTACTS, searchQuery, selectedFilters);
  }, [searchQuery, selectedFilters]);

  return (
    <ScreenLayout isTabScreen>
      <VStack space="sm" className="w-full mb-4">
        <HStack className="w-full items-center gap-3">
          <ContactSearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FilterToggleButton
            onPress={handleToggleFilter}
            isActive={selectedFilters.length > 0}
          />
        </HStack>

        <SelectedFilterChips
          filters={selectedFilters}
          onRemoveFilter={handleRemoveFilter}
        />
      </VStack>

      <ContactList contacts={filteredContacts} />
    </ScreenLayout>
  );
}

