/*-----------------------------
 * Author <Ventsislav Arnaudov>
 * E-mail <mail@varnaudov.com>
 * Site   <varnaudov.com>
*----------------------------*/

import {Base} from "./Base";
import {Data} from './interfaces/Data';
import {Nomenclatures} from "./utility/Nomenclatures";
import {Quarter} from "./interfaces/Quarter";

interface Validate {
    cityID: number
}

export class Quarters extends Base {
    private nomenclature: string = Nomenclatures.quarters;

    constructor(data: Data) {
        super(data);
    }

    public async getQuarters(args: Validate): Promise<Quarter[]> {
        try {
            const params: {} = {
                cityID: args.cityID
            };

            const response = await this.axiosInstance.post(this.nomenclature, params);
            return response.data.quarters as Quarter[];
        } catch (error) {
            console.log(`Error fetching quarters: ${error}`);
            throw error;
        }
    }

    public async getQuarter(id: number): Promise<Quarter | null> {
        try {
            const response = await this.axiosInstance.get(this.nomenclature);
            const quarters = response.data.quarters as Quarter[];
            const quarter = quarters.find((item) => item.id === id);

            return quarter || null;
        } catch (error) {
            console.log(`Error fetching quarters: ${error}`);
            throw error;
        }
    }
}