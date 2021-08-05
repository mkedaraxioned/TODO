const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log('🔥',err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    return res.status(404).send({error:message});
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    return res.status(400).send({error:message});
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return res.status(400).send({error:message});
  }

  return res.status(error.statusCode || 500).send({
    error: error.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
