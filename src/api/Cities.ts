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
import {City} from "./interfaces/City";
import {Nomenclatures} from "./utility/Nomenclatures";
import {FileSystem} from "./utility/FileSystem";

interface Validate {
    countryCode: string
}

export class Cities extends Base {
    private nomenclature: string = Nomenclatures.cities;
    private filePath: string = path.join(FileSystem.folder, FileSystem.file_cities);
    private cache: Cache;

    constructor(data: Data) {
        super(data);
        this.checkFolderAndFile(this.filePath);
        this.cache = data.cache || new Cache();
    }

    private async apiData(type: string, args: Validate, id?: number): Promise<City[] | City | null> {
        if (type === 'all') {
            const params: {} = {
                countryCode: args.countryCode
            }
            const response = await this.axiosInstance.post(this.nomenclature, params);
            return response.data.cities as City[];
        } else if (type === 'single') {
            const response = await this.axiosInstance.get(this.nomenclature);
            const data = response.data.cities as City[];
            const arg = data.find((item) => item.id === id) || null;
            return arg;
        } else {
            return null;
        }
    }

    private async cacheData(type: string, args: Validate, id?: number): Promise<City[] | City | null> {
        if (type === 'all') {
            const params: {} = {
                countryCode: args.countryCode
            }
            return await this.cache.read(this.filePath) as City[];
        } else if (type === 'single') {
            const response = await this.cache.read(this.filePath) as City[];
            const arg = response.find((item) => item.id === id) || null;
            return arg;
        } else {
            return null;
        }
    }

    public async getCities(args: Validate): Promise<any> {
        try {
            switch (this.readOption) {
                case 'file':
                    if (fs.existsSync(this.filePath)) {
                        if (this.timeForUpdate(this.filePath)) {
                            const response = await this.apiData('all', args) as City[];
                            await this.cache.write(this.filePath, response);

                            return await this.apiData('all', args);
                        } else {
                            const data = await this.cacheData('all', args);
                            if (Array.isArray(data) && data.length === 0) {
                                const response = await this.apiData('all', args) as City[];
                                await this.cache.write(this.filePath, response);
                            }

                            return await this.cacheData('all', args) as City[];
                        }
                    } else {
                        const response = await this.apiData('all', args) as City[];
                        await this.cache.write(this.filePath, response);

                        return await this.apiData('all', args) as City[];
                    }
                default:
                    return await this.apiData('all', args) as City[];
            }
        } catch (error) {
            console.log(`Error fetching cities: ${error}`);
            throw error;
        }
    }

    public async getCity(args: Validate, id: number): Promise<any> {
        try {
            switch (this.readOption) {
                case 'file':
                    if (fs.existsSync(this.filePath)) {
                        if (this.timeForUpdate(this.filePath)) {
                            const response = await this.apiData('all', args) as City[];
                            await this.cache.write(this.filePath, response);

                            return await this.apiData('single', args, id) as City;
                        } else {
                            const data = await this.cacheData('single', args, id) as City;
                            if (data === null || (Array.isArray(data) && data.length === 0)) {
                                const response = await this.apiData('all', args) as City[];
                                await this.cache.write(this.filePath, response);

                                return await this.apiData('single', args, id) as City;
                            } else {
                                return data;
                            }
                        }
                    } else {
                        const response = await this.apiData('all', args) as City[];
                        await this.cache.write(this.filePath, response);

                        return await this.apiData('single', args, id) as City;
                    }
                default:
                    return await this.apiData('single', args, id) as City;
            }
        } catch (error) {
            console.log(`Error fetching city: ${error}`);
            throw error;
        }
    }
}