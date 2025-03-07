const {
    createLogger,
    format,
    transports,
    loggers: winstonLogger,
} = require("winston");

const DailyRotateFile = require("winston-daily-rotate-file");
const { combine, timestamp, printf } = format;

const options = {
    logLevels: {
        fatal: 0,
        error: 1,
        trace: 2,
        warn: 3,
        info: 4,
        debug: 5,
    },
    format: combine(
        // format.colorize(),
        timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
        printf((info) => {
            const splat = info[Symbol.for("splat")];
            if (splat) {
                return `[${info.timestamp}]-[${info.level}] ${
                    info.message
                } - meta: ${
                    typeof splat[0] === "object"
                        ? JSON.stringify(splat[0])
                        : splat[0]
                }`;
            }
            return `[${info.timestamp}]-[${info.level}] ${info.message} `;
        })
    ),
};

const logger = createLogger({
    exitOnError: false,
    levels: options.logLevels,
    format: options.format,
    transports: [new transports.Console()],
});

const fileRotateTransport = new DailyRotateFile({
    level: "info",
    filename: "logs/%DATE%_info.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "50m",
    maxFiles: "14d",
    zippedArchive: true,
});

logger.add(fileRotateTransport);

module.exports = logger;
