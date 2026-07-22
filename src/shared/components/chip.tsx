import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { CloseIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import React from "react";

interface ChipProps {
  isSelected?: boolean;
  onPress?: (e?: any) => void;
}

export const Chip = ({
  isSelected = false,
  children,
  onPress,
  variant = "outline",
  className,
  ...props
}: ChipProps &
  React.ComponentProps<typeof Badge> &
  React.ComponentProps<typeof Pressable>) => {
  const activeVariant = isSelected ? "default" : variant;

  return (
    <Pressable onPress={onPress}>
      <Badge
        variant={activeVariant}
        className={cn("px-4 py-2 rounded-full", className)}
        {...props}
      >
        {children}
        {isSelected && <ChipIcon as={CloseIcon} className="ml-1" />}
      </Badge>
    </Pressable>
  );
};

export const ChipText = ({
  className,
  ...props
}: React.ComponentProps<typeof BadgeText>) => {
  return (
    <BadgeText className={cn("normal-case text-sm", className)} {...props} />
  );
};

export const ChipIcon = ({
  ...props
}: React.ComponentProps<typeof BadgeIcon>) => {
  return <BadgeIcon {...props} />;
};
