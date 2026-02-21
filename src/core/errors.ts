export type ParseErrorOptions = {
  cause?: unknown;
};

export class ParseError extends Error {
  public readonly name = "ParseError";
  public readonly cause?: unknown;

  constructor(message: string, options?: ParseErrorOptions) {
    super(message);
    this.cause = options?.cause;
  }
}

export type ValidationErrorOptions = {
  field?: string;
};

export class ValidationError extends Error {
  public readonly name = "ValidationError";
  public readonly field?: string;

  constructor(message: string, options?: ValidationErrorOptions) {
    super(message);
    this.field = options?.field;
  }
}
