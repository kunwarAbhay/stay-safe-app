import { useState } from "react";

export function useSOS() {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [sosInitiationTimestamp, setSosInitiationTimestamp] = useState<number | undefined>(undefined);

  const handleActivateSOS = () => {
    console.log("SOS activated — start sharing here");
    setSosInitiationTimestamp(Date.now());
    setIsSOSActive(true);
  };

  const handleEndSOS = () => {
    console.log("SOS deactivated — stop sharing here");
    setSosInitiationTimestamp(undefined);
    setIsSOSActive(false);
  };

  return {
    isSOSActive,
    sosInitiationTimestamp,
    handleActivateSOS,
    handleEndSOS,
  };
}
