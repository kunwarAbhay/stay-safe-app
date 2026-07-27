import React from "react";
import { ScrollView } from "react-native";
import { FilterChipItem } from "@/src/features/contacts/components/filter-chip-item";
import { FilterOption } from "@/src/features/contacts/types/contact-filter";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export type { FilterOption };

export interface SelectedFilterChipsProps {
  /** Active filter items to display */
  filters?: FilterOption[];
  /** Callback when a chip's close button is pressed */
  onRemoveFilter?: (filter: FilterOption) => void;
}

export const SelectedFilterChips = React.memo(
  ({
    filters = [],
    onRemoveFilter,
    className,
    ...props
  }: SelectedFilterChipsProps & React.ComponentProps<typeof ScrollView>) => {
    if (!filters || filters.length === 0) return null;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className={cn("w-full mt-1.5", className)}
        contentContainerStyle={{ gap: 8 }}
        {...props}
      >
        {filters.map((filter) => (
          <FilterChipItem
            key={filter.id}
            filter={filter}
            isSelected={true}
            onPress={onRemoveFilter}
            accessibilityLabel={`Remove ${filter.label} filter`}
            testID={`contacts:selected-chip:${filter.id}`}
          />
        ))}
      </ScrollView>
    );
  },
);

SelectedFilterChips.displayName = "SelectedFilterChips";
