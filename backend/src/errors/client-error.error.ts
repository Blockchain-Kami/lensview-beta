import { BaseError } from "./base-error.error";
import { httpStatusCodes } from "../config/app-constants.config";

// TODO: Put loggers inside error classes so we know which kind of error was thrown
export class ClientError extends BaseError {
  private description: string;
  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {string} name - The name of the instance.
   * @param {number} statusCode - The status code for the instance. Default is NOT_FOUND.
   * @param {string} description - The description of the instance. Default is "Not Found."
   * @param {boolean} isOperational - Boolean indicating if the instance is operational. Default is true.
   */
  constructor(
    description: string = "Not Found.",
    statusCode: number = httpStatusCodes.NOT_FOUND,
    name: string = "Client Error",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
    this.name = name;
    this.statusCode = statusCode;
    this.description = description;
  }
}
