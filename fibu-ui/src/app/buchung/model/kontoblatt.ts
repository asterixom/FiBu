import { Konto } from "src/app/konto/model/konto.interface";
import { Buchung } from "./buchung.interface";

export interface Kontoblatt {
    konto: Konto,
    buchungen: Buchung[],
    summe: number,
    einnahmen: number,
    ausgaben: number,
    alterSaldo: number,
}
