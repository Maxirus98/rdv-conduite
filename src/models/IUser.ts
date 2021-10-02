import { Users } from "./Users";

export interface IUser {
    id: number;
    student: boolean;
    fullName: string;
    address: string;
    phone: string;
    email: string;
}