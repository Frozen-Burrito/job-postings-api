import App from "./app";

const port = process.env.PORT || 8080;

const app = new App();

try {
    // Try to initialize the app.
    app.listen(port, () => console.log(`Server with REST API is ready and listening on port ${port}`));
} catch (error: unknown) {
    // If there is an error, fail instantly and notify about it.
    //TODO: log
}