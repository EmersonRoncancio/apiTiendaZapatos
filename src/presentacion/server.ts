import express, { Router } from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'

interface Options {
    port: number,
    routes: Router
}

export class Sever {

    private readonly app = express()
    private serverListener: any
    private readonly port: number
    private readonly routes: Router

    constructor(options: Options) {
        const { port, routes } = options
        this.port = port
        this.routes = routes
    }

    async start() {

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors())
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: './uploads'  // Directorio temporal para archivos subidos
          }))

        this.app.use(this.routes)

        this.serverListener = this.app.listen(this.port, () => {
            console.log(`El servidor corriendo en el puerto ${this.port}`)
        })
    }

    public close() {
        this.serverListener?.close();
    }
}