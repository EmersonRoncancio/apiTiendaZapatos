import jwt from 'jsonwebtoken'

export const JwtAdapter = {
    generate: async(payload: any, llave: string, duration = "3h") => {
        return new Promise((resolve) => {
            jwt.sign(payload, llave, { expiresIn: duration }, (error, token) => {
                if (error) return resolve(null)

                resolve(token)
            })
        })
    },
    validateToken:<T>(token: string, llave: string): Promise<T|null> => {

        return new Promise((resolve) => {
            jwt.verify(token, llave , (error, decoded)=>{

                if(error) return resolve(null)

                resolve(decoded as T)
            })
        })
    }
}