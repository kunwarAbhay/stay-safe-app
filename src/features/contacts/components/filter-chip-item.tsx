import React from "react";
import { Chip, ChipText } from "@/src/shared/components/chip";
import { FilterOption } from "@/src/features/contacts/types/contact-filter";

export interface FilterChipItemProps<T extends FilterOption = FilterOption> {
  filter: T;
  isSelected?: boolean;
  onPress?: (filter: T) => void;
  accessibilityLabel?: string;
  testID?: string;
}

export const FilterChipItem = React.memo(
  <T extends FilterOption = FilterOption>({
    filter,
    isSelected = true,
    onPress,
    accessibilityLabel,
    testID,
  }: FilterChipItemProps<T>) => {
    return (
      <Chip
        isSelected={isSelected}
        onPress={() => onPress?.(filter)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isSelected }}
        accessibilityLabel={accessibilityLabel ?? `Filter by ${filter.label}`}
        testID={testID ?? `contacts:chip:${filter.id}`}
      >
        <ChipText className="font-medium text-sm">{filter.label}</ChipText>
      </Chip>
    );
  },
) as <T extends FilterOption = FilterOption>(
  props: FilterChipItemProps<T>,
) => React.ReactElement | null;

(FilterChipItem as any).displayName = "FilterChipItem";
