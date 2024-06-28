import {Base} from "./Base";
import {Data} from './interfaces/Data';
import { Nomenclatures } from "./utility/Nomenclatures";

interface Validate {
    countryCode: string,
    cityID: number
}

export class Offices extends Base {
    private nomenclature: string = Nomenclatures.offices;

    constructor(data: Data) {
        super(data);
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