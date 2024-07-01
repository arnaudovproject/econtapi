/*-----------------------------
 * Author <Ventsislav Arnaudov>
 * E-mail <mail@varnaudov.com>
 * Site   <varnaudov.com>
*----------------------------*/

import {Cache} from "../Cache";

export interface Data {
    readOption: string,
    url: string,
    username: string,
    password: string,
    cache?: Cache,
    updateIntervalHours?: number
}