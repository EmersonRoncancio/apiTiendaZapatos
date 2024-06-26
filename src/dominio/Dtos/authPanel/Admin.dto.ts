import { envs } from "../../../configs/envs"

export class AdminDTO {

    private constructor(
        public readonly nombre: string,
        public readonly apellido: string,
        public readonly usuario: string,
        public readonly contraseña: string,
        public readonly claveAdministrativa: string
    ) { }

    static Create(options: { [key: string]: any }): [string?, AdminDTO?]{

        const { nombre, apellido, usuario, contraseña, claveAdministrativa} = options

        if(!nombre) return ['El nombre es requerido', undefined]
        if(!apellido) return ['El apellido es requerido', undefined]
        if(!usuario) return ['El usuario es requerido', undefined]
        if(!contraseña) return ['La contraseña es requerida', undefined]
        if(contraseña.length < 8) return ['La contraseña tiene que ser mayor a 8 digitos', undefined]
        if(!claveAdministrativa) return ['La clave administrativa es requerida', undefined]
        if(claveAdministrativa !== envs.CLAVE_ADMINISTRATIVA) return ['La clave administrativa es invalida']
                
        return [undefined, new AdminDTO(nombre, apellido, usuario, contraseña, claveAdministrativa)]
    }

}