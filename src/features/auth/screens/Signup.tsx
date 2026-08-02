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

  return (
    <ScreenLayout
      scrollable={false}
      useKeyboardAvoiding
      useSafeArea={false}
      className="px-6 justify-center"
    >
      <VStack space="xl">
        <Box className="items-center mb-8">
          <Heading size="3xl" className="text-center text-primary-500 mb-2">
            Staysafe
          </Heading>
          <Text size="lg" className="text-center text-typography-500">
            Create an Account
          </Text>
        </Box>

        <VStack space="md" className="mb-4">
          <Heading size="2xl">Enter Your Phone Number</Heading>
          <Text size="md" className="text-typography-500">
            Your verified number is crucial for sending emergency alerts and
            securing your account.
          </Text>
        </VStack>

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

        <Text className="text-center text-sm text-typography-400 mt-6">
          By Continuing you Agree to Our{" "}
          <Text className="font-bold text-typography-900">
            Terms of service
          </Text>{" "}
          and{" "}
          <Text className="font-bold text-typography-900">Privacy policy</Text>
        </Text>

        <HStack className="justify-center mt-4" space="sm">
          <Text className="text-typography-500">Already have an account?</Text>
          <Link href="/login" asChild>
            <Pressable>
              <Text className="text-primary-500 font-bold">Log in</Text>
            </Pressable>
          </Link>
        </HStack>
      </VStack>
    </ScreenLayout>
  );
}
