import React from 'react';
import { ScrollView } from '@/components/ui/scroll-view';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Icon } from '@/components/ui/icon';
import { Users } from 'lucide-react-native';

export default function Contacts() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24, paddingBottom: 100 }}
    >
      <VStack space="xl" className="w-full">
        {/* Header */}
        <HStack space="md" className="items-center mb-2">
          <VStack>
            <Heading size="2xl" className="text-foreground font-bold">
              Emergency Contacts
            </Heading>
            <Text className="text-muted-foreground text-sm mt-1">
              Trusted people who get notified when you trigger an alert.
            </Text>
          </VStack>
        </HStack>

        {/* Empty / Placeholder State Card */}
        <Box className="w-full rounded-2xl bg-card p-6 border border-border items-center justify-center space-y-4">
          <Box className="p-4 rounded-full bg-secondary/50 items-center justify-center mb-2">
            <Icon as={Users} size="xl" className="text-primary" />
          </Box>
          <VStack className="items-center space-y-1">
            <Heading size="md" className="text-foreground font-semibold">
              No contacts added yet
            </Heading>
            <Text className="text-muted-foreground text-sm text-center">
              Add your family members or trusted friends to stay safe.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </ScrollView>
  );
}
