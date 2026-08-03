import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { BackButton } from "@/src/shared/components/button/back-button";
import { Button, ButtonText } from "@/components/ui/button";
import { useConfirmSOS } from "@/src/features/home/hooks/use-confirm-sos";
import { CircularCountdown } from "@/src/shared/components/progress/circular-countdown";
import { SosAlertFeatureCard } from "@/src/features/home/components/sos-alert-feature-card";
import { MapPin, Mic, Video } from "lucide-react-native";
import { SOS_COUNTDOWN_IN_SECONDS } from "@/src/config/constants";
import { SubmitButton } from "@/src/shared/components/button/submit-button";

export default function ConfirmSOS() {
  const { triggerSOS, cancelSOS, isActivating } = useConfirmSOS();

  return (
    <ScreenLayout scrollable={false} className="bg-rose-50 px-6 py-6 pt-12">
      <VStack className="flex-1" space="2xl">
        {/* Header */}
        <HStack className="items-center" space="md">
          <BackButton onPress={cancelSOS} />
          <Heading size="xl" className="text-typography-900">
            Confirm SOS?
          </Heading>
        </HStack>

        {/* Timer Section */}
        <VStack className="items-center mt-6" space="lg">
          <CircularCountdown
            duration={SOS_COUNTDOWN_IN_SECONDS}
            onTimerEnd={triggerSOS}
            isPaused={isActivating}
          />
          <Text size="md" className="text-typography-700 mt-2 font-medium">
            SOS will automatically activate in:
          </Text>
        </VStack>

        {/* Info Cards */}
        <HStack className="justify-between mt-8" space="sm">
          <SosAlertFeatureCard icon={MapPin} label="Live Location" />
          <SosAlertFeatureCard icon={Mic} label="Audio Feed" />
          <SosAlertFeatureCard icon={Video} label="Video Feed" />
        </HStack>

        <Text size="sm" className="text-center text-typography-500 mt-2">
          Your SoS contacts will be alerted with:
        </Text>

        <VStack className="mt-auto" space="md">
          <SubmitButton
            variant="outline"
            size="lg"
            label="Cancel"
            isDisabled={isActivating}
            onPress={cancelSOS}
          />

          <SubmitButton
            variant="destructive"
            size="lg"
            label="Confirm SOS"
            isLoading={isActivating}
            isDisabled={isActivating}
            onPress={triggerSOS}
          />
        </VStack>
      </VStack>
    </ScreenLayout>
  );
}
