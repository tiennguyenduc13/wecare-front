export interface IProfile {
  userId: string;
  email: string;
  name: string;
  cellPhone: string;
  dateOfBirth: Date;
  gender: string;
  eventDate: Date;
}
export class Profile implements IProfile {
  constructor(
    public _id: string,
    public userId: string,
    public email: string,
    public name: string,
    public cellPhone: string,
    public dateOfBirth: Date,
    public gender: string,
    public eventDate: Date
  ) {}
}
