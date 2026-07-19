import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

export const NoActiveAlertInfoCard = ({
  className,
  ...props
}: React.ComponentProps<typeof Box>) => {
  return (
    <Box
      className={cn(
        "bg-primary/10 border border-primary/15 rounded-2xl p-4 flex-row items-center gap-3",
        className,
      )}
      {...props}
    >
      <Box className="w-10 h-10 bg-primary rounded-full items-center justify-center shrink-0">
        <Box className="w-5 h-5 bg-white rounded-full items-center justify-center">
          <Text className="text-primary font-bold text-xs leading-none">i</Text>
        </Box>
      </Box>
      <VStack space="xs">
        <Text
          size="md"
          className="text-foreground flex-1 font-bold leading-normal text-base"
        >
          No active alerts
        </Text>
        <Text
          size="sm"
          className="text-foreground/60 flex-1 leading-normal text-sm"
        >
          No contacts are currently sharing their location or SOS status with
          you
        </Text>
      </VStack>
    </Box>
  );
};
