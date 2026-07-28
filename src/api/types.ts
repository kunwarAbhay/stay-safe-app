export interface ApiResponse<T> {
  status: "SUCCESS" | "ERROR";
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  status: "ERROR";
  message?: string;
  data?: Record<string, string>; // Validation field errors
}

export class AppApiError extends Error {
  public status: number;
  public validationErrors?: Record<string, string>;

  constructor(message: string, status: number, validationErrors?: Record<string, string>) {
    super(message);
    this.name = "AppApiError";
    this.status = status;
    this.validationErrors = validationErrors;
  }
}

// Spring Data Page structure
export interface PaginatedData<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
