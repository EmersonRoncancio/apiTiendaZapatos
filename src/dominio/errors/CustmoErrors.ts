

export class CustomError extends Error {

    constructor(
        public readonly statusCode: number,
        public readonly message: string
    ) {
        super(message)
    }

    static badRequest(message: string) { // Solicitud Incorrecta
        return new CustomError(400, message)
    }

    static notAuthorized(message: string) { // No Autorizado
        return new CustomError(401, message)
    }

    static forBidden(message: string){ // Restringido u prohibido
        return new CustomError(403,message)
    }

    static NotFound(message: string){ // No econtrado
        return new CustomError(404,message)
    }

    static internalServer(message: string){ // Error no esperado
        return new CustomError(500,message)
    }
}