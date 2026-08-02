import React, { useRef } from "react";
import { TextInput, Pressable } from "react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { OTP_LENGTH } from "@/src/config/constants";
import { cn } from "@gluestack-ui/utils/nativewind-utils";

interface OtpInputProps {
  code: string;
  setCode: (code: string) => void;
  isFetching?: boolean;
  length?: number;
}

export const OtpInput = ({
  code,
  setCode,
  isFetching = false,
  length = OTP_LENGTH,
}: OtpInputProps) => {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable onPress={handlePress} className="w-full">
      <Box className="relative w-full h-14 justify-center">
        <HStack
          className="w-full justify-between"
          space="sm"
          pointerEvents="none"
        >
          {Array.from({ length }).map((_, index) => {
            const char = code[index];
            const isActive =
              index === code.length ||
              (index === length - 1 && code.length === length);

            return (
              <Box
                key={index}
                className={cn(
                  "flex-1 h-14 rounded-xl border items-center justify-center bg-white",
                  isActive ? "border-primary border-2" : "border-outline-200",
                )}
              >
                {char ? (
                  <Text className="text-xl font-bold text-typography-900">
                    {char}
                  </Text>
                ) : (
                  <Box
                    className={cn(
                      "w-2 h-2 rounded-full bg-muted",
                      isActive && "bg-primary",
                    )}
                  />
                )}
              </Box>
            );
          })}
        </HStack>
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={length}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          className="absolute w-full h-full opacity-0"
          editable={!isFetching}
          autoFocus
          selectionColor="transparent"
          caretHidden
        />
      </Box>
    </Pressable>
  );
};
