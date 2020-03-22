import Axios, { AxiosInstance } from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
interface IApiHeaders {
    [header: string]: string | undefined;
}

class Api {
    private httpClient: AxiosInstance;
    public headers: IApiHeaders = {};

    constructor(endpoint?: string) {
        this.httpClient = Axios.create({
            baseURL: endpoint || '',
        });
    }

    private throwError = (error: any) => console.error(error);

    public request = (method: HttpMethod, url: string, data?: any) => 
        this.httpClient.request({ method, url, data, headers: this.headers })
        .then((res) => res.data)
        .catch(this.throwError);
}

export default new Api('http://localhost:5000');
