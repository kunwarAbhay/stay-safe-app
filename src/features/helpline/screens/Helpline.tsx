import React from 'react';
import { ScreenLayout } from '@/src/shared/components/layout/screen-layout';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { HelplineWidget } from '@/src/features/helpline/components/helpline-widget';
import { EmergencyCallInfo } from '@/src/features/helpline/components/emergency-call-info';

export default function Helpline() {
  return (
    <ScreenLayout isTabScreen>
      <VStack space="xl" className="w-full">
        {/* Header */}
        <HStack space="md" className="items-center mb-2">
          <VStack>
            <Heading size="2xl" className="text-foreground font-bold text-1.5xl">
              Helpline Numbers
            </Heading>
          </VStack>
        </HStack>

        {/* Helpline Numbers Widget */}
        <HelplineWidget />

        {/* Emergency Call Info Banner */}
        <EmergencyCallInfo />
      </VStack>
    </ScreenLayout>
  );
}
