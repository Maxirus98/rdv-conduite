export enum Routes {
    "Get" = "",
    "GetAll" = "all",
    "Save" = "save"
}

export default abstract class BaseService {
    protected readonly HOST: string = "http://localhost:8080";
}