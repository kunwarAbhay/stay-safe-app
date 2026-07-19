import { ScrollView } from "@/components/ui/scroll-view";
import { PeopleSharingWidget } from "@/src/features/home/components/people-sharing-widget";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { SafetyModeWidget } from "@/src/features/home/components/safety-mode-widget";

export default function Home() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 }}
    >
      <VStack space="xl">
        {/* Top Header */}
        <HStack className="justify-between items-center mb-2">
          <VStack>
            <Heading size="3xl" className="text-foreground font-bold">
              StaySafe
            </Heading>
            <Text size="sm" className="text-muted-foreground">
              Your personal safety companion
            </Text>
          </VStack>
        </HStack>

        <SafetyModeWidget />

        <PeopleSharingWidget />
      </VStack>
    </ScrollView>
  );
}
