import { Router } from "express";
import { ZapatosController } from "./controller";
import { AuthPanelMiddleware } from "../middlewares/authPanel.middlaware";
import { ZapatosService } from "../services/zapatos.service";

export class ZapatosRoutes {

    static get routes(): Router {

        const router = Router()

        const service = new ZapatosService()
        const controller = new ZapatosController(service)

        router
            .post('/', [AuthPanelMiddleware.validateAdmin], controller.CreateZapatos)
            .get('/', controller.GetZapatos)
            .delete('/delete/:id', [AuthPanelMiddleware.validateAdmin], controller.DeleteZapato)
            .put('/update/:id', [AuthPanelMiddleware.validateAdmin], controller.UpdateZapato)

        return router
    }
}