import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useSOS } from "@/src/features/home/hooks/use-sos";

export function useMarkAsSafe() {
  const router = useRouter();
  const { handleEndSOS } = useSOS();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmMarkAsSafe = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    handleEndSOS();

    setTimeout(() => {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push("/");
      }
    }, 100);
  }, [isSubmitting, handleEndSOS, router]);

  const cancelMarkAsSafe = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return {
    confirmMarkAsSafe,
    cancelMarkAsSafe,
    isSubmitting,
  };
}
