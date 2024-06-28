import {Base} from "./Base";
import {Data} from './interfaces/Data';

interface Validate {
    countryCode: string,
    cityID: number
}

export class Offices extends Base {
    private nomenclature: string = 'Nomenclatures/NomenclaturesService.getOffices.json';

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