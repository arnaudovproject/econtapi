import {Base} from "./Base";
import { Data } from './interfaces/Data';
import { Nomenclatures } from "./utility/Nomenclatures";

export class Countries extends Base {
    private nomenclature: string = Nomenclatures.countries;

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