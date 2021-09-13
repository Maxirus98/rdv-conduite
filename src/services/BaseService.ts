export enum Routes {
    "GetUser" = "",
    "GetAll" = "all",
    "SaveUser" = "save"
}

export default abstract class BaseService {
    protected readonly HOST: string = "http://localhost:8080";
    public abstract getAll(): any;
}