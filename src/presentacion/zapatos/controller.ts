import { CustomError } from "../../dominio/errors/CustmoErrors"
import { Request, Response } from 'express'
import { UploadedFile } from "express-fileupload";
import { CreateZapatosDTO } from "../../dominio/Dtos/zapatos/createZapatos.dto";
import { ZapatosService } from "../services/zapatos.service";
import { PaginationDto } from "../../dominio/Dtos/shared/pagination.dto";
import { error } from "console";

export class ZapatosController {

    constructor(
        public readonly ZapatosService: ZapatosService
    ) { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

        return res.status(500).json({ error: "Internal Server Error" })
    }

    CreateZapatos = (req: Request, res: Response) => {

        const body = req.body

        if (!req.files?.image || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'Ningun archivo fue cargado' });
        }

        const file = req.files.image as UploadedFile;

        const [error, createZaptoDto] = CreateZapatosDTO.Start(body, file)
        if (error) return res.json({ error })

        this.ZapatosService.createZapatos(createZaptoDto!, body.Admin)
            .then(newZapato => res.status(201).json(newZapato))
            .catch(error => this.handleError(error, res))
    }

    GetZapatos = (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.query

        const [error, paginationDto] = PaginationDto.Start(+page, +limit)
        if (error) return res.status(400).json({ error })

        this.ZapatosService.GetZapatos(paginationDto!)
            .then(zapatos => res.json(zapatos))
            .catch(error => this.handleError(error, res))
    }


    DeleteZapato = (req: Request, res: Response) => {
        const { id } = req.params

        if (!id) res.status(400).json({ error: 'El id es requerido' })

        this.ZapatosService.DeleteZaptosId(id)
            .then(message => res.json(message))
            .catch(error => this.handleError(error, res))
    }
}