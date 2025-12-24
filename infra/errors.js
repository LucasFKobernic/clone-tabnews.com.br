export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Unexpected error.", { cause });
    this.name = "InternalServerError.";
    this.action = "Contact Support.";
    this.status_code = 500;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status_code,
    };
  }
}
