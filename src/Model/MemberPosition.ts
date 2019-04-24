import {Position} from './Position';

export interface MemberPosition extends Position {
    year: number // set to string if errors

    [property: string]: string | boolean | number | object
}