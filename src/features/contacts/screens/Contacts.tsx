import { useCallback } from "react";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { ContactGroupTabs } from "@/src/features/contacts/components/contact-group-tabs";
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
import { useContactFilters } from "@/src/features/contacts/hooks/use-contact-filters";
import { ContactHeader } from "@/src/features/contacts/components/contact-header";
import { AddContactButton } from "@/src/features/contacts/components/add-contact-button";
import { useRouter } from "expo-router";

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
    contactGroup: ContactGroup.NEARBY_HELPERS,
    sosPermission: ContactPermission.ALLOWED,
    stayWithMePermission: ContactPermission.ALLOWED,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
    id: "9",
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
    id: "10",
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
];

const DEFAULT_FILTERS: ContactFilterOption[] = [
  CONTACT_FILTERS.INNER_CIRCLE,
  CONTACT_FILTERS.SOS,
  CONTACT_FILTERS.STAY_WITH_ME,
];

export default function Contacts() {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    selectedFilters,
    activeContactGroup,
    chipFilters,
    filteredContacts,
    handleRemoveFilter,
    handleContactGroupTabChange,
  } = useContactFilters({
    initialContacts: INITIAL_CONTACTS,
    initialFilters: DEFAULT_FILTERS,
  });

  const handleToggleFilter = useCallback(() => {
    // Modal implementation intentionally omitted as per requirement
  }, []);

  const handleAddContact = useCallback(() => {
    router.push("/contacts/add");
  }, [router]);

  const handleAvatarPress = useCallback(
    (contact: Contact) => {
      router.push({
        pathname: "/contacts/[id]",
        params: { id: contact.id },
      });
    },
    [router],
  );

  return (
    <ScreenLayout>
      <ScreenLayout.Content isTabScreen>
        <VStack space="xl">
          <ContactHeader />

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
              filters={chipFilters}
              onRemoveFilter={handleRemoveFilter}
            />

            <ContactGroupTabs
              activeContactGroup={activeContactGroup}
              onContactGroupChange={handleContactGroupTabChange}
            />
          </VStack>

          <ContactList
            contacts={filteredContacts}
            onAvatarPress={handleAvatarPress}
          />
        </VStack>
      </ScreenLayout.Content>

      <ScreenLayout.Floating>
        <AddContactButton onPress={handleAddContact} />
      </ScreenLayout.Floating>
    </ScreenLayout>
  );
}
