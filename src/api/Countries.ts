import axios, { AxiosInstance } from 'axios';

interface Auth {
    username: string,
    password: string
}

export class Countries {
    private axiosInstance: AxiosInstance;
    private username: string;
    private password: string;
    private nomenclature: string = 'Nomenclatures/NomenclaturesService.getCountries.json';

    constructor(auth: Auth) {
        this.username = auth.username;
        this.password = auth.password;
        this.axiosInstance = axios.create({
            baseURL: '',
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