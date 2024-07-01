/*-----------------------------
 * Author <Ventsislav Arnaudov>
 * E-mail <mail@varnaudov.com>
 * Site   <varnaudov.com>
*----------------------------*/

export interface Address {
    id: number
}

export interface City {
    fullAddress: string,
    fullAddressEn: string,
    quarter: string,
    street: string,
    num: string,
    other: string
}

export interface Location {
    zip: string,
    hezid: string
}