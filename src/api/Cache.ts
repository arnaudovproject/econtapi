/*-----------------------------
 * Author <Ventsislav Arnaudov>
 * E-mail <mail@varnaudov.com>
 * Site   <varnaudov.com>
*----------------------------*/

import fs from "fs/promises";

export class Cache {
    public async write(path: string, data: Object): Promise<void> {
        try {
            await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            throw error;
        }
    }

    public async read(path: string): Promise<any> {
        try {
            const response = await fs.readFile(path, 'utf-8');
            return JSON.parse(response);
        } catch (error) {
            throw error;
        }
    }
}