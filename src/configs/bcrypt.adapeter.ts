import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const bryptAdapter = {
    hash: (contraseña: string) => {
        const salt = genSaltSync();
        const hash = hashSync(contraseña, salt);

        return hash
    },
    compare: (contraseña: string, hash: string)=>{
        const compare = compareSync(contraseña, hash)

        return compare
    }
}