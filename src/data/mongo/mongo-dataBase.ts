import mongoose from "mongoose";

interface OptionConction {
    urlDb: string
}

export class MongoDataBase {

    static async Connection(options: OptionConction) {

        const { urlDb } = options

        try {

            await mongoose.connect(urlDb)

            console.log('Conexion exitosa')
        } catch (error) {
            throw error
        }
    }

    static async disconectec() {
        await mongoose.disconnect()
    }

}