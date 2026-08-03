import { useState, useCallback, useEffect } from "react";
import { useRouter } from "expo-router";
import { useSOS } from "@/src/features/home/hooks/use-sos";

export function useConfirmSOS() {
  const router = useRouter();
  const { handleActivateSOS } = useSOS();
  const [isActivating, setIsActivating] = useState(false);

  const triggerSOS = useCallback(() => {
    if (isActivating) return;
    setIsActivating(true);
    handleActivateSOS();

    setTimeout(() => {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push("/");
      }
    }, 100);
  }, [isActivating, handleActivateSOS, router]);

  const cancelSOS = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  return {
    triggerSOS,
    cancelSOS,
    isActivating,
  };
}
