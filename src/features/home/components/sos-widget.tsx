import React, { useState, useRef, useEffect, useCallback } from 'react';

import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';

/**
 * SOSWidget
 * -------
 * Self-contained SOS toggle + elapsed timer UI (gluestack-ui v5 / NativeWind).
 *
 * - Idle state: shows the "SOS" activation card.
 * - Active state: shows the "SOS Active" card with a live elapsed timer
 *   and an "END" button.
 *
 * This component ONLY manages UI state (idle/active) and the timer.
 * It does NOT perform any location/audio/video sharing — wire that up
 * via onActivate / onDeactivate below.
 *
 * Usage:
 *   <SOSWidget
 *     onActivate={() => startLocationSharing()}
 *     onDeactivate={() => stopLocationSharing()}
 *   />
 */

export type SOSWidgetProps = {
  /** Called the moment SOS is activated (button press), before the UI flips. */
  onActivate?: () => void;
  /** Called the moment SOS is deactivated (END press), before the UI flips. */
  onDeactivate?: () => void;
  /** Optional extra classes for the outer card, e.g. margin in a parent layout. */
  className?: string;
};

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function SOSWidget({ onActivate, onDeactivate, className = '' }: SOSWidgetProps) {
  const [isActive, setIsActive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleActivate = useCallback(() => {
    onActivate?.();
    setElapsedSeconds(0);
    setIsActive(true);
  }, [onActivate]);

  const handleDeactivate = useCallback(() => {
    onDeactivate?.();
    clearTimer();
    setIsActive(false);
    setElapsedSeconds(0);
  }, [onDeactivate, clearTimer]);

  // Elapsed-time ticker: only runs while active, always cleaned up.
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isActive, clearTimer]);

  return (
    <Box
      className={`w-full overflow-hidden rounded-3xl bg-amber-400 pb-10 pt-8 ${className}`}
    >
      {isActive ? (
        <ActiveContent elapsedLabel={formatElapsed(elapsedSeconds)} onEnd={handleDeactivate} />
      ) : (
        <IdleContent onPressSOS={handleActivate} />
      )}
    </Box>
  );
}

function IdleContent({ onPressSOS }: { onPressSOS: () => void }) {
  return (
    <VStack space="lg" className="items-center">
      <VStack space="xs" className="items-center">
        <Heading size="lg" className="text-center text-typography-900">
          Need Immediate Help?
        </Heading>
        <Text size="sm" className="px-2 text-center text-typography-700">
          Your emergency contacts will receive your live location, audio, and video feed.
        </Text>
      </VStack>

      <SOSButton label="SOS" onPress={onPressSOS} accessibilityLabel="Activate SOS" />
    </VStack>
  );
}

function ActiveContent({
  elapsedLabel,
  onEnd,
}: {
  elapsedLabel: string;
  onEnd: () => void;
}) {
  return (
    <VStack space="lg" className="items-center">
      <Box className="rounded-full border border-red-400 bg-white px-3 py-1">
        <Text size="xs" className="font-semibold text-red-500">
          LIVE {elapsedLabel}
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

      <SOSButton label="END" onPress={onEnd} accessibilityLabel="End SOS" />
    </VStack>
  );
}

function SOSButton({
  label,
  onPress,
  accessibilityLabel,
}: {
  label: string;
  onPress: () => void;
  accessibilityLabel: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className="h-24 w-24 items-center justify-center rounded-full border-4 border-amber-300 bg-red-500 shadow-md data-[active=true]:opacity-85"
    >
      <Text className="text-lg font-bold text-white">{label}</Text>
    </Pressable>
  );
}

export default SOSWidget;
