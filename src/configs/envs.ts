import { get } from "env-var";
import 'dotenv/config'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    URL_DB: get('URL_DB').required().asString(),
    CLAVE_ADMINISTRATIVA: get('CLAVE_ADMINISTRATIVA').required().asString(),
    JWT_VALIDATE: get('JWT_VALIDATE').required().asString(),
    CLOUD_NAME_CLOUDINARY: get('CLOUD_NAME_CLOUDINARY').required().asString(),
    API_KEY_CLOUDINARY: get('API_KEY_CLOUDINARY').required().asString(),
    API_SECRET_CLOUDINARY: get('API_SECRET_CLOUDINARY').required().asString()
}