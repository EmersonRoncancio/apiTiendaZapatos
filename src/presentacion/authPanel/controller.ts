import { Request, Response } from "express"

export class authPanelController {

    constructor() { }

    CreateAdmin = (req: Request, res: Response) => {
        res.json({estado: 'Ok desde la creacion del admin'})
    }
}