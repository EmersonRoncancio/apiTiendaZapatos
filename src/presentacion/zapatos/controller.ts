import { CustomError } from "../../dominio/errors/CustmoErrors"
import { Request, Response } from 'express'
import { UploadedFile } from "express-fileupload";
import { cloudinaryAdapter } from "../../configs/cloudinary.adapter";
import { CreateZapatosDTO } from "../../dominio/Dtos/zapatos/createZapatos.dto";

export class ZapatosController {

    constructor() { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

        return res.status(500).json({ error: "Internal Server Error" })
    }

    CreateZapatos = (req: Request, res: Response) => {

        const body = req.body

        if (!req.files?.image || Object.keys(req.files).length === 0) {
            return res.status(400).json({error:'Ningun archivo fue cargado'});
        }

        const file = req.files.image as UploadedFile;

        const [error, createZaptoDto] = CreateZapatosDTO.Start(body,file)
        if(error) return res.json({error})

        cloudinaryAdapter.uploadImageArr(createZaptoDto?.imagen!)
            .then(async(image) =>{
                const result = await Promise.all(image!)
                console.log(result)
            })

        res.json(createZaptoDto)
    }

}