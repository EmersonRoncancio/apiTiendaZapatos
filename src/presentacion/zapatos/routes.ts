import { Router } from "express";
import { ZapatosController } from "./controller";

export class ZapatosRoutes{

    static get routes(): Router{

        const router = Router()

        const controller = new ZapatosController()

        router.
            post('/', controller.CreateZapatos)

        return router
    }
}