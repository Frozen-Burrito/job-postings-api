import path from "path";
import winston from "winston";

const LOGS_DIR = "../logs";
const ALL_LOGS_FILENAME = path.join(LOGS_DIR, "everything.log");
const ERROR_LOG_FILENAME = path.join(LOGS_DIR, "errors.log");

/**
 * Describes the possible environments for the app.
 */
type environment = "development" | "staging" | "production";

/**
 * Describes the possible log levels for the app.
 */
type logLevel = "error" | "warn" | "info" | "http" | "debug";

const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "white",
        http: "blue",
        debug: "white",
    }
}

/**
 * Provides the log level to be used based on the value of the "NODE_ENV"
 * environment variable. If this env var is not provided, a default log 
 * level of __"debug"__ is returned.
 * @returns The current log level for the application.
 */
function getLogLevel(): logLevel {
    const env: environment = process.env.NODE_ENV as environment || "development";

    const isProduction: boolean = env === "production";

    return isProduction ? "http" : "debug";
}

function getTransportsForEnv(): winston.transport[] {
    const env: environment = process.env.NODE_ENV as environment || "development";

    const isDevelopment: boolean = env === "development";

    let transportsForEnv: winston.transport[] = [
        transports.console,
    ];

    // if (isDevelopment) {
    //     transportsForEnv.push(
    //         transports.genericFile, 
    //         transports.errorFile
    //     );
    // }

    return transportsForEnv;
}

// Define the format that winston will use for the log messages.
// This applies to all evironments.
const format: winston.Logform.Format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss"}),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

// Specify the transports that will be used by the logger. This applies 
// to all evironments.
const transports = {
    console: new winston.transports.Console(),
    // genericFile: new winston.transports.File({
    //     filename: ALL_LOGS_FILENAME,
    // }),
    // errorFile: new winston.transports.File({
    //     level: "error",
    //     filename: ERROR_LOG_FILENAME
    // }),
};

// Configure custom colors for each log level. 
winston.addColors(logLevels.colors);

/**
 * A general purpose logger, which uses most of npm's log levels and 
 * has support for console and file log display.
 */
const Logger: winston.Logger = winston.createLogger({
    level: getLogLevel(),
    levels: logLevels.levels,
    format,
    transports: getTransportsForEnv(),
});

export default Logger;
