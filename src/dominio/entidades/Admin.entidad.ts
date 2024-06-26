import { CustomError } from "../errors/CustmoErrors"

export class AdminEntidad {

    constructor(
        public id: string,
        public nombre: string,
        public apellido: string,
        public usuario: string,
        public contraseña: string,
    ) { }

    static fromObject(options: { [key: string]: any }) {
        const { id, _id, nombre, apellido, contraseña, usuario } = options

        if (!id && !_id) throw CustomError.badRequest('El id es requerido')
        if(!nombre) throw CustomError.badRequest('El Nombre es requerido')
        if(!apellido) throw CustomError.badRequest('El Apellido es requerido')
        if(!contraseña) throw CustomError.badRequest('La Contraseña es requrida')
        if(!usuario) throw CustomError.badRequest('El Usuario es requerido')

        const enditad = new AdminEntidad(id || _id, nombre, apellido, contraseña, usuario)

        return enditad
    }
}