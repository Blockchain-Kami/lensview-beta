import winston from "winston";
import "winston-daily-rotate-file";

const transport = new winston.transports.DailyRotateFile({
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  dirname: `./logs/`,
  level: "info",
  handleExceptions: true,
  json: false,
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "1d"
});

export const logConfiguration = {
  transports: [
    // new winston.transports.File({
    //     level: 'info',
    //     filename: './logs/example.log'
    // })
    transport
  ],
  format: winston.format.combine(
    winston.format.label({
      label: `🏷-LOGS`
    }),
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss"
    }),
    winston.format.printf(
      (info) =>
        `${info.label}: ${[info.timestamp]}: ${info.level}: ${info.message}`
    )
  )
};
