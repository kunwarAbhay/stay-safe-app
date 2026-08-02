import { Link } from "expo-router";
import { Pressable } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { useSignup } from "@/src/features/auth/hooks/use-signup";
import { PhoneInput } from "@/src/features/auth/components/phone-input";
import { SubmitButton } from "@/src/shared/components/button/submit-button";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { Shield } from "lucide-react-native";
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import React, { useState } from "react";

export default function Signup() {
  const {
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    errorMsg,
    isFetching,
    handleContinue,
  } = useSignup();

  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <ScreenLayout
      scrollable={false}
      useKeyboardAvoiding
      useSafeArea={false}
      className="px-6 justify-center"
    >
      <VStack space="xl">
        <Box className="items-center mb-8 mt-12">
          <Box className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-6">
            <Shield color="white" size={32} />
          </Box>
          <Text className="text-primary font-bold mb-2 tracking-widest text-xs uppercase">
            SAFETY FIRST
          </Text>
          <Heading size="3xl" className="text-center text-typography-900 mb-4">
            Create your account.
          </Heading>
          <Text size="md" className="text-center text-typography-500">
            Fast, secure onboarding to ensure you're always protected when it
            matters most.
          </Text>
        </Box>

        <PhoneInput
          countryCode={countryCode}
          onCountryCodeChange={setCountryCode}
          phoneNumber={phoneNumber}
          onPhoneNumberChange={setPhoneNumber}
          isDisabled={isFetching}
          errorMsg={errorMsg}
        />

        <SubmitButton
          label="Sign Up"
          isLoading={isFetching}
          onPress={handleContinue}
        />

        <Checkbox
          value="agree"
          // size="md"
          className="mt-6 mb-4 items-center"
          isChecked={isAgreed}
          onChange={setIsAgreed}
        >
          <CheckboxIndicator className="mr-3 mt-1">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <HStack className="flex-wrap flex-1 ml-2 items-center">
            <Text className="text-typography-500">I agree to the </Text>
            <Text className="text-primary font-bold">Terms of Service</Text>
            <Text className="text-typography-500"> and </Text>
            <Text className="text-primary font-bold">Privacy Policy</Text>
            <Text className="text-typography-500">.</Text>
          </HStack>
        </Checkbox>

        <HStack className="justify-center mt-6" space="sm">
          <Text className="text-typography-500">Already have an account?</Text>
          <Link href="/login" asChild>
            <Pressable>
              <Text className="text-primary font-bold">Login</Text>
            </Pressable>
          </Link>
        </HStack>
      </VStack>
    </ScreenLayout>
  );
}
