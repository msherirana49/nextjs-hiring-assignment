export interface ApiErrorPayload {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export interface AppApiError {
  statusCode: number;
  message: string;
  original?: unknown;
}
