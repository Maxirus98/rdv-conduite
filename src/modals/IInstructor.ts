import { IUser } from "./IUser";

export interface IInstructor extends IUser {
    manualDriver: boolean;
    yearsOfExperience: number;
}