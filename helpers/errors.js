export class BaseError extends Error {
  #success = false;

  constructor(message = 'Unknown error') {
    super(message);

    this._code = 500;
  }

  get code() {
    return this._code;
  }
  get success() {
    return this.#success;
  }
}

export class ValidationError extends BaseError {
  #errors = null;

  constructor(message = 'Validation error', errors = null) {
    super(message);

    this._code = 400;
    this.#errors = errors;
  }

  get errors() {
    return this.#errors;
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'Not found') {
    super(message);
    this._code = 404;
  }
}

export class RouteNotFoundError extends BaseError {
  constructor() {
    super('Route not found');

    this._code = 404;
  }
}

export class ConflictError extends BaseError {
  constructor(message = 'Conflict') {
    super(message);

    this._code = 409;
  }
}

export class UnAuthorizedError extends BaseError {
  constructor(message = 'Unauthorized error') {
    super(message);
    this._code = 401;
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = 'Forbidden error') {
    super(message);
    this._code = 403;
  }
}
