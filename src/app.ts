import { envs } from "./configs/envs"
import { MongoDataBase } from "./data"
import { AppRoutes } from "./presentacion/routes"
import { Sever } from "./presentacion/server"


(async () => {
    main()
})()

async function main() {
    const server = new Sever({
        port: envs.PORT,
        routes: AppRoutes.routes
    })

    await MongoDataBase.Connection({
        urlDb: envs.URL_DB
    })

    server.start()
}