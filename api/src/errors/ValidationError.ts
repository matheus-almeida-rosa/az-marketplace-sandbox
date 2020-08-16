import { ValidationError as vError } from "class-validator";

export default class ValidationError extends Error {

    validation: string[];

    constructor(error: string);

    constructor(modelErrors: vError[]);

    constructor(obj: any) {
        super()

        if (obj && Array.isArray(obj) && obj.length > 0) {
            const errors = obj.map(x => Object.values(x.constraints));
            const errorFlatten = [].concat(...errors);
            this.validation = errorFlatten;
        } else {
            this.message = obj;
        }
    }
}