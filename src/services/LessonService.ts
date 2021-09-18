import ILesson from "../modals/ILesson";
import { IUser } from "../modals/IUser";
import BaseService, { Routes } from "./BaseService";
import axios from "axios";

export default class LessonService extends BaseService {
    private readonly RESOURCE: string = "lesson";

    public async getAllLessons() {

    }

    public async saveLesson(lesson: ILesson) {

    }
}