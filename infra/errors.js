export class InternalServerError extends Error {
  constructor({ cause, status_code }) {
    super("Unexpected error.", { cause });
    this.name = "InternalServerError.";
    this.action = "Contact Support.";
    this.status_code = status_code || 500;
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

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Service not avaiable", { cause });
    this.name = "InternalServerError.";
    this.action = "Check service avaiability";
    this.status_code = 503;
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

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Method not allowed");
    this.name = "MethodNotAllowedError";
    this.action = "Verify allowed methods";
    this.status_code = 405;
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
