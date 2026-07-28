import { useCallback, useState } from "react";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { ContactGroupTabs } from "@/src/features/contacts/components/contact-group-tabs";
import { ContactSearchInput } from "@/src/features/contacts/components/contact-search-input";
import { FilterToggleButton } from "@/src/features/contacts/components/filter-toggle-button";
import { SelectedFilterChips } from "@/src/features/contacts/components/selected-filter-chips";
import { ContactList } from "@/src/features/contacts/components/contact-list";
import { ContactFilterModal } from "@/src/features/contacts/components/contact-filter-modal";
import { Contact } from "@/src/features/contacts/types/contact";
import { ContactFilterOption } from "@/src/features/contacts/types/contact-filter";
import { CONTACT_FILTERS } from "@/src/features/contacts/constants/contact-filters";
import { useContactFilters } from "@/src/features/contacts/hooks/use-contact-filters";
import { ContactHeader } from "@/src/features/contacts/components/contact-header";
import { AddContactButton } from "@/src/features/contacts/components/add-contact-button";
import { useRouter } from "expo-router";
import { FilterArray } from "@/src/features/contacts/utils/filter-contacts";
import { useContacts } from "@/src/features/contacts/hooks/use-contacts";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

const DEFAULT_FILTERS: ContactFilterOption[] = [CONTACT_FILTERS.INNER_CIRCLE];

export default function Contacts() {
  const router = useRouter();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useContacts();

  const {
    searchQuery,
    setSearchQuery,
    selectedFilters,
    setSelectedFilters,
    activeContactGroup,
    chipFilters,
    filteredContacts,
    handleRemoveFilter,
    handleContactGroupTabChange,
  } = useContactFilters({
    initialContacts: data?.content || [],
    initialFilters: DEFAULT_FILTERS,
  });

  const handleToggleFilter = useCallback(() => {
    setIsFilterModalOpen(true);
  }, []);

  const handleCloseFilterModal = useCallback(() => {
    setIsFilterModalOpen(false);
  }, []);

  const handleApplyFilters = useCallback(
    (filters: ContactFilterOption[]) => {
      setSelectedFilters(FilterArray.create(filters));
    },
    [setSelectedFilters],
  );

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
              <FilterToggleButton onPress={handleToggleFilter} />
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

          {isLoading ? (
            <VStack
              className="flex-1 justify-center items-center py-10"
              space="md"
            >
              <Spinner size="large" />
              <Text className="text-muted-foreground">Loading contacts...</Text>
            </VStack>
          ) : isError ? (
            <VStack
              className="flex-1 justify-center items-center py-10"
              space="md"
            >
              <Text className="text-error font-semibold">
                Failed to load contacts
              </Text>
              <Text className="text-muted-foreground text-sm text-center">
                {error?.message ||
                  "Please check your network connection and try again."}
              </Text>
              <Button
                variant="outline"
                onPress={() => refetch()}
                className="mt-2"
              >
                <ButtonText>Retry</ButtonText>
              </Button>
            </VStack>
          ) : (
            <ContactList
              contacts={filteredContacts}
              onAvatarPress={handleAvatarPress}
            />
          )}
        </VStack>
      </ScreenLayout.Content>

      <ScreenLayout.Floating>
        <AddContactButton onPress={handleAddContact} />
      </ScreenLayout.Floating>

      <ContactFilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        selectedFilters={selectedFilters}
        onApplyFilters={handleApplyFilters}
      />
    </ScreenLayout>
  );
}
