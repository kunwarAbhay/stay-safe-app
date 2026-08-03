import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { MapPin } from "lucide-react-native";
import { LiveVideoFeed } from "../components/LiveVideoFeed";
import { ScreenHeader } from "@/src/shared/components/layout/screen-header";

export default function Tracker() {
  return (
    <ScreenLayout isTabScreen>
      <VStack space="xl" className="w-full">
        <ScreenHeader title="Jessica Brown" subtitle="Help Jessica in danger" />

        {/* Live Audio / Video Broadcasting Feed Section */}
        <VStack space="sm" className="w-full">
          <Heading size="md" className="text-foreground font-semibold">
            Live Audio/Video Feed
          </Heading>
          <LiveVideoFeed />
        </VStack>

        {/* Live Location Map Section */}
        <VStack space="sm" className="w-full pt-2">
          <Heading size="md" className="text-foreground font-semibold">
            Live Location
          </Heading>
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
      </VStack>
    </ScreenLayout>
  );
}
