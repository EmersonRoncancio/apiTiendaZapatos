import mongoose from "mongoose";

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
})

export const AdminModel = mongoose.model('Admin', AdminSchema)