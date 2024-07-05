import { Router } from "express";
import { AuthPanelRoutes } from "./authPanel/routes";
import { ZapatosRoutes } from "./zapatos/routes";


export class AppRoutes {

    static get routes(): Router {

        const router = Router()

        router.use('/api/authPanel', AuthPanelRoutes.routes)
        router.use('api/zapatos', ZapatosRoutes.routes)

        return router
    }

}