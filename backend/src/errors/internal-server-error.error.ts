import { BaseError } from "./base-error.error";
import { httpStatusCodes } from "../config/app-constants.config";

// TODO: Put loggers inside error classes so we know which kind of error was thrown
export class InternalServerError extends BaseError {
  private description: string;
  /**
   * Constructs a new instance of the class.
   *
   * @param {string} name - The name of the instance.
   * @param {number} statusCode - The status code for the instance. Default is 500 (Internal Server Error).
   * @param {string} description - The description of the instance. Default is "Server Error".
   * @param {boolean} isOperational - Flag indicating if the instance is operational. Default is true.
   */
  constructor(
    description: string = "Server Error",
    statusCode: number = httpStatusCodes.INTERNAL_SERVER_ERROR,
    name: string = "Internal Server Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
  }
}
