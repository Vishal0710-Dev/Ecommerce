import { createLogger, format, transports } from "winston";
import path from "path";
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), logFormat),
  transports: [
    new transports.File({ filename: path.join("logs", "access.log"), level: "info" }),
    new transports.File({ filename: path.join("logs", "error.log"), level: "error" }),
    new transports.Console(),
  ],
});

export default logger;
