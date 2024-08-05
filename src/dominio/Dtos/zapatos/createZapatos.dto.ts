
import { Tallas } from "../../types/enums";

export class CreateZapatosDTO {

    private constructor(
        public readonly nombre: string,
        public readonly marca: string,
        public readonly talla: Tallas,
        public readonly color: string,
        public readonly precio: number,
        public readonly stock: number,
        public readonly imagen: string[],
    ) { }

    static Start(options: { [key: string]: any }, imagen: any): [string?, CreateZapatosDTO?] {
        const {nombre, marca, talla, color, precio, stock} = options
        let filesArr = []

        if(!nombre) return ['El nombre es requerido', undefined]
        if(!marca) return ['La marca es requerida', undefined]
        if(!talla) return ['La marca es requerida', undefined]
        if(isNaN(talla)) return ['La talla es invalida', undefined]
        if(!Object.values(Tallas).includes(Number(talla))){
            return ['La talla es invalida', undefined]
        }
        if(!color) return ['El color es requerido', undefined]
        if(!precio) return ['El precio es requerido', undefined]
        if(isNaN(precio)) return ['La precio es invalido', undefined]
        if(!stock) return ['El Stock es requerido', undefined]
        if(isNaN(stock)) return ['El Stock es invalido', undefined]
        if(!Array.isArray(imagen)) return ['Se requiere mas de una imagen', undefined]
        if(Array.isArray(imagen)){
            filesArr = imagen.map((files)=>{
               return files.tempFilePath
           })
       }

        return [undefined, new CreateZapatosDTO(nombre, marca, Number(talla), color, Number(precio), Number(stock), filesArr)]
    }

}