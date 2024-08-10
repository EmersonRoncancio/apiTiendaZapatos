import { Tallas } from "../../types/enums";

export class UpdateZapatoDTO {

    private constructor(
        public readonly nombre: string,
        public readonly marca: string,
        public readonly talla: Tallas,
        public readonly color: string,
        public readonly precio: number,
        public readonly stock: number,
        public readonly imagesAdd: string[],
        public readonly imagesDelete: string[]
    ) { }

    static start(options: { [key: string]: any }, imagen?: any): [string?, UpdateZapatoDTO?] {

        const { nombre, marca, talla, color, precio, stock, imagesDelete } = options
        let filesArrDelete: string[] = []
        let filesArrAdd = []

        if (!nombre) return ['El nombre es requerido', undefined]
        if (!marca) return ['La marca es requerida', undefined]
        if (!talla) return ['La marca es requerida', undefined]
        if (isNaN(talla)) return ['La talla es invalida', undefined]
        if (!Object.values(Tallas).includes(Number(talla))) {
            return ['La talla es invalida', undefined]
        }
        if (!color) return ['El color es requerido', undefined]
        if (!precio) return ['El precio es requerido', undefined]
        if (isNaN(precio)) return ['La precio es invalido', undefined]
        if (!stock) return ['El Stock es requerido', undefined]
        if (isNaN(stock)) return ['El Stock es invalido', undefined]
        if (Array.isArray(imagen)) {
            filesArrAdd = imagen.map((files) => {
                if (typeof (files) !== 'string') return files.tempFilePath
            })
        }
        if (!Array.isArray(imagesDelete)) {
            filesArrDelete.push(imagesDelete)
        }
        if (Array.isArray(imagesDelete)) {
            filesArrDelete = imagesDelete
        }

        return [undefined, new UpdateZapatoDTO(nombre, marca, Number(talla), color, Number(precio), Number(stock), filesArrAdd as string[], filesArrDelete as string[])]
    }
}