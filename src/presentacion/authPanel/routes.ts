import { Router } from "express";
import { authPanelController } from "./controller";

export class AuthPanelRoutes {

    static get routes(): Router {

        const router = Router()

        const controller = new authPanelController()

        router
            .get('/', controller.CreateAdmin)

        return router
    }
}