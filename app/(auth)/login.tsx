import React, { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Link } from "@/components/ui/link";

import { formatPhoneNumber } from "@/src/shared/utils/phone";

export default function LoginScreen() {
  const { signIn, fetchStatus: signInFetchStatus } = useSignIn();
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isFetching =
    signInFetchStatus === "fetching" || signUpFetchStatus === "fetching";

  const handleContinue = async () => {
    setErrorMsg("");
    if (!phoneNumber) {
      setErrorMsg("Please enter a valid phone number");
      return;
    }

    const fullPhoneNumber = formatPhoneNumber(phoneNumber);

    const { error } = await signIn.create({ identifier: fullPhoneNumber });

    if (error) {
      if (error.code === "form_identifier_not_found") {
        setErrorMsg("Account not found. Please sign up first.");
      } else {
        setErrorMsg(error.longMessage || "Failed to send verification code");
      }
      return;
    }

    await signIn.phoneCode.sendCode({ phoneNumber: fullPhoneNumber });

    // Successfully sent sign in code
    router.push({
      pathname: "/verify",
      params: { phone: fullPhoneNumber },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-neutral-50"
    >
      <VStack className="flex-1 px-6 justify-center" space="xl">
        <Box className="items-center mb-8">
          <Heading size="3xl" className="text-center text-primary-500 mb-2">
            Staysafe
          </Heading>
          <Text size="lg" className="text-center text-typography-500">
            Log In
          </Text>
        </Box>

        <VStack space="md" className="mb-4">
          <Heading size="2xl">Enter Your Phone Number</Heading>
          <Text size="md" className="text-typography-500">
            Your verified number is crucial for sending emergency alerts and
            securing your account.
          </Text>
        </VStack>

        <VStack space="sm">
          <HStack space="sm">
            <Box className="justify-center px-4 bg-white border border-outline-300 rounded-md">
              <Text>+91</Text>
            </Box>
            <Input className="flex-1">
              <InputField
                placeholder="Enter mobile number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={!isFetching}
              />
            </Input>
          </HStack>
          {errorMsg ? (
            <Text className="text-error-500 text-sm mt-1">{errorMsg}</Text>
          ) : null}
        </VStack>

        <Button
          size="lg"
          className="rounded-full mt-4"
          onPress={handleContinue}
          disabled={isFetching}
        >
          {isFetching ? (
            <ButtonSpinner color="white" />
          ) : (
            <ButtonText>Log In</ButtonText>
          )}
        </Button>

        <Text className="text-center text-sm text-typography-400 mt-6">
          By Continuing you Agree to Our{" "}
          <Text className="font-bold text-typography-900">
            Terms of service
          </Text>{" "}
          and{" "}
          <Text className="font-bold text-typography-900">Privacy policy</Text>
        </Text>

        <HStack className="justify-center mt-4" space="sm">
          <Text className="text-typography-500">Don't have an account?</Text>
          <Link href="/signup">
            <Pressable>
              <Text className="text-primary-500 font-bold">Sign up</Text>
            </Pressable>
          </Link>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}
