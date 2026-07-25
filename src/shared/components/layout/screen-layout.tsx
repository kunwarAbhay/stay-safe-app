import React from "react";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export interface ScreenLayoutProps extends React.ComponentProps<
  typeof ScrollView
> {
  /** Indicates if this screen is rendered inside tab navigation (adds extra bottom padding for floating tab bar) */
  isTabScreen?: boolean;
  /** Whether the screen container should be scrollable. Defaults to true. */
  scrollable?: boolean;
  /** Whether to wrap the screen in a SafeAreaView. Defaults to true. */
  useSafeArea?: boolean;
  /** Custom safe area edges to apply when useSafeArea is true. */
  edges?: React.ComponentProps<typeof SafeAreaView>["edges"];
}

export const ScreenLayout = ({
  isTabScreen = false,
  scrollable = true,
  useSafeArea = true,
  edges,
  className,
  children,
  ...props
}: ScreenLayoutProps) => {
  const containerPaddingClass = cn(
    "px-5 py-6",
    isTabScreen ? "pb-30" : "pb-8"
  );

  const content = scrollable ? (
    <ScrollView
      className={cn("flex-1 bg-background", containerPaddingClass, className)}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  ) : (
    <Box
      className={cn("flex-1 bg-background", containerPaddingClass, className)}
      {...props}
    >
      {children}
    </Box>
  );

  if (useSafeArea) {
    return (
      <SafeAreaView
        style={{ flex: 1 }}
        className="flex-1 bg-background"
        edges={edges}
      >
        {content}
      </SafeAreaView>
    );
  }

  return content;
};
