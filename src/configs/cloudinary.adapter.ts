import { v2 as cloudinary } from 'cloudinary';
import { envs } from './envs';

cloudinary.config({
    cloud_name: envs.CLOUD_NAME_CLOUDINARY,
    api_key: envs.API_KEY_CLOUDINARY,
    api_secret: envs.API_SECRET_CLOUDINARY,
    secure: true
});

export const cloudinaryAdapter = {
    uploadImageArr: async (filePath: string | string[]) => {

        if (Array.isArray(filePath)) {
            const filesArr = filePath.map((file) => {
                return cloudinary.uploader.upload(file, {
                    folder: 'Zapatos'
                })
            })

            return filesArr
        }
    },
    deleteImageArr: async (publicId: string | string[]) => {

        if (Array.isArray(publicId)) {
            const filesArr = publicId.map((id) => {
                return cloudinary.uploader.destroy(id)
            })

            return filesArr
        }
    }
}