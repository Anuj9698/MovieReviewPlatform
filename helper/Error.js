class CustomError extends Error {
  constructor(message, code = 200, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    this.message = message;
    this.code = code;
    this.status = code;

    const logObj = {
      message: this.message,
      status: this.code,
    };

    switch (code) {
      case 200:
        this.name = 'Success';
        break;
      case 400:
        this.name = 'BadRequest';
        break;
      case 401:
        this.name = 'UnauthorizedError';
        break;
      case 403:
        this.name = 'Forbidden';
        break;
      case 404:
        this.name = 'NotFound';
        break;
      case 500:
        this.name = 'ServerError';
        this.message =
          'Server not able to process the request, Please try again.';
        break;
      default:
        this.name = 'CustomError';
        break;
    }
  }
}

module.exports = CustomError;
