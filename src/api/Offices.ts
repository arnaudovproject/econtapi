import axios, {AxiosInstance} from "axios";
import {Data} from './interfaces/Data';

interface Validate {
    countryCode: string,
    cityID: number
}

export class Offices {
    private axiosInstance: AxiosInstance;
    private username: string;
    private password: string;
    private nomenclature: string = 'Nomenclatures/NomenclaturesService.getOffices.json';

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

    public async getOffices(args: Validate): Promise<any> {
        try {
            const params: {} = {
                countryCode: args.countryCode,
                cityID: args.cityID
            };

            const response = await this.axiosInstance.post(this.nomenclature, params);
            return response.data;
        } catch (error) {
            console.log(`Error fetching offices: ${error}`);
            throw error;
        }
    }
}