import { Router, Response } from "express";

import { AuthRouter } from "./auth_router";

export class MainRouter {

    public router: Router = Router();

    private authRouter: AuthRouter = new AuthRouter();

    constructor() {
        this.mapRoutes();
    }

    private mapRoutes(): void {

        this.router.use("/hello-world", (_, res: Response) => {
            res.send("Hello World!");
        });

        this.router.use("/auth", this.authRouter.router);
    }
}