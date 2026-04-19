export interface responseTypeInterface {
  status: string,
  message: string,
  data: any,
  errorMessage: any
}

export interface ApiResponse<T> {
  status: "Success" | "error" | "Failed";
  message: string;
  data?: T;
  // errorMessage?: string;\
  errorMessage?: any;
}