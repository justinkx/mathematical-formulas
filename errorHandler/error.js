var createError = require('http-errors');

const errorHandler = (app) => {
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    if (typeof (err) === 'string') {
      // custom application error
      return res.status(400).json({ message: err });
    }
    if (err.name === 'ValidationError') {
      // mongoose validation error
      return res.status(400).json({ message: err.message });
    }
    if (err.name === 'Not Found' || err.name === 'CastError') {
      return res.status(204).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      return res.status(401).json({ message: 'Invalid Token' });
    }
    // default to 500 server error
    return res.status(500).json({ message: err.message });
  });
}

module.exports = errorHandler;