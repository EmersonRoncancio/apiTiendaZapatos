import { Request, Response } from "express"
import { AdminDTO } from "../../dominio/Dtos/authPanel/Admin.dto"
import { AuthPanelService } from "../services/authPanel.service"
import { CustomError } from "../../dominio/errors/CustmoErrors"

export class authPanelController {

    constructor(
        public readonly ServiceAuthPanel: AuthPanelService
    ) { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

        return res.status(500).json({ error: "Internal Server Error" })
    }

    RegisterAdmin = (req: Request, res: Response) => {
        const body = req.body

        const [error, RegisterDto] = AdminDTO.Create(body)
        if(error) return res.status(400).json({error})

        this.ServiceAuthPanel.RegisterAdmin(RegisterDto!)
            .then( admin => res.json(admin))
            .catch( error => this.handleError(error, res))
    }

}