import * as fs from "node:fs";
import * as path from "node:path";
import {Base} from "./Base";
import {Cache} from "./Cache";
import {Data} from './interfaces/Data';
import {Country} from "./interfaces/Country";
import {Nomenclatures} from "./utility/Nomenclatures";
import {FileSystem} from "./utility/FileSystem";

export class Countries extends Base {
    private nomenclature: string = Nomenclatures.countries;
    private filePath: string = path.join(FileSystem.folder, FileSystem.file_countries);
    private cache: Cache;

    constructor(data: Data) {
        super(data);
        this.cache = data.cache || new Cache();
        this.ensureStorageFile();
    }

    private ensureStorageFile(): void {
        try {
            if (!fs.existsSync(FileSystem.folder)) {
                fs.mkdirSync((FileSystem.folder));
            }
            if (!fs.existsSync(this.filePath)) {
                fs.writeFileSync(this.filePath, '[]', 'utf-8');
            }
        } catch (error) {
            console.error(`Error creating storage file: ${error}`);
            throw error;
        }
    }

    public async getCountries(): Promise<Country[]> {
        try {
            switch (this.readOption) {
                case 'file':
                    if (fs.existsSync(this.filePath)) {
                        const array = this.cache.read(this.filePath) as Country[];
                        if (Array.isArray(array) && array.length === 0) {
                            const response = await this.axiosInstance.get(this.nomenclature);
                            const data = response.data.countries as Country[];
                            this.cache.write(this.filePath, data);

                            return data;
                        } else {
                            return array;
                        }
                    } else {
                        const response = await this.axiosInstance.get(this.nomenclature);
                        const data = response.data.countries as Country[];
                        this.cache.write(this.filePath, data);

                        return this.cache.read(this.filePath) as Country[];
                    }
                default:
                    const response = await this.axiosInstance.get(this.nomenclature);
                    return response.data.countries as Country[];
            }
        } catch (error) {
            console.log(`Error fetching countries: ${error}`);
            throw error;
        }
    }

    public async getCountry(code3: string): Promise<Country | null> {
        try {
            switch (this.readOption) {
                case 'file':
                    if (fs.existsSync(this.filePath)) {
                        const array = this.cache.read(this.filePath) as Country[];
                        const country = array.find((item) => item.code3 === code3);
                        if (Array.isArray(array) && array.length === 0) {
                            const response = await this.axiosInstance.get(this.nomenclature);
                            const data = response.data.countries as Country[];
                            const country = data.find((item) => item.code3 === code3);
                            this.cache.write(this.filePath, data);

                            return country || null;
                        } else {
                            return country || null;
                        }
                    } else {
                        const response = await this.axiosInstance.get(this.nomenclature);
                        const data = response.data.countries as Country[];
                        this.cache.write(this.filePath, data);

                        const countries = this.cache.read(this.filePath) as Country[];
                        const country = countries.find((item) => item.code3 === code3);

                        return country || null;
                    }
                default:
                    const response = await this.axiosInstance.get(this.nomenclature);
                    const countries = response.data.countries as Country[];
                    const country = countries.find((item) => item.code3 === code3);

                    return country || null;
            }
        } catch (error) {
            console.log(`Error fetching country: ${error}`);
            throw error;
        }
    }
}