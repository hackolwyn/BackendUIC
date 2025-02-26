const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const response = {
    message: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  };
  res.status(500).json(response);
};

module.exports = errorHandler;
