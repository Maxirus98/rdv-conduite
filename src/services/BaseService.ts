export default abstract class BaseService {
    protected readonly HOST: string = "http://localhost:8080";
    public abstract getAll(): any;
}