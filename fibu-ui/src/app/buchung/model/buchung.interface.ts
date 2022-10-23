import { UploadedFile } from "../../files/model/file.interface";
import { Konto } from "../../konto/model/konto.interface";

export interface Buchung {
    buchungsnummer?: number;
    datum?: string | Date;
    name?: string;
    beschreibung?: string;
    betrag?: number;
    hauptkonto?: Konto;
    belege: UploadedFile[];
  }