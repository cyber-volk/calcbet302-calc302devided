export type VoiceLanguage = 'en-US' | 'fr-FR' | 'es-ES' | 'ar-SA' | 'none'

export interface Form {
  id: string
  result: string
  timestamp: string
  calculationHistory: string[]
}
