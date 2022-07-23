import { IncomingMessage, ServerResponse } from "http";
import morgan, { FormatFn, StreamOptions } from "morgan";

import Log from "../utils/logger";

const stream: StreamOptions = {
    write: (message) => Log.http(message),
};

function skip(): boolean {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
}

const formatTokens = ":method :url :status :res[content-length] - :response-time ms";

const morganHttpMiddleware = morgan(
    formatTokens,
    { stream, skip }
);

export default morganHttpMiddleware;