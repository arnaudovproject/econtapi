import {Base} from "./Base";
import { Data } from './interfaces/Data';

export class Countries extends Base {
    private nomenclature: string = 'Nomenclatures/NomenclaturesService.getCountries.json';

    constructor(data: Data) {
        super(data);
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