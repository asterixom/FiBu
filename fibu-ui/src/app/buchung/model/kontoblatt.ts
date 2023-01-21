import { Konto } from "src/app/konto/model/konto.interface";
import { Buchung } from "./buchung.interface";

export interface Kontoblatt {
    konto: Konto,
    buchungen: Buchung[]
}
