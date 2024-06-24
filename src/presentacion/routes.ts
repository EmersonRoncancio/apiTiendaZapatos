import { Router } from "express";
import { AuthPanelRoutes } from "./authPanel/routes";


export class AppRoutes {

    static get routes(): Router {

        const router = Router()

        router.use('/api/authPanel', AuthPanelRoutes.routes)

        return router
    }

}