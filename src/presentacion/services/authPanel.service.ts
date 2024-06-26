import { bryptAdapter } from "../../configs/bcrypt.adapeter";
import { AdminModel } from "../../data/mongo/models/admin.model";
import { AdminDTO } from "../../dominio/Dtos/authPanel/Admin.dto";
import { AdminEntidad } from "../../dominio/entidades/Admin.entidad";
import { CustomError } from "../../dominio/errors/CustmoErrors";

export class AuthPanelService {

    public async RegisterAdmin(RegisterDto: AdminDTO) {

        const userValidate = await AdminModel.findOne({ usuario: RegisterDto.usuario })
        if (userValidate) throw CustomError.badRequest('El usuario ya exite')

        try {

            const contraseñaEcriptada = bryptAdapter.hash(RegisterDto.contraseña)

            const newAdmin = new AdminModel({
                nombre: RegisterDto.nombre,
                apellido: RegisterDto.apellido,
                usuario: RegisterDto.usuario,
                contraseña: contraseñaEcriptada
            })
            newAdmin.save()

            const newAdminEtity = AdminEntidad.fromObject(newAdmin)

            return newAdminEtity
        } catch (error) {
            console.log(error)
            throw CustomError.internalServer('Internal Server Error')
        }
    }

}