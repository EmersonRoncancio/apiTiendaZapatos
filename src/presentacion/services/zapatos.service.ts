import { cloudinaryAdapter } from "../../configs/cloudinary.adapter";
import { ZapatosModel } from "../../data/mongo/models/zapatos.model";
import { PaginationDto } from "../../dominio/Dtos/shared/pagination.dto";
import { CreateZapatosDTO } from "../../dominio/Dtos/zapatos/createZapatos.dto";
import { AdminEntidad } from "../../dominio/entidades/Admin.entidad";
import { ZapatosEntidad } from "../../dominio/entidades/Zapatos.entidad";
import { CustomError } from "../../dominio/errors/CustmoErrors";
import fs from 'fs-extra'

export class ZapatosService {

    public async createZapatos(creatDto: CreateZapatosDTO, Admin: AdminEntidad) {

        const validateNombre = await ZapatosModel.findOne({ nombre: creatDto.nombre })
        if (validateNombre) throw CustomError.badRequest('El nombre del zapato ya existe')

        try {
            const urls = await cloudinaryAdapter.uploadImageArr(creatDto.imagen)
            creatDto.imagen.forEach(async (filePath) => {
                const exists = await fs.pathExists(filePath);
                if (exists) {
                    await fs.unlink(filePath);
                }
            })
            const images = await Promise.all(urls!)
            const imagesUrls = images.map((image) => {
                return {
                    url: image.url,
                    public_id: image.public_id
                }
            })

            const newZapato = new ZapatosModel({
                nombre: creatDto.nombre,
                marca: creatDto.marca,
                talla: creatDto.talla,
                color: creatDto.color,
                precio: creatDto.precio,
                stock: creatDto.stock,
                imagen: imagesUrls,
                Admin: Admin.id
            })
            newZapato.save()

            const zaptoEntidad = ZapatosEntidad.fromObject(newZapato)

            return zaptoEntidad
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }

    public async GetZapatos(PaginationDto: PaginationDto){
        const {page, limit} = PaginationDto

        try {
            const total = await ZapatosModel.countDocuments()
            const zapatos = await ZapatosModel.find()
                .skip((page-1)*limit)
                .limit(limit)

            const zaptosPaginados = zapatos.map((zapato)=>{
                return ZapatosEntidad.fromObject(zapato)
            })

            return {
                Total: total,
                Page: page,
                Limit: limit,
                Zapatos: zaptosPaginados
            }
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }
}