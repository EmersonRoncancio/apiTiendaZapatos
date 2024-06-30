
export class LoginAdminDTO {

    private constructor(
        public readonly usuario: string,
        public readonly contraseña: string
    ) { }

    static start(options: { [key: string]: any }): [string?, LoginAdminDTO?] {
        const { usuario, contraseña } = options

        if(!usuario) return ['El usuario es requerido', undefined]
        if(!contraseña) return ['La contraseña es requerida', undefined]
        if(contraseña.length < 6 || contraseña.length > 20) return ['La contraseña es invalida', undefined]

        return [undefined, new LoginAdminDTO(usuario, contraseña)]
    }
}