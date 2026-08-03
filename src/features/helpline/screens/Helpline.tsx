import React from "react";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { VStack } from "@/components/ui/vstack";
import { HelplineWidget } from "@/src/features/helpline/components/helpline-widget";
import { EmergencyCallInfo } from "@/src/features/helpline/components/emergency-call-info";
import { ScreenHeader } from "@/src/shared/components/layout/screen-header";

export default function Helpline() {
  return (
    <ScreenLayout isTabScreen>
      <VStack space="xl" className="w-full">
        <ScreenHeader title="Helpline Numbers" />
        
        <HelplineWidget />
        
        <EmergencyCallInfo />
      </VStack>
    </ScreenLayout>
  );
}
