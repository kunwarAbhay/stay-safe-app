import React, { useState, useEffect } from "react";

import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { SOSButton } from "@/src/features/home/components/sos-button";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { formatSOSElapsedTime } from "@/src/shared/utils/time";

export interface SOSWidgetProps {
  isActive: boolean;
  sosInitiationTimestamp?: number;
  onActivate: () => void;
  onEnd: () => void;
}

export function SOSWidget({
  isActive,
  sosInitiationTimestamp,
  onActivate,
  onEnd,
  className,
  ...props
}: SOSWidgetProps & React.ComponentProps<typeof Box>) {
  const [SOSElapsedSeconds, setSOSElapsedSeconds] = useState(0);

  useEffect(() => {
    if (isActive && sosInitiationTimestamp) {
      const updateSOSElapsedSeconds = () => {
        const diff = Math.floor((Date.now() - sosInitiationTimestamp) / 1000);
        setSOSElapsedSeconds(Math.max(0, diff));
      };

      updateSOSElapsedSeconds();
      const interval = setInterval(updateSOSElapsedSeconds, 1000);
      return () => clearInterval(interval);
    } else {
      setSOSElapsedSeconds(0);
    }
  }, [isActive, sosInitiationTimestamp]);

  return (
    <Box className={cn("rounded-2xl bg-amber-400 pb-10 pt-8", className)}>
      {isActive ? (
        <ActiveSOSWidget
          elapsedTime={formatSOSElapsedTime(SOSElapsedSeconds)}
          onEnd={onEnd}
        />
      ) : (
        <IdleSOSWidget onActivate={onActivate} />
      )}
    </Box>
  );
}

interface IdleSOSWidgetProps {
  onActivate: () => void;
}

function IdleSOSWidget({ onActivate }: IdleSOSWidgetProps) {
  return (
    <VStack space="lg" className="items-center">
      <VStack space="xs" className="items-center">
        <Heading size="lg" className="text-center text-typography-900">
          Need Immediate Help?
        </Heading>
        <Text size="sm" className="px-2 text-center text-typography-700">
          Your emergency contacts will receive your live location, audio, and
          video feed.
        </Text>
      </VStack>

      <SOSButton
        label="SOS"
        onPress={onActivate}
        accessibilityLabel="Activate SOS"
        accessibilityHint="Triggers an immediate emergency alert and shares live location with emergency contacts"
      />
    </VStack>
  );
}

interface ActiveSOSWidgetProps {
  elapsedTime: string;
  onEnd: () => void;
}

function ActiveSOSWidget({ elapsedTime, onEnd }: ActiveSOSWidgetProps) {
  return (
    <VStack space="lg" className="items-center">
      <Box className="rounded-full border border-red-400 bg-white px-3 py-1">
        <Text size="xs" className="font-semibold text-red-500">
          LIVE {elapsedTime}
        </Text>
      </Box>

      <VStack space="xs" className="items-center">
        <Heading size="lg" className="text-center text-typography-900">
          SOS Active
        </Heading>
        <Text size="sm" className="text-center text-typography-700">
          Sharing your live location, audio & Video
        </Text>
      </VStack>

      <SOSButton
        label="END"
        onPress={onEnd}
        accessibilityLabel="End SOS"
        accessibilityHint="Stops sharing your live location, audio, and video"
      />
    </VStack>
  );
}

export default SOSWidget;
