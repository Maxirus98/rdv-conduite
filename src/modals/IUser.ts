import { Users } from "./Users";

export interface IUser {
    id: number;
    type: Users;
    name: string;
    surname: string;
    address: string;
    phone: string;
    email: string;
}