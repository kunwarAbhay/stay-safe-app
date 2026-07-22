import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Switch } from "@/components/ui/switch";

interface ContactPermissionTogglesProps {
  stayWithMe: boolean;
  onStayWithMeChange: (value: boolean) => void;
  sos: boolean;
  onSosChange: (value: boolean) => void;
}

export const ContactPermissionToggles = ({
  stayWithMe,
  onStayWithMeChange,
  sos,
  onSosChange,
}: ContactPermissionTogglesProps) => {
  return (
    <VStack space="md" className="w-full">
      <Box className="flex-row items-center justify-between p-4 rounded-2xl border border-border bg-transparent">
        <VStack space="xs" className="flex-1 pr-4">
          <Text className="text-foreground font-semibold text-base">
            Stay With Me
          </Text>
          <Text className="text-muted-foreground text-sm">
            Shares your location when safety mode is on.
          </Text>
        </VStack>
        <Switch value={stayWithMe} onValueChange={onStayWithMeChange} size="md" />
      </Box>

      <Box className="flex-row items-center justify-between p-4 rounded-2xl border border-border bg-transparent">
        <VStack space="xs" className="flex-1 pr-4">
          <Text className="text-foreground font-semibold text-base">SOS</Text>
          <Text className="text-muted-foreground text-sm">
            Sends an alert when SOS is triggered.
          </Text>
        </VStack>
        <Switch value={sos} onValueChange={onSosChange} size="md" />
      </Box>
    </VStack>
  );
};
