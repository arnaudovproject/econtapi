/*-----------------------------
 * Author <Ventsislav Arnaudov>
 * E-mail <mail@varnaudov.com>
 * Site   <varnaudov.com>
*----------------------------*/

interface Types {
    countries: string,
    cities: string,
    offices: string,
    streets: string,
    quarters: string
}

export const Nomenclatures: Types = {
    countries: 'Nomenclatures/NomenclaturesService.getCountries.json',
    cities: 'Nomenclatures/NomenclaturesService.getCities.json',
    offices: 'Nomenclatures/NomenclaturesService.getOffices.json',
    streets: 'Nomenclatures/NomenclaturesService.getStreets.json',
    quarters: 'Nomenclatures/NomenclaturesService.getQuarters.json'
};