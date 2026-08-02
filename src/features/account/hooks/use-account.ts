import { useState } from "react";
import { useUser } from "@/src/features/auth/hooks/use-user";
import { useSignOut } from "@/src/features/auth/hooks/use-sign-out";
import { useRouter } from "expo-router";
import { FALLBACK_PROFILE_IMG_URL } from "@/src/config/constants";

export const useAccount = () => {
  const { user } = useUser();
  const { signOut } = useSignOut();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const fullname = (user?.unsafeMetadata?.fullname as string) || "";
  const phoneNumber = user?.primaryPhoneNumber?.phoneNumber || "";
  const rawAge = (user?.unsafeMetadata?.age as string) || "";
  const age = rawAge ? `${rawAge} Years` : "-";
  const gender = (user?.unsafeMetadata?.gender as string) || "";
  const imageUrl = user?.imageUrl || FALLBACK_PROFILE_IMG_URL;

  const handleEditProfile = () => {
    router.push("/profile");
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.replace("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return {
    user,
    fullname,
    phoneNumber,
    age,
    gender,
    imageUrl,
    isSigningOut,
    handleEditProfile,
    handleSignOut,
  };
};
