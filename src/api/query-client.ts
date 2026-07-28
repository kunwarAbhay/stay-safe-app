import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Only retry once by default
      staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
      refetchOnWindowFocus: false, // Better for mobile apps to control refetching manually
    },
  },
});
