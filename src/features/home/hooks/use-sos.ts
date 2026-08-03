import { create } from "zustand";

export interface SOSState {
  isSOSActive: boolean;
  sosInitiationTimestamp?: number;
  handleActivateSOS: () => void;
  handleEndSOS: () => void;
}

export const useSOS = create<SOSState>((set) => ({
  isSOSActive: false,
  sosInitiationTimestamp: undefined,

  handleActivateSOS: () => {
    console.log("SOS activated — start sharing here");
    set({
      isSOSActive: true,
      sosInitiationTimestamp: Date.now(),
    });
  },

  handleEndSOS: () => {
    console.log("SOS deactivated — stop sharing here");
    set({
      isSOSActive: false,
      sosInitiationTimestamp: undefined,
    });
  },
}));
