import mongoose from "mongoose";
import { envs } from "../../../configs/envs";

const AdminSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    claveAdministrativa:{
        type: String,
        required: true
    }
})

export const AdminModel = mongoose.model('Admin', AdminSchema)