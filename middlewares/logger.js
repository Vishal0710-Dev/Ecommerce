import { createLogger, format, transports } from "winston";
import path from "path";

// Define log format
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create Winston logger
const logger = createLogger({
  level: "info", // Default logging level
  format: format.combine(format.timestamp(), logFormat),
  transports: [
    // Save all logs to access.log
    new transports.File({ filename: path.join("logs", "access.log"), level: "info" }),

    // Save only error logs to error.log
    new transports.File({ filename: path.join("logs", "error.log"), level: "error" }),

    // Print logs to console (optional)
    new transports.Console(),
  ],
});

export default logger;
