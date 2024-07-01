/*-----------------------------
 * Author <Ventsislav Arnaudov>
 * E-mail <mail@varnaudov.com>
 * Site   <varnaudov.com>
*----------------------------*/

interface Address {
    info: string,
    currency: string,
    language: string,
    normalBusinessHoursFrom: string,
    normalBusinessHoursTo: string,
    halfDayBusinessHoursFrom: string,
    halfDayBusinessHoursTo: string,
    sundayBusinessHoursFrom: string,
    sundayBusinessHoursTo: string
}

interface ShipmentTypes {
    partnerCode: string,
    hubCode: string,
    hubName: string,
    hubNameEn: string,
    isDrive: boolean
}
export interface Office {
    id: number,
    code: string,
    isMPS: boolean,
    isAPS: boolean,
    name: string,
    nameEn: string,
    phones: string,
    emails: string,
    address: Address,
    shipmentType: ShipmentTypes
}