import { Request, Response } from "express"
import { RegisterAdminDTO } from "../../dominio/Dtos/authPanel/Register.dto"
import { AuthPanelService } from "../services/authPanel.service"
import { CustomError } from "../../dominio/errors/CustmoErrors"
import { LoginAdminDTO } from "../../dominio/Dtos/authPanel/Login.dto"
import { error } from "console"
import { ForgotPasswordDTO } from "../../dominio/Dtos/authPanel/ForgotPassword"

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

        const [error, RegisterDto] = RegisterAdminDTO.Create(body)
        if (error) return res.status(400).json({ error })

        this.ServiceAuthPanel.RegisterAdmin(RegisterDto!)
            .then(admin => res.json(admin))
            .catch(error => this.handleError(error, res))
    }

    LoginAdmin = (req: Request, res: Response) => {
        const body = req.body

        const [error, loginDto] = LoginAdminDTO.start(body)
        if (error) return res.status(400).json({ error })

        this.ServiceAuthPanel.LoginAdmin(loginDto!)
            .then(admin => res.json(admin))
            .catch(error => this.handleError(error, res))
    }

    ValidateToken = (req: Request, res: Response) => {
        const { token } = req.body

        console.log(token)
        if (!token) return res.status(400).json({ error: 'Se requiere el JWT' })

        this.ServiceAuthPanel.TokenValidate(token)
            .then(status => res.json(status))
            .catch(error => this.handleError(error, res))
    }

    ForgotPassword = (req: Request, res: Response) => {
        const body = req.body

        const [error, forgotPasswordDto] = ForgotPasswordDTO.start(body)
        if (error) return res.status(400).json({ error })

        this.ServiceAuthPanel.ForgotPassword(forgotPasswordDto!)
            .then(newContraseña => res.status(201).json(newContraseña))
            .catch(error => this.handleError(error, res))
    }
}