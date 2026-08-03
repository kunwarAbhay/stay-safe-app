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
import { useState } from "react";

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

        <Text className="text-typography-500 text-center">
          <Text className="text-sm">By Continuing, you Agree to Our</Text>
          <Text className="font-bold text-sm"> Terms of Service</Text>
          <Text className="text-sm"> and</Text>
          <Text className="font-bold text-sm"> Privacy Policy</Text>
        </Text>

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
