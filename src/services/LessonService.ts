import ILesson from "../modals/ILesson";
import { IUser } from "../modals/IUser";
import BaseService, { Routes } from "./BaseService";

const axios = require('axios');

export default class LessonService extends BaseService {
    private readonly RESOURCE: string = "lesson";

    public async getAllUsers(): Promise<ILesson[]> {
        var response: ILesson[] = await axios.get(`${this.HOST}/${this.RESOURCE}/${Routes.GetAll}`);
        console.log("function getAllLessons was called at", `${this.HOST}/${this.RESOURCE}/${Routes.GetAll}`);
        return response;
    }

    private saveUser(user: IUser) {
        axios.post('/user', {
            id: 1
        })
            .then(function (response: any) {
                console.log(response);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }
}