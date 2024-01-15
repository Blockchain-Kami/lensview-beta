export class BaseError extends Error {
  protected statusCode: number;
  private isOperational: boolean;
  /**
   * Constructor for creating a new instance of the class.
   *
   * @param {string} name - The name of the instance.
   * @param {number} statusCode - The status code of the instance.
   * @param {string} description - The description of the instance.
   * @param {boolean} isOperational - A flag indicating if the instance is operational.
   */
  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: boolean
  ) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}
