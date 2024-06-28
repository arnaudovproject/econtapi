import {Base} from "./Base";
import {Data} from './interfaces/Data';
import {Nomenclatures} from "./utility/Nomenclatures";
import {Office} from "./interfaces/Office";

interface Validate {
    countryCode: string,
    cityID: number
}

export class Offices extends Base {
    private nomenclature: string = Nomenclatures.offices;

    constructor(data: Data) {
        super(data);
    }

    public async getOffices(args: Validate): Promise<Office[]> {
        try {
            const params: {} = {
                countryCode: args.countryCode,
                cityID: args.cityID
            };

            const response = await this.axiosInstance.post(this.nomenclature, params);
            return response.data.offices as Office[];
        } catch (error) {
            console.log(`Error fetching offices: ${error}`);
            throw error;
        }
    }

    public async getOffice(id: number): Promise<Office | null> {
        try {
            const response = await this.axiosInstance.get(this.nomenclature);
            const offices = response.data.offices as Office[];
            const office = offices.find((item) => item.id === id);

            return office || null;
        } catch (error) {
            console.log(`Error fetching offices: ${error}`);
            throw error;
        }
    }
}