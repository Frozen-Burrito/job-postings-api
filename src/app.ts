import path from "path";
import express, { Application } from "express";

import { MainRouter } from "./routes";

import Log from "./utils/logger";
import requestLoggerMiddleware from "./middleware/morgan_http";
import { connectMongoDbAtlas } from "./utils/mongodb_connector";

class App {

    public app: Application = express();

    private mainRouter: MainRouter = new MainRouter();

    constructor() {
        this.init();
        this.setupDataSource();
    }

    private init(): void {

        if (process.env.NODE_ENV === "development") {
            // Load environment variables from local .env file.
            const dotenv = require("dotenv");
            const envPath: string = path.resolve(__dirname, ".env.development.local");
        
            const envResult = dotenv.config({ path: envPath});
        
            if (envResult.error) {
                throw envResult.error;
            }
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(requestLoggerMiddleware);

        this.app.use("/api/v1", this.mainRouter.router);
    }

    private async setupDataSource(): Promise<void> {
        try {
            const connectionString = process.env.MONGODB_ATLAS_URL ?? "";

            const mongoClient = await connectMongoDbAtlas(connectionString);

            Log.info(`Server connected to MongoDB Atlas with host ${mongoClient.connection.host}`);

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