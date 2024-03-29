class AppError extends Error {
  constructor(message, statusCode) {
    super();
    // super(message);
    this.message = message;

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Failed!' : 'Error!';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
