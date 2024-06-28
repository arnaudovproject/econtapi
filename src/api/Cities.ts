import {Base} from "./Base";
import {Data} from './interfaces/Data';

interface Validate {
    countryCode: string
}

export class Cities extends Base {
    private nomenclature: string = 'Nomenclatures/NomenclaturesService.getCities.json';

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