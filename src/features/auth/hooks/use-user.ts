import { useUser as useClerkUser } from "@clerk/expo";

export const useUser = () => {
  return useClerkUser();
};
