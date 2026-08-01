import React, { useState } from "react";
import { useSignUp } from "@clerk/expo";
import { useRouter, Link } from "expo-router";
import { KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { Box } from "@/components/ui/box";

import { formatPhoneNumber } from "@/src/shared/utils/phone";

export default function SignupScreen() {
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isFetching = signUpFetchStatus === "fetching";

  const handleContinue = async () => {
    setErrorMsg("");
    if (!phoneNumber) {
      setErrorMsg("Please enter a valid phone number");
      return;
    }

    const fullPhoneNumber = formatPhoneNumber(phoneNumber);

    const { error } = await signUp.create({ phoneNumber: fullPhoneNumber });

    if (error) {
      setErrorMsg(error.longMessage || "Failed to send verification code");
      return;
    }

    if (!error) await signUp.verifications.sendPhoneCode();

    router.push({
      pathname: "/verify",
      params: { phone: fullPhoneNumber, type: "signup" },
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
            <ButtonText>Sign Up</ButtonText>
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
          <Text className="text-typography-500">Already have an account?</Text>
          <Link href="/login" asChild>
            <Pressable>
              <Text className="text-primary-500 font-bold">Log in</Text>
            </Pressable>
          </Link>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}
