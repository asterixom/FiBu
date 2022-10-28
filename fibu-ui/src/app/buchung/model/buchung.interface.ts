import { UploadedFile } from "../../files/model/file.interface";
import { Konto } from "../../konto/model/konto.interface";

export interface Buchung {
    buchungsnummer?: number;
    datum?: Date;
    name?: string;
    beschreibung?: string;
    betrag?: number;
    hauptkonto?: Konto;
    gegenkonto?: Konto;
    belege: UploadedFile[];
  }