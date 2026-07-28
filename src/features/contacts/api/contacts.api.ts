import { apiClient } from "@/src/api/client";
import { ApiResponse, PaginatedData } from "@/src/api/types";
import {
  Contact,
  ContactCreateRequest,
  ContactUpdateRequest,
} from "@/src/features/contacts/types/contact";

export const fetchContacts = async (
  page: number = 0,
  size: number = 20,
): Promise<PaginatedData<Contact>> => {
  const response = await apiClient.get<ApiResponse<PaginatedData<Contact>>>(
    "/api/v1/contact",
    {
      params: { page, size },
    },
  );
  return response.data.data;
};

export const createContact = async (
  data: ContactCreateRequest,
): Promise<Contact> => {
  const response = await apiClient.post<ApiResponse<Contact>>(
    "/api/v1/contact",
    data,
  );
  return response.data.data;
};

export const updateContact = async (
  data: ContactUpdateRequest,
): Promise<Contact> => {
  const response = await apiClient.put<ApiResponse<Contact>>(
    "/api/v1/contact",
    data,
  );
  return response.data.data;
};

export const deleteContact = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/v1/contact/${id}`);
};
