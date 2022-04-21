export interface Buchung {
    nummer: number;
    datum: string;
    beschreibung: string;
    wert: number;
    konto: { 
      nummer: number,
      name: string
    };
    gegenkonto?: {
        nummer: number,
        name: string
    };
    belege?: {
      id: string,
      filename: string,
      name?: string,
      beschreibung?: string
    }[]
  }