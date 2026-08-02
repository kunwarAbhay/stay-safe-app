import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/expo";
import { useRouter, useSegments } from "expo-router";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || (isSignedIn && !userLoaded)) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isSignedIn && !inAuthGroup) {
      router.replace("/login");
    } else if (isSignedIn) {
      const hasProfile = user?.unsafeMetadata?.fullname;
      if (!hasProfile && segments[1] !== "profile") {
        router.replace("/profile");
      } else if (hasProfile && inAuthGroup && segments[1] !== "profile") {
        router.replace("/");
      }
    }
  }, [isLoaded, isSignedIn, userLoaded, user, segments, router]);

  return <>{children}</>;
}
