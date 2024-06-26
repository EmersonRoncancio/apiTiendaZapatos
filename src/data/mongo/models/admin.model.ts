import mongoose from "mongoose";
import { envs } from "../../../configs/envs";

const AdminSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    apellido: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true,
        unique: true
    },
    contraseña: {
        type: String,
        require: true
    },
    claveAdministrativa:{
        type: String,
        require: true
    }
})

export const AdminModel = mongoose.model('Admin', AdminSchema)