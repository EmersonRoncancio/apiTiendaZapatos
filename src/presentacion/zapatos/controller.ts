import { CustomError } from "../../dominio/errors/CustmoErrors"
import { Response } from 'express'

export class ZapatosController {

    constructor() { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

        return res.status(500).json({ error: "Internal Server Error" })
    }

}