import axios, { AxiosInstance } from 'axios';
import {Data} from './interfaces/Data';

export class Countries {
    private axiosInstance: AxiosInstance;
    private username: string;
    private password: string;
    private nomenclature: string = 'Nomenclatures/NomenclaturesService.getCountries.json';

    constructor(data: Data) {
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

    public async getCountries(): Promise<any> {
        try {
            const response = await this.axiosInstance.get(this.nomenclature);
            return response.data;
        } catch (error) {
            console.log(`Error fetching countries: ${error}`);
            throw error;
        }
    }
}