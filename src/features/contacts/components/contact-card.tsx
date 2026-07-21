import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Contact, ContactPermission } from "../types/contact";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { SosBadge } from "@/src/shared/components/badge/sos-badge";
import { StayWithMeBadge } from "@/src/shared/components/badge/stay-with-me-badge";
import { CallButton } from "@/src/shared/components/button/call-button";

export interface ContactCardProps {
  contact: Contact;
}

export const ContactCard = ({
  contact,
  className,
  ...props
}: ContactCardProps & React.ComponentProps<typeof Box>) => {
  const isSos = contact.sosPermission === ContactPermission.ALLOWED;
  const isStayWithMe =
    contact.stayWithMePermission === ContactPermission.ALLOWED;
  const contactNumber = `+${contact.mobileCountryCode}${contact.mobileNumberValue}`;

  return (
    <Box
      className={cn("w-full bg-card rounded-2xl p-2.5", className)}
      {...props}
    >
      <Box className="bg-muted/70 dark:bg-muted/50 rounded-2xl p-3.5 flex-row items-center justify-between">
        <HStack space="md" className="items-center flex-1 pr-2">
          <Avatar className="rounded-full bg-secondary w-12.5 h-12.5">
            <AvatarFallbackText>{contact.name}</AvatarFallbackText>
            {contact.avatar && <AvatarImage source={{ uri: contact.avatar }} />}
          </Avatar>

          <VStack className="justify-center flex-1">
            <Text className="text-foreground font-bold text-base line-clamp-1">
              {contact.relationship}
            </Text>
            <Text className="text-muted-foreground text-sm font-normal line-clamp-1 mt-0.5">
              {contact.name}
            </Text>
          </VStack>
        </HStack>

        {/* Circular Call Action Button */}
        <CallButton contactNumber={contactNumber} contactName={contact.name} />
      </Box>

      {/* Badges */}
      {(isSos || isStayWithMe || contact.contactGroup) && (
        <HStack
          space="xs"
          className="px-3 pt-3 pb-1 flex-row flex-wrap items-center"
        >
          {isSos && <SosBadge />}
          {isStayWithMe && <StayWithMeBadge />}
        </HStack>
      )}
    </Box>
  );
};
