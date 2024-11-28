import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerCustomService {
  /**
   * Throws a custom error with the given details.
   * @param status HTTP status code
   * @param response_code Application-specific response code
   * @param response_message Error message
   */
  throwError(
    status: number,
    response_code: string,
    response_message: string,
  ): void {
    throw new CustomError(status, response_code, response_message);
  }
}

/**
 * Custom Error Class
 */
export class CustomError extends Error {
  public status: number;
  public response_code: string;
  public response_message: string;

  constructor(status: number, response_code: string, response_message: string) {
    super(response_message); // Use the response message as the error message
    this.status = status;
    this.response_code = response_code;
    this.response_message = response_message;

    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
