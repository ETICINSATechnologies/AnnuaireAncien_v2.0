import {Position} from './Position';

export interface MemberPosition extends Position {
    year: string // number when keros-back fixed
    isBoard: boolean

    [property: string]: string | boolean | number | object
}