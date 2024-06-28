import {Base} from "./Base";
import {Data} from './interfaces/Data';
import { Nomenclatures } from "./utility/Nomenclatures";

interface Validate {
    countryCode: string
}

export class Cities extends Base {
    private nomenclature: string = Nomenclatures.cities;

    constructor(data: Data) {
        super(data);
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