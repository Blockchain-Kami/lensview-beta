import winston from "winston";
import { getNamespace } from "continuation-local-storage";
import { logConfiguration } from "../config/log.config";

export const winstonLogger = winston.createLogger(logConfiguration);

// Wrap Winston logger to print reqId in each log
const formatMessage = function (message: string) {
  const myRequest = getNamespace("my request");
  console.log("Hellooo " + myRequest?.get("reqId"));
  message =
    myRequest && myRequest.get("reqId")
      ? new Date().getTime() + " reqId: " + myRequest.get("reqId") + message
      : message;
  return message;
};

export const logger = {
  log: function (level: string, message: string) {
    winstonLogger.log(level, formatMessage(message));
  },
  error: function (message: string) {
    winstonLogger.error(formatMessage(message));
  },
  warn: function (message: string) {
    winstonLogger.warn(formatMessage(message));
  },
  verbose: function (message: string) {
    winstonLogger.verbose(formatMessage(message));
  },
  info: function (message: string) {
    winstonLogger.info(formatMessage(message));
  },
  debug: function (message: string) {
    winstonLogger.debug(formatMessage(message));
  },
  silly: function (message: string) {
    winstonLogger.silly(formatMessage(message));
  }
};
