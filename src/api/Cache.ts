import fs from "node:fs";
import {Country} from "./interfaces/Country";

export class Cache {
    public write(path: string, data: Object): void {
        try {
            fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            throw error;
        }
    }

    public read(path: string) {
        try {
            const response = fs.readFileSync(path, 'utf-8');
            return JSON.parse(response);
        } catch (error) {
            throw error;
        }
    }
}