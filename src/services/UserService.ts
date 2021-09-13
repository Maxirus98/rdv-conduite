import { IUser } from "../modals/IUser";
import BaseService, { Routes } from "./BaseService";

const axios = require('axios');

export default class UserService extends BaseService {
    private readonly USER_RESOURCE: string = "user";
    private readonly INSTRUCTOR_RESOURCE: string = "instructor";


    // Probleme: GetAllUsers return instructors too
    // Solution: Trier selon leur type, filtrer selon leur type.
    public async getAllUsers(): Promise<IUser[]> {
        var response: IUser[] = await axios.get(`${this.HOST}/${this.USER_RESOURCE}/${Routes.GetAll}`);
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