import React from "react";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { SlidersHorizontal } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface FilterToggleButtonProps {
  isActive?: boolean;
}

export const FilterToggleButton = React.memo(({
  onPress,
  isActive = false,
  className,
  ...props
}: FilterToggleButtonProps & React.ComponentProps<typeof Pressable>) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Toggle filter options"
      accessibilityHint="Opens filter options modal"
      className={cn(
        "h-12 w-12 rounded-full bg-primary items-center justify-center active:opacity-80 shadow-sm",
        isActive && "ring-2 ring-primary ring-offset-2",
        className
      )}
      style={{ minWidth: 48, minHeight: 48 }}
      {...props}
    >
      <Icon as={SlidersHorizontal} className="h-5 w-5 text-primary-foreground" />
    </Pressable>
  );
});

FilterToggleButton.displayName = "FilterToggleButton";
