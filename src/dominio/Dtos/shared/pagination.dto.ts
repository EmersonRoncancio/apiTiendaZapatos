
export class PaginationDto {

    private constructor(
        public readonly page: number,
        public readonly limit: number
    ) { }


    static Start(page: number = 1, limit: number = 10): [string?, PaginationDto?] {

        if (isNaN(page) || isNaN(limit)) return ['Paginacion o limite invalido', undefined]
        if (page < 1) return ['La paginacion tiene que ser mayor a 0', undefined]
        if (page < 1) return ['El limite tiene que ser mayor a 0', undefined]

        return [undefined, new PaginationDto(page, limit)]
    }
}