import { Router } from "express";
import { authPanelController } from "./controller";
import { AuthPanelService } from "../services/authPanel.service";

export class AuthPanelRoutes {

    static get routes(): Router {

        const router = Router()

        const service = new AuthPanelService()
        const controller = new authPanelController(service)

        router
            .post('/', controller.RegisterAdmin)
            .post('/login', controller.LoginAdmin)

        return router
    }
}