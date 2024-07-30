import { CustomError } from "../errors/CustmoErrors";
import { Tallas } from "../types/enums";

export class ZapatosEntidad {

    constructor(
        public readonly id: string,
        public readonly nombre: string,
        public readonly marca: string,
        public readonly talla: Tallas,
        public readonly color: string,
        public readonly precio: number,
        public readonly stock: number,
        public readonly imagen: string[],
    ) { }

    static fromObject(options: { [key: string]: any }) {
        const { id, _id, nombre, marca, talla, color, precio, stock, imagen } = options

        if (!id && !_id) throw CustomError.badRequest('El id es requerido')
        if (!nombre) throw CustomError.badRequest('El nombre es requerido')
        if (!marca) throw CustomError.badRequest('La marca es requerida')
        if (!talla) throw CustomError.badRequest('La talla es requerida')
        if (!color) throw CustomError.badRequest('El color es requerido')
        if (isNaN(precio)) throw CustomError.badRequest('Precio Invalido')
        if (isNaN(stock)) throw CustomError.badRequest('El stock es invalido')
        if (!imagen) throw CustomError.badRequest('Las imagenes son requeridas')

        const urls = imagen.map((imagen: any) => {
            return imagen.url
        })

        const entidad = new ZapatosEntidad(id || _id, nombre, marca, talla, color, precio, stock, urls)

        return entidad
    }
}