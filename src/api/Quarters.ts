import {Base} from "./Base";
import {Data} from './interfaces/Data';

interface Validate {
    cityID: number
}

export class Quarters extends Base {
    private nomenclature: string = 'Nomenclatures/NomenclaturesService.getQuarters.json';

    constructor(data: Data) {
        super(data);
    }

    public async getQuarters(args: Validate): Promise<any> {
        try {
            const params: {} = {
                cityID: args.cityID
            };

            const response = await this.axiosInstance.post(this.nomenclature, params);
            return response.data;
        } catch (error) {
            console.log(`Error fetching quarters: ${error}`);
            throw error;
        }
    }
}