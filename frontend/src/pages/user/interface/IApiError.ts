export interface ApiError {
  response?: {
    data?: {
      error?: string;
      message?: string;
    };
    status?:number;
  };
  message?:string
}