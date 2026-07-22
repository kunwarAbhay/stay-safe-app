import React from 'react';
import { ScreenLayout } from '@/src/shared/components/layout/screen-layout';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Icon } from '@/components/ui/icon';
import { MapPin } from 'lucide-react-native';

export default function Tracker() {
  return (
    <ScreenLayout isTabScreen>
      <VStack space="xl" className="w-full">
        {/* Header */}
        <HStack space="md" className="items-center mb-2">
          <VStack>
            <Heading size="2xl" className="text-foreground font-bold">
              Live Location Tracker
            </Heading>
            <Text className="text-muted-foreground text-sm mt-1">
              Share real-time location with your emergency circle.
            </Text>
          </VStack>
        </HStack>

        {/* Placeholder Card */}
        <Box className="w-full rounded-2xl bg-card p-6 border border-border items-center justify-center space-y-4">
          <Box className="p-4 rounded-full bg-secondary/50 items-center justify-center mb-2">
            <Icon as={MapPin} size="xl" className="text-primary" />
          </Box>
          <VStack className="items-center space-y-1">
            <Heading size="md" className="text-foreground font-semibold">
              Location Sharing Offline
            </Heading>
            <Text className="text-muted-foreground text-sm text-center">
              Start sharing your location when traveling or walking alone.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </ScreenLayout>
  );
}
