import { useState } from "react";
import { useUser } from "@clerk/expo";
import { useRouter } from "expo-router";

export function useProfileSetup() {
  const { user } = useUser();
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async () => {
    setErrorMsg("");
    if (!fullname.trim() || !age || !gender) {
      setErrorMsg("Please fill out all fields");
      return;
    }

    setIsSaving(true);
    try {
      await user?.updateMetadata({
        unsafeMetadata: {
          fullname: fullname.trim(),
          age,
          gender,
        },
      });

      // AuthGuard in _layout will automatically detect profile completion and redirect to /
      router.replace("/");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid = Boolean(fullname.trim() && age && gender);

  return {
    fullname,
    setFullname,
    age,
    setAge,
    gender,
    setGender,
    isSaving,
    errorMsg,
    isFormValid,
    handleSave,
  };
}
