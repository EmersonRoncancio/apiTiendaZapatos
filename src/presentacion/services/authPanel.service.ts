import { bryptAdapter } from "../../configs/bcrypt.adapeter";
import { envs } from "../../configs/envs";
import { JwtAdapter } from "../../configs/jwt.adapter";
import { AdminModel } from "../../data/mongo/models/admin.model";
import { LoginAdminDTO } from "../../dominio/Dtos/authPanel/Login.dto";
import { RegisterAdminDTO } from "../../dominio/Dtos/authPanel/Register.dto";
import { AdminEntidad } from "../../dominio/entidades/Admin.entidad";
import { CustomError } from "../../dominio/errors/CustmoErrors";

export class AuthPanelService {

    public async RegisterAdmin(RegisterDto: RegisterAdminDTO) {

        const userValidate = await AdminModel.findOne({ usuario: RegisterDto.usuario })
        if (userValidate) throw CustomError.badRequest('El usuario ya exite')

        try {

            const contraseñaEcriptada = bryptAdapter.hash(RegisterDto.contraseña)
            const claveAdministrativaHash = bryptAdapter.hash(RegisterDto.claveAdministrativa)

            const newAdmin = new AdminModel({
                nombre: RegisterDto.nombre,
                apellido: RegisterDto.apellido,
                usuario: RegisterDto.usuario,
                contraseña: contraseñaEcriptada,
                claveAdministrativa: claveAdministrativaHash
            })
            newAdmin.save()

            const newAdminEtity = AdminEntidad.fromObject(newAdmin)

            return newAdminEtity
        } catch (error) {
            console.log(error)
            throw CustomError.internalServer('Internal Server Error')
        }
    }

    public async LoginAdmin(LoginDto: LoginAdminDTO) {

        const validateUser = await AdminModel.findOne({ usuario: LoginDto.usuario })
        if (!validateUser) throw CustomError.badRequest('El usuario o contraseña son incorrecto')

        const validateContraseña = bryptAdapter.compare(LoginDto.contraseña, validateUser?.contraseña!)
        if (!validateContraseña) throw CustomError.badRequest('El usuario o contraseña son incorrectos')

        const { contraseña, claveAdministrativa, ...AdminCheck } = AdminEntidad.fromObject(validateUser)

        const token = await JwtAdapter.generate({
            id: validateUser.id,
            usuario: validateUser.usuario,
        }, envs.JWT_VALIDATE)
        if (!token) throw CustomError.internalServer('Error al generar token')

        return {
            token: token,
            Admin: AdminCheck,
        }
    }

    public async TokenValidate(token: string) {
        const tokenvalidate = await JwtAdapter.validateToken(token, envs.JWT_VALIDATE)
        if (!tokenvalidate) throw CustomError.notAuthorized('Token no autorizado')

        const { usuario } = tokenvalidate as { usuario: string }
        if(!usuario) throw CustomError.badRequest('El usuario no se encuentra en el token')

        const AdminValidate = await AdminModel.findOne({usuario: usuario})
        if(!AdminValidate) throw CustomError.notAuthorized('El usuario no existe')

        return {
            status: 'Usuario Verificado'
        }
    }

}