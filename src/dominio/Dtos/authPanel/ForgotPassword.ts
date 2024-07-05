import { envs } from "../../../configs/envs"

export class ForgotPasswordDTO {

    private constructor(
        public readonly usuario: string,
        public readonly nuevaContraseña: string,
        public readonly claveAdministrativa: string
    ) { }

    static start(options: { [key: string]: any }): [string?, ForgotPasswordDTO?] {

        const { usuario, nuevaContraseña, claveAdministrativa } = options

        if (!usuario) return ['El usuario es requerido', undefined]
        if (!nuevaContraseña) return ['La contraseña nueva es requerida', undefined]
        if (nuevaContraseña.length < 8 || nuevaContraseña.length > 20) {
            return ['La contraseña tiene que ser mayor 8 digitos y menor a 20 digitos', undefined]
        }
        if (!claveAdministrativa) return ['La clave administrativa es requerida', undefined]
        if (claveAdministrativa !== envs.CLAVE_ADMINISTRATIVA) {
            return ['La clave administrativa es invalida', undefined]
        }

        return [undefined, new ForgotPasswordDTO(usuario, nuevaContraseña, claveAdministrativa)]
    }
}