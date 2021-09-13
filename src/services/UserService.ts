import { IUser } from "../modals/IUser";
import BaseService, { Routes } from "./BaseService";

const axios = require('axios');

export default class UserService extends BaseService {
    private readonly RESOURCE: string = "user";

    public async getAll(): Promise<IUser[]> {
        var response: IUser[] = await axios.get(`${this.HOST}/${this.RESOURCE}/${Routes.GetAll}`);
        console.log("function getAllUsers was called");
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