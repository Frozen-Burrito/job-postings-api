import App from "./app";
import Log from "./utils/logger";

const port = process.env.PORT || 8080;

const app = new App();

try {
    // Try to initialize the app.
    app.listen(port, () => Log.info(`Server with REST API is ready and listening on port ${port}`));

} catch (error: unknown) {
    // If there is an error, fail instantly and notify about it.
    if (error) {
        const msg = (error as Error).message;

        Log.error(msg);
    } else {
        Log.error("An unknown error occurred during app.listen()");
    }
}