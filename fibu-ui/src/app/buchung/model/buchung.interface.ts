import { Konto } from "./konto.interface";

export interface Buchung {
    buchungsnummer?: number;
    datum?: string | Date;
    name?: string;
    beschreibung?: string;
    betrag?: number;
    hauptkonto?: Konto;
    belege?: {
      id: string,
      filename: string,
      name?: string,
      beschreibung?: string
    }[];
  }