import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from "@/src/features/contacts/api/contacts.api";
import { ContactCreateRequest, ContactUpdateRequest } from "@/src/features/contacts/types/contact";
import { AppApiError } from "@/src/api/types";

export const CONTACTS_QUERY_KEY = ["contacts"];

export const useContacts = (page: number = 0, size: number = 20) => {
  return useQuery({
    queryKey: [...CONTACTS_QUERY_KEY, { page, size }],
    queryFn: () => fetchContacts(page, size),
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AppApiError, ContactCreateRequest>({
    mutationFn: (data) => createContact(data),
    onSuccess: () => {
      // Invalidate and refetch contacts
      queryClient.invalidateQueries({ queryKey: CONTACTS_QUERY_KEY });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AppApiError, ContactUpdateRequest>({
    mutationFn: (data) => updateContact(data),
    onSuccess: () => {
      // Invalidate and refetch contacts
      queryClient.invalidateQueries({ queryKey: CONTACTS_QUERY_KEY });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AppApiError, string>({
    mutationFn: (id) => deleteContact(id),
    onSuccess: () => {
      // Invalidate and refetch contacts
      queryClient.invalidateQueries({ queryKey: CONTACTS_QUERY_KEY });
    },
  });
};
