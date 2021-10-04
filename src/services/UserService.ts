import { IInstructor } from "../models/IInstructor";
import { IUser } from "../models/IUser";
import BaseService, { Routes } from "./BaseService";

const axios = require('axios');

export default class UserService extends BaseService {
    private readonly USER_RESOURCE: string = "user";
    private readonly INSTRUCTOR_RESOURCE: string = "instructor";

    public async getAllUsers(): Promise<IUser[]> {
        var response: IUser[] = await axios.get(`${this.HOST}/${this.USER_RESOURCE}/${Routes.GetAll}`);
        console.log("function getAllUsers was called", response);
        return response;
    }

    public saveOrUpdateUser(user: IUser) {
        axios.post(`${this.HOST}/${this.USER_RESOURCE}/${Routes.Save}`, user)
            .then(function (response: any) {
                console.log(response);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }
}