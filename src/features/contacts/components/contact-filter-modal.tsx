import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
} from "@/components/ui/actionsheet";
import { Icon } from "@/components/ui/icon";
import { X } from "lucide-react-native";
import { FilterChipItem } from "@/src/features/contacts/components/filter-chip-item";
import { CONTACT_FILTERS } from "@/src/features/contacts/constants/contact-filters";
import { ContactFilterOption } from "@/src/features/contacts/types/contact-filter";
import { FilterArray } from "@/src/features/contacts/utils/filter-contacts";

export interface ContactFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: ContactFilterOption[];
  onApplyFilters: (filters: ContactFilterOption[]) => void;
}

const PERMISSION_FILTERS: ContactFilterOption[] = [
  CONTACT_FILTERS.SOS,
  CONTACT_FILTERS.STAY_WITH_ME,
];

const RELATIONSHIP_FILTERS: ContactFilterOption[] = [
  CONTACT_FILTERS.FAMILY,
  CONTACT_FILTERS.COLLEAGUE,
  CONTACT_FILTERS.PARTNER,
  CONTACT_FILTERS.FRIEND,
  CONTACT_FILTERS.CLOSE_FRIEND,
  CONTACT_FILTERS.CLASSMATE,
  CONTACT_FILTERS.NEIGHBOR,
  CONTACT_FILTERS.OTHER,
];

export const ContactFilterModal = React.memo(
  ({
    isOpen,
    onClose,
    selectedFilters,
    onApplyFilters,
  }: ContactFilterModalProps) => {
    const insets = useSafeAreaInsets();
    const [tempFilters, setTempFilters] = useState<
      FilterArray<ContactFilterOption>
    >(() => FilterArray.create(selectedFilters));

    // Sync temp state with actual selected filters whenever modal opens
    useEffect(() => {
      if (isOpen) {
        setTempFilters(FilterArray.create(selectedFilters));
      }
    }, [isOpen, selectedFilters]);

    const handleToggleFilter = useCallback((filter: ContactFilterOption) => {
      setTempFilters((prev) => prev.toggleFilter(filter));
    }, []);

    const handleApply = useCallback(() => {
      onApplyFilters(tempFilters);
      onClose();
    }, [onApplyFilters, tempFilters, onClose]);

    return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <ActionsheetBackdrop testID="contacts:filter-modal:backdrop" />
        <ActionsheetContent
          testID="contacts:filter-modal:sheet"
          className="w-full bg-white dark:bg-background-dark rounded-t-[36px] pt-0 px-6 items-stretch max-h-[85vh]"
          style={{ paddingBottom: Math.max(insets.bottom, 24) }}
        >
          {/* Floating Top Close Button */}
          <View className="items-center -mt-6 mb-4 z-10">
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close filter sheet"
              testID="contacts:filter-modal:close-button"
              className="w-12 h-12 rounded-full bg-white dark:bg-background-dark items-center justify-center shadow-md border border-outline-100 dark:border-outline-800 active:opacity-80"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <Icon as={X} className="w-5 h-5 text-foreground" />
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          >
            {/* Header */}
            <Text className="text-xl font-bold text-foreground mb-6">
              Filters
            </Text>

            {/* Section 1: Permission Allowed */}
            <View className="mb-6">
              <Text className="text-base font-semibold text-foreground mb-3">
                Permission Allowed
              </Text>
              <View className="flex-row flex-wrap gap-2.5">
                {PERMISSION_FILTERS.map((filter) => (
                  <FilterChipItem
                    key={filter.id}
                    filter={filter}
                    isSelected={tempFilters.hasFilter(filter)}
                    onPress={handleToggleFilter}
                  />
                ))}
              </View>
            </View>

            {/* Section 2: Relationship */}
            <View className="mb-6">
              <Text className="text-base font-semibold text-foreground mb-3">
                Relationship
              </Text>
              <View className="flex-row flex-wrap gap-2.5">
                {RELATIONSHIP_FILTERS.map((filter) => (
                  <FilterChipItem
                    key={filter.id}
                    filter={filter}
                    isSelected={tempFilters.hasFilter(filter)}
                    onPress={handleToggleFilter}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Apply Filter Button */}
          <View className="pt-2">
            <Pressable
              onPress={handleApply}
              accessibilityRole="button"
              accessibilityLabel="Apply Filter"
              testID="contacts:filter-modal:apply-button"
              className="w-full bg-primary rounded-full py-3.5 items-center justify-center min-h-12 active:opacity-90 shadow-sm"
            >
              <Text className="text-white text-base font-semibold">
                Apply Filter
              </Text>
            </Pressable>
          </View>
        </ActionsheetContent>
      </Actionsheet>
    );
  },
);

ContactFilterModal.displayName = "ContactFilterModal";
