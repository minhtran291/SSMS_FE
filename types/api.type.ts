export interface ApiErrorResponse {
    success: false;
    statusCode: number;
    message: string;
    errors?: Record<string, string[]>;
    traceId: string;
}