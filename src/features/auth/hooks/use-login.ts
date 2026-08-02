import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { formatPhoneNumber } from "@/src/shared/utils/phone";
import { DEFAULT_COUNTRY_CODE } from "@/src/config/constants";

export const useLogin = () => {
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();

  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isFetching = fetchStatus === "fetching";

  const handleContinue = async () => {
    setErrorMsg("");
    if (!phoneNumber) {
      setErrorMsg("Please enter a valid phone number");
      return;
    }

    const fullPhoneNumber = formatPhoneNumber(phoneNumber, countryCode);

    try {
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
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.longMessage || err.message || "An unexpected error occurred.",
      );
    }
  };

  return {
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    errorMsg,
    isFetching,
    handleContinue,
  };
}
