import {Cache} from "../Cache";

export interface Data {
    readOption: string,
    url: string,
    username: string,
    password: string,
    cache?: Cache,
    updateIntervalHours?: number
}