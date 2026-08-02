import React from "react";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { BackButton } from "@/src/shared/components/button/back-button";
import { HStack } from "@/components/ui/hstack";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export const AccountHeader = ({
  className,
  ...props
}: React.ComponentProps<typeof HStack>) => {
  const router = useRouter();

  return (
    <HStack
      space="md"
      className={cn("gap-5 items-center", className)}
      {...props}
    >
      {router.canGoBack() && <BackButton />}
      <VStack space="xs" className="gap-1.5">
        <Text className="font-bold text-foreground text-lg">Profile </Text>
        <Text className="text-foreground/60 text-xs">
          Manage your personal information and emergency contact settings.
        </Text>
      </VStack>
    </HStack>
  );
};
