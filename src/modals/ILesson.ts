import { Lessons } from "./Lessons";

export default interface ILesson {
    id: number;
    subject: Record<string, any>
    startTime: Date;
    endTime: Date;
    users: number[];
}