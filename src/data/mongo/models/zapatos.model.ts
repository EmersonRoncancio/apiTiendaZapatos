import mongoose, { Schema } from "mongoose";
import { Tallas } from "../../../dominio/types/enums";
import { ImagaDataType } from "../../../dominio/types/interfaces";

const imageDataTypeSchema = new Schema<ImagaDataType>({
    url: { type: String, required: true },
    public_id: { type: String, required: true }
});

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
        type: [imageDataTypeSchema],
        required: true
    },
    Admin: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
})

export const ZapatosModel = mongoose.model('zapato', zapatosSchema)