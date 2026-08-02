import { useClerk } from "@clerk/expo";

export const useSignOut = () => {
  const { signOut } = useClerk();
  return { signOut };
};
