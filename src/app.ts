import path from "path";
import express, { Application, Request, Response } from "express";

import Log from "./utils/logger";

class App {

    public app: Application = express();

    constructor() {
        this.init();
        this.setupDataSource();
    }

    private init(): void {

        if (process.env.NODE_ENV === "development") {
            require("dotenv").config({ path: "./.env.development.local"});
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // this.app.use(reqLoggerMiddleware);

        // this.app.use("/api/v1", this.apiRouter.router);
    }

    private async setupDataSource(): Promise<void> {
        try {
            const mongoUri = process.env.MONGO_URI ?? "";

            Log.info(`Server connected to MongoDB Atlas with host ${0}`);

        } catch (error: unknown) {
            // For some reason, the server was unnable to connect to MongoDB Atlas.
            const msg: string = (error as Error).message;

            Log.error(`An error occurred while connecting to MongoDB Atlas: ${msg}`);
        }
    }

    public listen(port : string | number, onSuccess: () => void) {
        this.app.listen(port, onSuccess);
    }
}

export default App;