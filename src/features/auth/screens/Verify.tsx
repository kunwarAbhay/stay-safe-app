import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/expo";
import { useRouter, useLocalSearchParams } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { SubmitButton } from "@/src/shared/components/button/submit-button";
import { ScreenLayout } from "@/src/shared/components/layout/screen-layout";

export default function Verify() {
  const { signIn, fetchStatus: signInFetchStatus } = useSignIn();
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const router = useRouter();
  const { phone, type } = useLocalSearchParams<{
    phone: string;
    type: "login" | "signup";
  }>();

  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isFetching =
    signInFetchStatus === "fetching" || signUpFetchStatus === "fetching";
  const isSignUp = type === "signup";

  const navigateAfterAuth = (options: any) => {
    if (options.session?.currentTask) return;
    router.replace("/");
  };

  const handleVerify = async () => {
    setErrorMsg("");
    if (code.length !== 6) {
      setErrorMsg("Code must be 6 digits");
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await signUp!.verifications.verifyPhoneCode({ code });

        if (error) {
          setErrorMsg(error.longMessage || "Invalid verification code");
          return;
        }
        if (signUp.status === "complete") {
          await signUp.finalize({ navigate: navigateAfterAuth });
        }
      } else {
        const { error } = await signIn!.phoneCode.verifyCode({ code });

        if (error) {
          setErrorMsg(error.longMessage || "Invalid verification code");
          return;
        }
        if (signIn.status === "complete") {
          await signIn.finalize({ navigate: navigateAfterAuth });
        } else {
          setErrorMsg(`Unexpected sign in status: ${signIn!.status}`);
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg("An unexpected error occurred.");
    }
  };

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
        </Box>

        <VStack space="md" className="mb-4">
          <Heading size="2xl">Enter Verification Code</Heading>
          <Text size="md" className="text-typography-500">
            We sent a 6-digit code to {phone || "your phone number"}.
          </Text>
        </VStack>

        <FormControl
          isInvalid={Boolean(errorMsg)}
          isDisabled={isFetching}
          className="w-full"
        >
          <Input className="bg-white">
            <InputField
              placeholder="Enter 6-digit code"
              keyboardType="number-pad"
              maxLength={6}
              value={code}
              onChangeText={setCode}
            />
          </Input>
          <FormControlError className="mt-1">
            <FormControlErrorText className="text-error-500 text-sm">
              {errorMsg}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <SubmitButton
          label="Verify & Continue"
          isLoading={isFetching}
          isDisabled={code.length !== 6}
          onPress={handleVerify}
        />
      </VStack>
    </ScreenLayout>
  );
}
