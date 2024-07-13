import { cloudinaryAdapter } from "../../configs/cloudinary.adapter";
import { ZapatosModel } from "../../data/mongo/models/zapatos.model";
import { CreateZapatosDTO } from "../../dominio/Dtos/zapatos/createZapatos.dto";
import { AdminEntidad } from "../../dominio/entidades/Admin.entidad";
import { ZapatosEntidad } from "../../dominio/entidades/Zapatos.entidad";
import { CustomError } from "../../dominio/errors/CustmoErrors";

export class ZapatosService {

    public async createZapatos(creatDto: CreateZapatosDTO, Admin: AdminEntidad) {

        const validateNombre = await ZapatosModel.findOne({ nombre: creatDto.nombre })
        if (validateNombre) throw CustomError.badRequest('El nombre del zapato ya existe')

        try {
            const urls = await cloudinaryAdapter.uploadImageArr(creatDto.imagen)
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
}