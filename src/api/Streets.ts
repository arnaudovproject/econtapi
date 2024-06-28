import {Base} from "./Base";
import {Data} from './interfaces/Data';
import {Nomenclatures} from "./utility/Nomenclatures";
import {Street} from "./interfaces/Street";

interface Validate {
    cityID: number
}

export class Streets extends Base {
    private nomenclature: string = Nomenclatures.streets;

    constructor(data: Data) {
        super(data);
    }

    public async getStreets(args: Validate): Promise<Street[]> {
        try {
            const params: {} = {
                cityID: args.cityID
            };

            const response = await this.axiosInstance.post(this.nomenclature, params);
            return response.data.streets as Street[];
        } catch (error) {
            console.log(`Error fetching streets: ${error}`);
            throw error;
        }
    }

    public async getStreet(id: number): Promise<Street | null> {
        try {
            const response = await this.axiosInstance.get(this.nomenclature);
            const streets = response.data.streets as Street[];
            const street = streets.find((item) => item.id === id);

            return street || null;
        } catch (error) {
            console.log(`Error fetching streets: ${error}`);
            throw error;
        }
    }
}