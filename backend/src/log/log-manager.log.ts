import winston from "winston";

import { getNamespace } from "cls-hooked";

import { logConfiguration } from "./log-config.log.js";

const winstonLogger = winston.createLogger(logConfiguration);

// winstonLogger.stream = {
//   write: function (message: string) {
//     winstonLogger.info(message);
//   }
// }

export const logger = {
  log: (level: string, message: string) => {
    winstonLogger.log(level, formatMessage(message));
  },
  error: (message: string) => {
    winstonLogger.error(formatMessage(message));
  },
  warn: (message: string) => {
    winstonLogger.warn(formatMessage(message));
  },
  info: (message: string) => {
    winstonLogger.info(formatMessage(message));
  },
  verbose: (message: string) => {
    winstonLogger.verbose(formatMessage(message));
  },
  debug: (message: string) => {
    winstonLogger.debug(formatMessage(message));
  },
  silly: (message: string) => {
    winstonLogger.silly(formatMessage(message));
  }
};

// Wrap Winston logger to print reqId in each log
const formatMessage = (message: string) => {
  const myRequest = getNamespace("lensview-app");
  message =
    myRequest && myRequest.get("reqId")
      ? myRequest.get("reqId") + ": " + message
      : message;
  return message;
};
