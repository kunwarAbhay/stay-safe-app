import React from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { Lock } from "lucide-react-native";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { SwipeButton } from "@/src/shared/components/button/swipe-button";

export const SafetyModeWidget = ({ className }: { className?: string }) => {
  return (
    <VStack
      className={cn(
        "w-full bg-secondary rounded-3xl p-5 border border-border overflow-hidden",
        className,
      )}
    >
      <SafetyModeHeader />
      <SafetyModeDescription />
      <SafetyModeSwipeButton />
    </VStack>
  );
};

export const SafetyModeHeader = ({ className }: { className?: string }) => {
  return (
    <HStack space="md" className={cn("items-center mb-3", className)}>
      <Box className="w-12 h-12 bg-muted rounded-xl items-center justify-center">
        <Icon as={Lock} size="xl" className="text-muted-foreground" />
      </Box>
      <Text size="2xl" className="text-foreground font-bold">
        Safety mode
      </Text>
    </HStack>
  );
};

export const SafetyModeDescription = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Text
      size="sm"
      className={cn("text-muted-foreground mb-6 leading-5", className)}
    >
      Share your live location with your "Stay With Me" contacts while
      travelling or in an uncomfortable situation.
    </Text>
  );
};

export const SafetyModeSwipeButton = ({
  className,
}: {
  className?: string;
}) => {
  const handleActivateSafetyMode = () => {};

  const handleDeactivateSafetyMode = () => {};

  return (
    <SwipeButton
      onActivate={handleActivateSafetyMode}
      onDeactivate={handleDeactivateSafetyMode}
      className={className}
    />
  );
};
