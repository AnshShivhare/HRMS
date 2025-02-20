const apiErrorhandler = (err, req, res, next) => {
    const isValidStatusCode = (code) =>
      Number.isInteger(code) && code >= 100 && code <= 599;
  
    if (err.isApiError) {
      const statusCode = isValidStatusCode(err.responseCode)
        ? err.responseCode
        : 500;
      res.status(statusCode).json({
        responseCode: statusCode,
        responseMessage: err.responseMessage,
      });
      return;
    }
  
    if (err.message === "Validation error") {
      res.status(502).json({
        code: 502,
        responseMessage: err.original.message,
      });
      return;
    }
  
    const statusCode = isValidStatusCode(err.code) ? err.code : 500;
    res.status(statusCode).json({
      responseCode: statusCode,
      responseMessage: err.message || "Internal Server Error",
    });
  };
  
  module.exports = apiErrorhandler;
  