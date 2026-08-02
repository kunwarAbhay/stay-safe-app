import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { useLogin } from "@/src/features/auth/hooks/use-login";
import { PhoneInput } from "@/src/features/auth/components/phone-input";
import { SubmitButton } from "@/src/shared/components/button/submit-button";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { Shield } from "lucide-react-native";
import { Link } from "expo-router";

export default function Login() {
  const {
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    errorMsg,
    isFetching,
    handleContinue,
  } = useLogin();

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
          <Text className="text-primary font-bold mb-2 tracking-widest text-xs">
            WELCOME BACK
          </Text>
          <Heading size="3xl" className="text-center text-typography-900 mb-4">
            Log in to your account.
          </Heading>
          <Text size="md" className="text-center text-typography-500">
            Enter your phone number to receive a secure OTP for quick access.
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
          label="Log In"
          isLoading={isFetching}
          onPress={handleContinue}
        />

        <HStack className="justify-center mt-6" space="sm">
          <Text className="text-typography-500">Don't have an account?</Text>
          <Link href="/signup" asChild>
            <Pressable>
              <Text className="text-primary font-bold">Sign Up</Text>
            </Pressable>
          </Link>
        </HStack>
      </VStack>
    </ScreenLayout>
  );
}
