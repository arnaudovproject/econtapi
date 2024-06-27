import axios, { AxiosInstance } from "axios";

interface Data {
    url: string,
    username: string,
    password: string
}

interface Validate {
    countryCode: string
}

export class Cities {
    private axiosInstance: AxiosInstance;
    private username: string;
    private password: string;
    private nomenclature: string = 'Nomenclatures/NomenclaturesService.getCities.json';

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

    public async getCities(args: Validate): Promise<any> {
        try {
            const params: {} = {
                countryCode: args.countryCode
            }

            const response = await this.axiosInstance.post(this.nomenclature, params);
            return response.data;
        } catch (error) {
            console.log(`Error fetching cities: ${error}`);
            throw error;
        }
    }
}