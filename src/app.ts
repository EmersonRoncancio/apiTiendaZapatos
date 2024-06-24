import { envs } from "./configs/envs"
import { AppRoutes } from "./presentacion/routes"
import { Sever } from "./presentacion/server"


(() => {
    main()
})()

function main() {
    const server = new Sever({
        port: envs.PORT,
        routes: AppRoutes.routes
    })

    server.start()
}