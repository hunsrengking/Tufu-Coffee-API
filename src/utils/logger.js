import winston from "winston";
import path from "path";
import "winston-daily-rotate-file";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log levels and colors
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// Log level based on environment
const level = process.env.NODE_ENV === "production" ? "info" : "debug";

// Custom format for readable console logs
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const { timestamp, level, message, stack, ...meta } = info;
    let log = `[${timestamp}] ${level}: ${message}`;
    
    // Print stack trace if available (for errors)
    if (stack) {
      log += `\n${stack}`;
    } else if (Object.keys(meta).length) {
      // Print meta as formatted JSON if it's not empty
      log += `\n${JSON.stringify(meta, null, 2)}`;
    }
    
    return log;
  })
);

// File log format (JSON with stack traces)
const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Define transports
const transports = [
  new winston.transports.Console({
    format: consoleFormat,
  }),
  // Error logs rotation (retains for 14 days)
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, "../../logs/error-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "error",
    format: fileFormat,
  }),
  // Combined logs rotation (retains for 14 days)
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, "../../logs/combined-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: fileFormat,
  }),
];

const logger = winston.createLogger({
  level,
  levels,
  transports,
  // Handle uncaught exceptions and unhandled rejections
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(__dirname, "../../logs/exceptions.log") })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(__dirname, "../../logs/rejections.log") })
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

export default logger;

