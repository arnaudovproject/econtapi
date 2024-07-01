/*-----------------------------
 * Author <Ventsislav Arnaudov>
 * E-mail <mail@varnaudov.com>
 * Site   <varnaudov.com>
*----------------------------*/

import * as fs from "node:fs";
import * as path from "node:path";
import {Base} from "./Base";
import {Cache} from "./Cache";
import {Data} from './interfaces/Data';
import {Country} from "./interfaces/Country";
import {Nomenclatures} from "./utility/Nomenclatures";
import {FileSystem} from "./utility/FileSystem";

interface Validate {
    countryCode: string
}

export class Countries extends Base {
    private nomenclature: string = Nomenclatures.countries;
    private filePath: string = path.join(FileSystem.folder, FileSystem.file_countries);
    private cache: Cache;

    constructor(data: Data) {
        super(data);
        this.checkFolderAndFile(this.filePath);
        this.cache = data.cache || new Cache();
    }

    private async apiData(type: string, code3?: string): Promise<Country[] | Country | null> {
        if (type === 'all') {
            const response = await this.axiosInstance.get(this.nomenclature);
            return response.data.countries as Country[];
        } else if (type === 'single') {
            const response = await this.axiosInstance.get(this.nomenclature);
            const data = response.data.countries as Country[];
            const arg = data.find((item) => item.code3 === code3) || null;
            return arg;
        } else {
            return null;
        }
    }

    private async cacheData(type: string, code3?: string): Promise<Country[] | Country | null> {
        if (type === 'all') {
            return await this.cache.read(this.filePath) as Country[];
        } else if (type === 'single') {
            const response = await this.cache.read(this.filePath) as Country[];
            const arg = response.find((item) => item.code3 === code3) || null;
            return arg;
        } else {
            return null;
        }
    }

    public async getCountries(): Promise<any> {
        try {
            switch (this.readOption) {
                case 'file':
                    if (fs.existsSync(this.filePath)) {
                        if (this.timeForUpdate(this.filePath)) {
                            const response = await this.apiData('all') as Country[];
                            await this.cache.write(this.filePath, response);

                            return await this.apiData('all');
                        } else {
                            const data = await this.cacheData('all');
                            if (Array.isArray(data) && data.length === 0) {
                                const response = await this.apiData('all') as Country[];
                                await this.cache.write(this.filePath, response);
                            }

                            return await this.cacheData('all') as Country[];
                        }
                    } else {
                        const response = await this.apiData('all') as Country[];
                        await this.cache.write(this.filePath, response);

                        return await this.apiData('all') as Country[];
                    }
                default:
                    return await this.apiData('all') as Country[];
            }
        } catch (error) {
            console.log(`Error fetching countries: ${error}`);
            throw error;
        }
    }

    public async getCountry(code3: string): Promise<any> {
        try {
            switch (this.readOption) {
                case 'file':
                    if (fs.existsSync(this.filePath)) {
                        if (this.timeForUpdate(this.filePath)) {
                            const response = await this.apiData('all') as Country[];
                            await this.cache.write(this.filePath, response);

                            return await this.apiData('single', code3) as Country;
                        } else {
                            const data = await this.cacheData('single', code3) as Country;
                            if (data === null || (Array.isArray(data) && data.length === 0)) {
                                const response = await this.apiData('all') as Country[];
                                await this.cache.write(this.filePath, response);

                                return await this.apiData('single', code3) as Country;
                            } else {
                                return data;
                            }
                        }
                    } else {
                        const response = await this.apiData('all') as Country[];
                        await this.cache.write(this.filePath, response);

                        return await this.apiData('single', code3) as Country;
                    }
                default:
                    return await this.apiData('single', code3) as Country;
            }
        } catch (error) {
            console.log(`Error fetching country: ${error}`);
            throw error;
        }
    }
}