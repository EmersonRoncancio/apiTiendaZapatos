import bcrypt from 'bcryptjs'

export const bryptAdapter = {
    hash: (contraseña: string) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(contraseña, salt);

        return hash
    }
}