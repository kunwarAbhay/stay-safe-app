import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { PeopleSharingWidget } from "@/src/features/home/components/people-sharing-widget";
import { VStack } from "@/components/ui/vstack";
import { SafetyModeWidget } from "@/src/features/home/components/safety-mode-widget";
import { NoActiveAlertInfoCard } from "@/src/features/home/components/no-active-alert-info-card";
import { HomeHeader } from "@/src/features/home/components/home-header";

export default function Home() {
  return (
    <ScreenLayout isTabScreen>
      <VStack space="xl">
        <HomeHeader />
        <SafetyModeWidget />
        <PeopleSharingWidget />
        <NoActiveAlertInfoCard />
      </VStack>
    </ScreenLayout>
  );
}
