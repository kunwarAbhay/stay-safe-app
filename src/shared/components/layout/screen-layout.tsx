import React from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface ScreenLayoutProps extends React.ComponentProps<
  typeof ScrollView
> {
  /** Indicates if this screen is rendered inside tab navigation (adds extra bottom padding for floating tab bar) */
  isTabScreen?: boolean;
  /** Whether the screen container should be scrollable. Defaults to true. */
  scrollable?: boolean;
}

export const ScreenLayout = ({
  isTabScreen = false,
  scrollable = true,
  className,
  ...props
}: ScreenLayoutProps) => {
  const containerPaddingClass = cn(
    "px-5 py-6",
    isTabScreen ? "pb-[100px]" : "pb-8",
  );

  if (!scrollable) {
    return (
      <Box
        className={cn("flex-1 bg-background", containerPaddingClass, className)}
        {...props}
      />
    );
  }

  return (
    <ScrollView
      className={cn("flex-1 bg-background", containerPaddingClass, className)}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
};
