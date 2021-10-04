export enum Routes {
    "Get" = "",
    "GetAll" = "all",
    "Save" = "save"
}

export default abstract class BaseService {
    protected readonly HOST: string = "http://192.168.56.1:8093";
}