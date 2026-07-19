import { ScrollView } from "@/components/ui/scroll-view";
import { PeopleSharingWidget } from "@/src/features/home/components/people-sharing-widget";
import { VStack } from "@/components/ui/vstack";
import { SafetyModeWidget } from "@/src/features/home/components/safety-mode-widget";
import { NoActiveAlertInfoCard } from "@/src/features/home/components/no-active-alert-info-card";
import { HomeHeader } from "@/src/features/home/components/home-header";

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-background px-5 pt-5 pb-25">
      <VStack space="xl">
        <HomeHeader />
        <SafetyModeWidget />
        <PeopleSharingWidget />
        <NoActiveAlertInfoCard />
      </VStack>
    </ScrollView>
  );
}
