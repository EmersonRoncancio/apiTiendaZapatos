import { get } from "env-var";
import 'dotenv/config'

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    URL_DB: get('URL_DB').required().asString()
}