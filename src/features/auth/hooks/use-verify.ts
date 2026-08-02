import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";

export const useVerify = (
  type: "login" | "signup",
  fullPhoneNumber: string,
) => {
  const { signIn, fetchStatus: signInFetchStatus } = useSignIn();
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const router = useRouter();

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
        const { error } = await signUp.verifications.verifyPhoneCode({ code });

        if (error) {
          setErrorMsg(error.longMessage || "Invalid verification code");
          return;
        }
        if (signUp.status === "complete") {
          await signUp.finalize({ navigate: navigateAfterAuth });
        }
      } else {
        const { error } = await signIn.phoneCode.verifyCode({ code });

        if (error) {
          setErrorMsg(error.longMessage || "Invalid verification code");
          return;
        }
        if (signIn.status === "complete") {
          await signIn.finalize({ navigate: navigateAfterAuth });
        }
      }
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(message);
    }
  };

  const handleResendCode = async () => {
    try {
      if (isSignUp) {
        await signUp.verifications.sendPhoneCode();
      } else {
        await signIn.phoneCode.sendCode({ phoneNumber: fullPhoneNumber });
      }
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to resend code. Please try again.";
      setErrorMsg(message);
    }
  };

  return {
    code,
    setCode,
    errorMsg,
    isFetching,
    handleVerify,
    handleResendCode,
  };
};
