import React from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export const ContactHeader = ({
  className,
  ...props
}: React.ComponentProps<typeof HStack>) => {
  return (
    <HStack
      space="md"
      className={cn("gap-5 items-center", className)}
      {...props}
    >
      <VStack space="xs" className="gap-1.5">
        <Text className="font-bold text-foreground text-lg">
          Emergency Contacts
        </Text>
        <Text className="text-foreground/60 text-xs">
          Manage your trusted contacts for safety mode and SOS alerts
        </Text>
      </VStack>
    </HStack>
  );
};
