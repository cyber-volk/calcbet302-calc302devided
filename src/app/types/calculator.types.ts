export type { SpeechRecognition } from '../utils/speechRecognition'

export type VoiceLanguage = 'en-US' | 'fr-FR' | 'es-ES' | 'ar-SA' | 'none'
export type SiteColor = 'red' | 'blue' | 'green' | 'yellow' | 'none'

export const SITE_COLORS: Record<SiteColor, { bg: string; hover: string; ring: string }> = {
  none: { bg: 'bg-white', hover: 'hover:bg-gray-50', ring: 'ring-gray-200' },
  blue: { bg: 'bg-blue-100', hover: 'hover:bg-blue-200', ring: 'ring-blue-300' },
  green: { bg: 'bg-green-100', hover: 'hover:bg-green-200', ring: 'ring-green-300' },
  yellow: { bg: 'bg-yellow-100', hover: 'hover:bg-yellow-200', ring: 'ring-yellow-300' },
  red: { bg: 'bg-red-100', hover: 'hover:bg-red-200', ring: 'ring-red-300' }
}

export type ErrorKeys = 'fond' | 'soldeALinstant' | 'soldeDeDebut' | 'credit' | 'creditPayee' | 'depense' | 'retrait'
export type Errors = Record<ErrorKeys, string>

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
  id: string
  name: string
  color: SiteColor
  forms: Form[]
  statistics: {
    lastUpdated: string
  }
}

export interface RowField {
  credit: keyof CreditRow
  creditPayee: keyof CreditPayeeRow
  depense: keyof DepenseRow
  retrait: keyof RetraitRow
}

export interface ShareData {
  files?: File[]
  title?: string
  text?: string
}

export interface WebShareNavigator extends Navigator {
  canShare: (data?: ShareData) => boolean;
  share: (data?: ShareData) => Promise<void>;
}

export interface CalculationResult {
  creditTotal: number
  creditPayeeTotal: number
  depenseTotal: number
  retraitTotal: number
  totalCredit: number
  totalDebit: number
  finalResult: number
  timestamp: string
}

export interface FormRow {
  amount?: string
  [key: string]: any
}
