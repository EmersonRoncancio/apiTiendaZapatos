import mongoose, { Schema } from "mongoose";

enum Tallas {
    T34 = 34,
    T35 = 35,
    T36 = 36,
    T37 = 37,
    T38 = 38,
    T39 = 39,
    T40 = 40,
    T41 = 41,
    T42 = 42,
    T43 = 43,
    T44 = 44,
    T45 = 45,
    T46 = 46
}

const zapatosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        requiredd: true
    },
    talla: {
        type: Number,
        enum: Tallas,
        required: true
    },
    color: {
        type: String,
        requiredd: true
    },
    precio: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    imagen: {
        type: String || [String],
        required: true
    },
    Admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true 
    }
})

export const ZapatosModel = mongoose.model('zapato', zapatosSchema)