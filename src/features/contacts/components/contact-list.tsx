import React from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { UserX } from "lucide-react-native";
import { ContactCard } from "@/src/features/contacts/components/contact-card";
import { Contact } from "@/src/features/contacts/types/contact";

export interface ContactListProps {
  contacts: Contact[];
}

export const ContactList = ({
  contacts,
  className,
}: ContactListProps & React.ComponentProps<typeof VStack>) => {
  return (
    <VStack space="md" className="w-full">
      {contacts && contacts.length > 0 ? (
        contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      ) : (
        <EmptyContactListFallback />
      )}
    </VStack>
  );
};

const EmptyContactListFallback = () => {
  return (
    <Box className="w-full rounded-2xl bg-card p-8 border border-border items-center justify-center space-y-3">
      <Box className="p-4 rounded-full bg-muted items-center justify-center mb-2">
        <Icon as={UserX} size="xl" className="text-muted-foreground" />
      </Box>
      <VStack className="items-center space-y-1">
        <Heading size="md" className="text-foreground font-semibold">
          No contacts found
        </Heading>
        <Text className="text-muted-foreground text-sm text-center">
          Add your family members or trusted friends to stay safe
        </Text>
      </VStack>
    </Box>
  );
};
