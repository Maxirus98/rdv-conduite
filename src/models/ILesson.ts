import { IUser } from "./IUser";

export default interface ILesson {
    id: number;
    subject: Record<string, any>
    startTime: Date;
    endTime: Date;
    users: IUser[];
}