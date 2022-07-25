import { Router, Request, Response } from "express";

export class AuthRouter {

    public router: Router = Router();

    constructor() {
        this.mapRoutes();
    }

    private mapRoutes(): void {

        this.router.post("/sign-in");

        this.router.post("/sign-up");
    }
}