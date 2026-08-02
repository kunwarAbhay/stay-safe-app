import { useLocalSearchParams, Link } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { SubmitButton } from "@/src/shared/components/button/submit-button";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";
import { MessageSquare } from "lucide-react-native";
import { OtpInput } from "@/src/features/auth/components/otp-input";
import { ResendTimer } from "@/src/features/auth/components/resend-timer";
import { useVerify } from "@/src/features/auth/hooks/use-verify";


export default function Verify() {
  const { fullPhoneNumber, type } = useLocalSearchParams<{
    fullPhoneNumber: string;
    type: "login" | "signup";
  }>();

  const {
    code,
    setCode,
    errorMsg,
    isFetching,
    handleVerify,
    handleResendCode,
  } = useVerify(type, fullPhoneNumber);

  return (
    <ScreenLayout
      scrollable={false}
      useKeyboardAvoiding
      useSafeArea={false}
      className="px-6 justify-center"
    >
      <VStack space="xl">
        <Box className="items-center mb-6 mt-12">
          <Box className="w-20 h-20 rounded-full bg-primary items-center justify-center mb-6">
            <MessageSquare color="white" size={32} />
          </Box>
          <Text className="text-primary font-bold mb-2 tracking-widest text-xs uppercase">
            VERIFICATION
          </Text>
          <Heading size="3xl" className="text-center text-typography-900 mb-4">
            Enter OTP Code
          </Heading>
          <Text size="md" className="text-center text-typography-500 mb-2">
            We've sent a 6-digit secure code to
          </Text>
          <Text size="md" className="text-center text-typography-900 font-bold">
            {fullPhoneNumber}
          </Text>
        </Box>

        <FormControl
          isInvalid={Boolean(errorMsg)}
          isDisabled={isFetching}
          className="w-full mb-4"
        >
          <OtpInput code={code} setCode={setCode} isFetching={isFetching} />
          {errorMsg ? (
            <FormControlError className="mt-2 justify-center">
              <FormControlErrorText className="text-error-500 text-sm text-center">
                {errorMsg}
              </FormControlErrorText>
            </FormControlError>
          ) : null}
        </FormControl>

        <ResendTimer onResend={handleResendCode} />

        <SubmitButton
          label="Verify & Continue"
          isLoading={isFetching}
          isDisabled={code.length !== 6}
          onPress={handleVerify}
        />

        <VStack className="items-center mt-4">
          <Text className="text-typography-500 mb-1">
            Didn't receive the code?
          </Text>
          {/* <Link href="#" asChild> */}
            <Pressable>
              <Text className="text-primary font-bold">Get help</Text>
            </Pressable>
          {/* </Link> */}
        </VStack>
      </VStack>
    </ScreenLayout>
  );
}
