import axios, {AxiosInstance} from 'axios';
import {Data} from './interfaces/Data';

export class Base {
    protected axiosInstance: AxiosInstance;
    protected username: string;
    protected password: string;
    protected readOption: string;

    constructor(data: Data) {
        this.readOption = data.readOption;
        this.username = data.username;
        this.password = data.password;
        this.axiosInstance = axios.create({
            baseURL: data.url,
            auth: {
                username: this.username,
                password: this.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}