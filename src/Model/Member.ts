import {MemberPosition} from './MemberPosition';

interface MemberGeneric {
    firstName: string
    lastName: string
    username: string
    email: string
    gender: string
    telephone: string
    gradeYear?: number
    birthday: string
    facebook: string
    linkedin: string
    positions: MemberPosition[]
}

export interface MemberRead extends MemberGeneric {
    id: number
    latestPosition: string
    latestYear: number

    [property: string]: any
}

interface MemberUpdate extends MemberGeneric {
    password?: string
}

export interface MemberInterface extends MemberGeneric {
    id: number
    photo?: string
}

export class Member implements MemberInterface {
    id: number;
    password?: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    username: string;
    gradeYear?: number;
    birthday: string;
    telephone: string;
    facebook: string;
    linkedin: string;
    positions: MemberPosition[];
    photo?: string;
    [property: string]: any;

    constructor(memberInterface: MemberInterface) {
        this.id = memberInterface.id;
        this.firstName = memberInterface.firstName.charAt(0).toUpperCase() + memberInterface.firstName.slice(1);
        this.lastName = memberInterface.lastName.charAt(0).toUpperCase() + memberInterface.lastName.slice(1);
        this.email = memberInterface.email;
        this.gender = memberInterface.gender? 
            memberInterface.gender.charAt(0).toUpperCase()+memberInterface.gender.slice(1)  
            : 
            'Choisir une option';
        this.birthday = memberInterface.birthday? memberInterface.birthday.split(' ')[0] : '';
        this.telephone = memberInterface.telephone? memberInterface.telephone.split('.')[0]:'';
        this.facebook = memberInterface.facebook;
        this.linkedin = memberInterface.linkedin;
        this.positions = memberInterface.positions;
        this.username = memberInterface.username;
        if (memberInterface.photo) this.photo = memberInterface.photo;
        if (memberInterface.gradeYear) this.gradeYear=memberInterface.gradeYear;
    }

    /**
     * Function used to get the useful properties of a member to display
     * @returns {MemberRead}
     */
    read(): MemberRead {
        let latestPosition = this.positions.reduce((currentPosition, latestPosition) =>
            (currentPosition.year > latestPosition.year) ? currentPosition : latestPosition, {} as MemberPosition
        );

        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            gender: this.gender,
            gradeYear: this.gradeYear,
            birthday: this.birthday,
            telephone: this.telephone,
            facebook: this.facebook ?
                this.facebook.match('^https?://') ? this.facebook : `https://${this.facebook}` : '',
            linkedin: this.linkedin ?
                this.linkedin.match('^https?://') ? this.linkedin : `https://${this.linkedin}` : '',
            positions: this.positions,
            latestPosition: latestPosition.label,
            latestYear: latestPosition.year
        } as MemberRead;
    }

    /**
     * Return an object with the correct format for updating a member
     * @returns {MemberUpdate}
     */
    update(): MemberUpdate {
        return Object.assign({}, {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
                gender: this.gender===('Choisir une option')? 'Autre':this.gender,
                birthday: this.birthday,
                gradeYear: this.gradeYear,
                telephone: this.telephone,
                positions: this.positions,
                username: this.username
            },
            this.password ? {password: this.password} : {},
            this.facebook ? {
                facebook: this.facebook.match('^https?://') ? this.facebook : `https://${this.facebook}`
            } : {},
            this.linkedin ? {
                linkedin: this.linkedin.match('^https?://') ? this.linkedin : `https://${this.linkedin}`
            } : {},
        ) as MemberUpdate
    }
}

export let defaultMember = new Member({
    id: 0,
    firstName: '',
    lastName: '',
    username:'',
    email: '',
    telephone: '',
    birthday: '',
    facebook: '',
    linkedin: '',
    gender: '',
    positions: []
} as MemberInterface);