import jwt from 'jsonwebtoken'

export const JwtAdapter = {
    generate: async(payload: any, llave: string, duration = "3h") => {
        return new Promise((resolve) => {
            jwt.sign(payload, llave, { expiresIn: duration }, (error, token) => {
                if (error) return resolve(null)

                resolve(token)
            })
        })
    }
}