import winston from "winston";
import 'winston-daily-rotate-file'

const transport = new (winston.transports.DailyRotateFile)({
    filename: './src/logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'info',
    handleExceptions: true,
    colorize: true,
    json: false,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '3d'

});

const logConfiguration = {
    'transports': [
        transport
    ],
    format: winston.format.combine(
        winston.format.label({
            // label: `🏷-LOGS`
            label: 'LOG'
        }),
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.label}: ${[info.timestamp]}: ${info.level}: ${info.message}`),
    )
};
export const logger = winston.createLogger(logConfiguration);