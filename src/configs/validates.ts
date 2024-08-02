import mongoose from "mongoose"


export const Validates = {
    MongoId: (id: string) => {
        return mongoose.isValidObjectId(id)
    }
}