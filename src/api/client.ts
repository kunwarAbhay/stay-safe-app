import axios from "axios";
import { AppApiError, ApiErrorResponse } from "@/src/api/types";

const MOCK_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18zRzJ4U21xT0NIMDExd1IwVXdsV01FUVVpTmoiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL2R5bmFtaWMta2F0eWRpZC0zMy5hY2NvdW50cy5kZXYiLCJleHAiOjE3ODU4NjM2MDEsImlhdCI6MTc4NTI2MzYwMSwiaXNzIjoiaHR0cHM6Ly9keW5hbWljLWthdHlkaWQtMzMuY2xlcmsuYWNjb3VudHMuZGV2IiwianRpIjoiYTMyZWM2NTQ2MzA4MjkyMGE5N2UiLCJuYmYiOjE3ODUyNjM1NTEsInN1YiI6InVzZXJfM0czMGpHeW00VDVZYktaUHZwd3dudGZmZFNjIn0.pFpJfUok5f7d1Qqcm49WnPJWrcs3a6zzbphtp4xia5sQ8rdJBc0RvqQ08_CDHJwXqkGPdahgnQY6kQofBeLVoLSt8LAMSHREhaoWhuCq6CdKpGHfvW2W_rl4AAdHPRyqW5FPH9s_HYe4Ac3wehWo-NsjVQdksOYTY95HP3AsXhGknVwEz620sZLszMhvMpqV9HAWB-xKQyRD722ODzpDRDaTM4NqUxqNT3cr-EtAmBiA5S0hmbqdayZghWf2YYocxGyG_fHi4x7sNt8CEu-VBrfKKhRp8cAD1rluY4cAL9YUKZk19hnQmczNlseyg0EKtPVg4kWxJ9hrWEkpjp4UmA"; // Temporarily hardcoded as requested
const BASE_URL = "http://localhost:8080"; // Temporarily hardcoded as requested

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  // Attach hardcoded token
  config.headers.Authorization = `Bearer ${MOCK_TOKEN}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "An unexpected network error occurred.";
    let status = 500;
    let validationErrors: Record<string, string> | undefined;

    if (error.response) {
      status = error.response.status;
      const responseData = error.response.data as ApiErrorResponse;

      errorMessage = responseData?.message || error.message;
      validationErrors = responseData?.data;
    } else if (error.request) {
      errorMessage = "No response received from the server.";
    } else {
      errorMessage = error.message;
    }

    return Promise.reject(
      new AppApiError(errorMessage, status, validationErrors),
    );
  },
);
