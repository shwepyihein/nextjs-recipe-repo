export interface ApiErrorResponse<T> {
  response: {
    success: boolean;
    data: T;
    message: string;
  };
}
