import logger from "./logger.js";

const errorhandler = (err, req, res, next) => {
  logger.error(`${err.message} - ${req.method} ${req.originalUrl}`);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorhandler;
