import App from "./app";
import Log from "./utils/logger";

const port = process.env.PORT || 8080;

const app = new App();

try {
    // Try to initialize the app.
    app.listen(port, () => Log.info(`Server with REST API is ready and listening on port ${port}`));

} catch (error: unknown) {
    // If there is an error, fail instantly and notify about it.
    const msg = (error as Error).message || "An unknown error occurred during app.listen().";

    Log.error(msg);
}