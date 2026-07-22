import React from "react";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { BackButton } from "@/src/shared/components/button/back-button";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export const AddContactHeader = ({
  className,
  ...props
}: React.ComponentProps<typeof HStack>) => {
  return (
    <HStack
      space="md"
      className={cn("gap-5 items-center", className)}
      {...props}
    >
      <BackButton />
      <VStack space="xs" className="gap-1.5">
        <Text className="font-bold text-foreground text-lg">
          Add Emergency Contact
        </Text>
        <Text className="text-foreground/60 text-xs">
          Fill in the details below to add a contact.
        </Text>
      </VStack>
    </HStack>
  );
};
