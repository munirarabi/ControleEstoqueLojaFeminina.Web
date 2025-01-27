export interface ApiResponse<T> {
    data: T[];
    message: string;
    friendlyErrorMessage: string;
    stackTrace: string;
  }
  