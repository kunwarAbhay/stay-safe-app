import React, { useState, useEffect } from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Clock } from "lucide-react-native";
import { RESEND_TIMER_SECONDS } from "@/src/config/constants";

interface ResendTimerProps {
  onResend: () => void;
  cooldownSeconds?: number;
}

export const ResendTimer = ({
  onResend,
  cooldownSeconds = RESEND_TIMER_SECONDS,
}: ResendTimerProps) => {
  const [seconds, setSeconds] = useState(cooldownSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [seconds]);

  const handleResend = () => {
    setSeconds(cooldownSeconds);
    setCanResend(false);
    onResend();
  };

  const formattedTime = `00:${seconds.toString().padStart(2, "0")}`;

  if (canResend) {
    return (
      <HStack className="justify-center items-center mt-6" space="sm">
        <Pressable onPress={handleResend}>
          <Text className="text-primary-600 font-bold text-sm">
            Resend Code
          </Text>
        </Pressable>
      </HStack>
    );
  }

  return (
    <HStack className="justify-center items-center mt-6" space="sm">
      <Clock size={16} color="#737373" />
      <Text className="text-typography-500 text-sm">Resend code in </Text>
      <Text className="text-typography-900 font-bold text-sm">
        {formattedTime}
      </Text>
    </HStack>
  );
};
