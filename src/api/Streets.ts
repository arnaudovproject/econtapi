import axios, {AxiosInstance} from "axios";
import {Data} from './interfaces/Data';

interface Validate {
    cityID: number
}

export class Streets {
    private axiosInstance: AxiosInstance;
    private username: string;
    private password: string;
    private nomenclature: string = 'Nomenclatures/NomenclaturesService.getStreets.json';

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

    public async getStreets(args: Validate): Promise<any> {
        try {
            const params: {} = {
                cityID: args.cityID
            };

            const response = await this.axiosInstance.post(this.nomenclature, params);
            return response.data;
        } catch (error) {
            console.log(`Error fetching streets: ${error}`);
            throw error;
        }
    }
}