/*-----------------------------
 * Author <Ventsislav Arnaudov>
 * E-mail <mail@varnaudov.com>
 * Site   <varnaudov.com>
*----------------------------*/

import fs from "node:fs";
import {Data} from './interfaces/Data';
import axios, {AxiosInstance} from 'axios';
import {FileSystem} from "./utility/FileSystem";

export class Base {
    protected axiosInstance: AxiosInstance;
    protected username: string;
    protected password: string;
    protected readOption: string;
    protected updateIntervalHours: number;

    constructor(data: Data) {
        this.updateIntervalHours = data.updateIntervalHours || 24;
        this.readOption = data.readOption;
        this.username = data.username;
        this.password = data.password;
        this.axiosInstance = axios.create({
            baseURL: data.url,
            auth: {
                username: this.username,
                password: this.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    protected timeForUpdate(filePath: string) {
        const stats = fs.statSync(filePath);
        const now = new Date().getTime();
        const modifiedTime = new Date(stats.mtime).getTime();
        const hours = (now - modifiedTime) / 1000 / 60 / 60;

        return hours > this.updateIntervalHours;
    }

    protected checkFolderAndFile(filePath: string): void {
        if (this.readOption === 'file') {
            try {
                if (!fs.existsSync(FileSystem.folder)) {
                    fs.mkdirSync((FileSystem.folder));
                }
                if (!fs.existsSync(filePath)) {
                    fs.writeFileSync(filePath, '[]', 'utf-8');
                }
            } catch (error) {
                console.error(`Error creating storage file: ${error}`);
                throw error;
            }
        }
    }
}