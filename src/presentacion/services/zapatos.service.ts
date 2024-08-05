import { cloudinaryAdapter } from "../../configs/cloudinary.adapter";
import { Validates } from "../../configs/validates";
import { ZapatosModel } from "../../data/mongo/models/zapatos.model";
import { PaginationDto } from "../../dominio/Dtos/shared/pagination.dto";
import { CreateZapatosDTO } from "../../dominio/Dtos/zapatos/createZapatos.dto";
import { UpdateZapatoDTO } from "../../dominio/Dtos/zapatos/updateZapatos.dto";
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

    public async GetZapatos(PaginationDto: PaginationDto) {
        const { page, limit } = PaginationDto

        try {
            const total = await ZapatosModel.countDocuments()
            const zapatos = await ZapatosModel.find()
                .skip((page - 1) * limit)
                .limit(limit)

            const zaptosPaginados = zapatos.map((zapato) => {
                return ZapatosEntidad.fromObject(zapato)
            })

            return {
                Total: total,
                Page: page,
                Limit: limit,
                nextPage: (page * limit) < total,
                Zapatos: zaptosPaginados
            }
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }

    public async DeleteZaptosId(id: string) {

        if (!Validates.MongoId(id)) throw CustomError.badRequest('Id Invalida')
        const zapatoExist = await ZapatosModel.findById(id)
        if (!zapatoExist) throw CustomError.badRequest('El zapato no existe')

        try {

            await ZapatosModel.findByIdAndDelete(id)

            const arrPublicId = zapatoExist.imagen.map((image) => {
                return image.public_id
            })
            await cloudinaryAdapter.deleteImageArr(arrPublicId)
            // const zapatosMongo = await ZapatosModel.find()

            // const zapatosEntidad = zapatosMongo.map((zapato) => {
            //     return ZapatosEntidad.fromObject(zapato)
            // })

            return {
                message: 'Se ha eliminado exitosamente',
            }
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }

    public async UpdateZapatos(UpdateDto: UpdateZapatoDTO, id: string, Admin: AdminEntidad) {

        if (!Validates.MongoId(id)) throw CustomError.badRequest('Id Invalida')
        const valideteZapto = await ZapatosModel.findById(id)
        if (!valideteZapto) throw CustomError.badRequest('El zapato no existe')

        try {

            const arrPublicId = valideteZapto.imagen.map((image) => {
                return image.public_id
            })
            await cloudinaryAdapter.deleteImageArr(arrPublicId)

            const urls = await cloudinaryAdapter.uploadImageArr(UpdateDto.imagen)
            UpdateDto.imagen.forEach(async (filePath) => {
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

            await ZapatosModel.findByIdAndUpdate(id, {
                nombre: UpdateDto.nombre,
                marca: UpdateDto.marca,
                talla: UpdateDto.talla,
                color: UpdateDto.color,
                precio: UpdateDto.precio,
                stock: UpdateDto.stock,
                imagen: imagesUrls,
                Admin: Admin.id
            })

            const updatedZapatoMongo = await ZapatosModel.findById(id)
            const updatedZapato = ZapatosEntidad.fromObject(updatedZapatoMongo!)

            return {
                message: 'Se actualizo con exito',
                zapato: updatedZapato
            }
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }
}