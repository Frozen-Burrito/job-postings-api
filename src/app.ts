import path from "path";
import express, { Application, Request, Response } from "express";

class App {

    public app: Application = express();

    constructor() {
        this.init();
        this.setupDataSource();
    }

    private init(): void {

    }

    private async setupDataSource(): Promise<void> {
        try {
            const mongoUri = process.env.MONGO_URI ?? "";

        } catch (error: any) {
            
        }
    }

    public listen(port : string | number, onSuccess: () => void) {
        this.app.listen(port, onSuccess);
    }
}

export default App;