import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../configs/jwt.adapter";
import { envs } from "../../configs/envs";
import { AdminModel } from "../../data/mongo/models/admin.model";
import { AdminEntidad } from "../../dominio/entidades/Admin.entidad";


export class AuthPanelMiddleware {

    static async validateAdmin(req: Request, res: Response, next: NextFunction) {
        const Authorization = req.header('Authorization')
        if (!Authorization) return res.status(401).json({ error: 'Se requiere el token de autenticacion' })
        if (!Authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Bearer Token Invalido' })

        const token = Authorization.split(' ')[1] || ''

        try {
            const payload = await JwtAdapter.validateToken<{ id: string }>(token, envs.JWT_VALIDATE)
            if (!payload) return res.status(401).json({ error: 'Token Invalido' })

            const Admin = await AdminModel.findById(payload.id)
            if(!Admin) return res.status(401).json({error: 'Token Invalaido - Admin'})
            
            req.body.Admin = AdminEntidad.fromObject(Admin)

            next()
        } catch (error) {
            res.status(500).json({error: 'Internal Server Error'})
        }
    }

}