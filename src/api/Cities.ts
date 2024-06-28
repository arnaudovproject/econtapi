import {Base} from "./Base";
import {Data} from './interfaces/Data';
import {Nomenclatures} from "./utility/Nomenclatures";
import {City} from "./interfaces/City";
import * as process from "node:process";

interface Validate {
    countryCode: string
}

export class Cities extends Base {
    private nomenclature: string = Nomenclatures.cities;

    constructor(data: Data) {
        super(data);
    }

    public async getCities(args: Validate): Promise<City[]> {
        try {
            const params: {} = {
                countryCode: args.countryCode
            }

            const response = await this.axiosInstance.post(this.nomenclature, params);
            return response.data.cities as City[];
        } catch (error) {
            console.log(`Error fetching cities: ${error}`);
            throw error;
        }
    }

    public async getCity(id: number): Promise<City | null> {
        try {
            const response = await this.axiosInstance.get(this.nomenclature);
            const cities = response.data.cities as City[];
            const city = cities.find((item) => item.id === id);

            return city || null;
        } catch (error) {
            console.log(`Error fetching city: ${error}`);
            throw error;
        }
    }
}