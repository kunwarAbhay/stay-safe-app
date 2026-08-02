import { useState } from "react";
import { useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { formatPhoneNumber } from "@/src/shared/utils/phone";
import { DEFAULT_COUNTRY_CODE } from "@/src/config/constants";

export const useSignup = () => {
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const router = useRouter();

  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const isFetching = signUpFetchStatus === "fetching";

  const handleContinue = async () => {
    setErrorMsg("");
    if (!phoneNumber) {
      setErrorMsg("Please enter a valid phone number");
      return;
    }

    const fullPhoneNumber = formatPhoneNumber(phoneNumber, countryCode);

    try {
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
    } catch (err: any) {
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
};
