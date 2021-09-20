import { Users } from "./Users";

export interface IUser {
    id: number;
    type: Users;
    fullName: string;
    address: string;
    phone: string;
    email: string;
}