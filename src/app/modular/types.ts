export type VoiceLanguage = 'en-US' | 'fr-FR' | 'es-ES' | 'ar-SA' | 'none';
export type SiteColor = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'none';

export interface CreditRow {
  id: string;
  totalClient: string;
  details: string;
  client: string;
}

export interface CreditPayeeRow {
  id: string;
  totalPayee: string;
  details: string;
  client: string;
}

export interface DepenseRow {
  id: string;
  totalDepense: string;
  details: string;
  client: string;
}

export interface RetraitRow {
  id: string;
  retraitPayee: string;
  retrait: string;
  client: string;
}

export interface Form {
  id: string;
  result: string;
  timestamp: string;
  calculationHistory: string[];
  creditRows: CreditRow[];
  creditPayeeRows: CreditPayeeRow[];
  depenseRows: DepenseRow[];
  retraitRows: RetraitRow[];
  fond: string;
  soldeALinstant: string;
  soldeDeDebut: string;
  site: string;
  multiplier: string;
  siteColor: SiteColor;
}

export interface Site {
  id: string;
  name: string;
  color: SiteColor;
  forms: Form[];
  statistics: {
    lastUpdated: string;
  };
}

export type RowField = {
  credit: CreditRow;
  creditPayee: CreditPayeeRow;
  depense: DepenseRow;
  retrait: RetraitRow;
}
