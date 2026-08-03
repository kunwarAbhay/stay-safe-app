import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { PeopleSharingWidget } from "@/src/features/home/components/people-sharing-widget";
import { VStack } from "@/components/ui/vstack";
import { SafetyModeWidget } from "@/src/features/home/components/safety-mode-widget";
import { NoActiveAlertInfoCard } from "@/src/features/home/components/no-active-alert-info-card";
import { HomeHeader } from "@/src/features/home/components/home-header";
import SOSWidget from "@/src/features/home/components/sos-widget";
import { useSOS } from "@/src/features/home/hooks/use-sos";

export default function Home() {
  const {
    isSOSActive,
    sosInitiationTimestamp,
    handleActivateSOS,
    handleEndSOS,
  } = useSOS();

  return (
    <ScreenLayout isTabScreen>
      <VStack space="xl">
        <HomeHeader />
        <SOSWidget
          isActive={isSOSActive}
          sosInitiationTimestamp={sosInitiationTimestamp}
          onActivate={handleActivateSOS}
          onEnd={handleEndSOS}
        />
        <SafetyModeWidget />
        <PeopleSharingWidget />
        <NoActiveAlertInfoCard />
      </VStack>
    </ScreenLayout>
  );
}
