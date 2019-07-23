import { Address, AddressUpdate } from "./Address";
import { Department } from "./Department";
import { MemberPosition } from "./MemberPosition";
import { Gender } from "./Gender";

interface MemberGeneric {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  positions: MemberPosition[];
  company?: string;
  photo?: string;
}

export interface MemberRead extends MemberGeneric {
  gender: string;
  department?: string;
  latestPosition: string;
  latestYear: string;
  company: string;

  [property: string]: any;
}

interface MemberUpdate extends MemberGeneric {
  username: string;
  password?: string;
  genderId: number;
  birthday: string;
  schoolYear: number;
  address: AddressUpdate;
  departmentId?: number;
  positions: Array<any>;
}

export interface MemberInterface extends MemberGeneric {
  username: string;
  birthday: string;
  gender: Gender;
  schoolYear: number;
  address: Address;
  department?: Department;
}

export class Member implements MemberInterface {
  id: number;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  birthday: string;
  schoolYear: number;
  telephone: string;
  address: Address;
  department?: Department;
  positions: MemberPosition[];
  photo?: string;
  company: string;
  [property: string]: any;

  constructor(memberInterface: MemberInterface) {
    this.id = memberInterface.id;
    this.username = memberInterface.username;
    this.firstName = memberInterface.firstName;
    this.lastName = memberInterface.lastName;
    this.email = memberInterface.email;
    this.gender = memberInterface.gender;
    this.birthday = memberInterface.birthday;
    this.schoolYear = memberInterface.schoolYear;
    this.telephone = memberInterface.telephone;
    this.address = memberInterface.address;
    this.department = memberInterface.department;
    this.positions = memberInterface.positions;
    this.company = memberInterface.company ? memberInterface.company : "";
    if (memberInterface.photo) this.photo = memberInterface.photo;
  }

  /**
   * Function used to get the useful properties of a member to display
   * @returns {MemberRead}
   */
  read(): MemberRead {
    let latestPosition = this.positions.reduce(
      (currentPosition, latestPosition) =>
        currentPosition.year > latestPosition.year
          ? currentPosition
          : latestPosition,
      {} as MemberPosition
    );

    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender.label,
      // insert spaces after '+33' and every two digits from the end of the string
      telephone: this.telephone.replace(/(\+33)|\d(?=(\d{2})+$)/g, "$& "),
      department: this.department ? this.department.name : "",
      positions: this.positions,
      company: this.company,
      latestPosition: latestPosition.label,
      latestYear: latestPosition.year
    } as MemberRead;
  }

  /**
   * Return an object with the correct format for updating a member
   * @returns {MemberUpdate}
   */
  update(): MemberUpdate {
    // remove the property 'country' of address and replace it by the property 'countryId'
    let { country, ...address } = {
      ...this.address,
      countryId: this.address.country.id
    };

    return Object.assign(
      {},
      {
        id: this.id,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        genderId: this.gender.id,
        birthday: this.birthday,
        schoolYear: this.schoolYear,
        // remove whitespace, if there are, in the telephone string
        telephone: this.telephone.replace(/(\s)/g, ""),
        address: address,
        company: this.company,
        positions: this.positions.map(position => {
          // not necessary when year will be a integer in keros-back
          return { ...position, year: parseInt(position.year) };
        })
      },
      this.department ? { departmentId: this.department.id } : {},
      this.password ? { password: this.password } : {}
    ) as MemberUpdate;
  }
}

export let defaultMember = new Member({
  id: 0,
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  birthday: "1990-02-05",
  schoolYear: 0,
  gender: { id: 0, label: "" },
  address: {
    id: 0,
    line1: "",
    city: "",
    country: { id: 0, label: "" },
    postalCode: 0
  },
  department: { id: 0, name: "", label: "" },
  positions: []
} as MemberInterface);
