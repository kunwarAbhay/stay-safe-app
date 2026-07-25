import React from "react";
import { ScrollView } from "react-native";
import { Chip, ChipText } from "@/src/shared/components/chip";
import { FilterOption } from "@/src/features/contacts/types/contact-filter";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export type { FilterOption };

export interface SelectedFilterChipsProps {
  /** Active filter items to display */
  filters?: FilterOption[];
  /** Callback when a chip's close button is pressed */
  onRemoveFilter?: (filter: FilterOption) => void;
}

export const SelectedFilterChips = React.memo(({
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
        <Chip
          key={filter.id}
          isSelected
          onPress={() => onRemoveFilter?.(filter)}
          accessibilityLabel={`Remove ${filter.label} filter`}
        >
          <ChipText className="font-medium text-sm text-primary-foreground">
            {filter.label}
          </ChipText>
        </Chip>
      ))}
    </ScrollView>
  );
});

SelectedFilterChips.displayName = "SelectedFilterChips";
