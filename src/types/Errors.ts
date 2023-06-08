export interface Field { field: string, message: string }

export class FormError {
    constructor(
        readonly message: string,
        readonly status: '400' | '401' = '400',
        public fields: Field[] = []
    ) { };
}