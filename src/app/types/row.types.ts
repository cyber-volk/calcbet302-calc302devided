import type { CreditRow, CreditPayeeRow, DepenseRow, RetraitRow, VoiceLanguage } from './calculator.types'

interface BaseRowProps {
  index: number
  handleVoiceInput: (callback: (value: string) => void) => void
  voiceLanguage: VoiceLanguage
  showVoiceButton: boolean
}

export interface CreditRowComponentProps extends BaseRowProps {
  row: CreditRow
  onUpdate: (index: number, field: keyof CreditRow, value: string) => void
  onDelete: (index: number) => void
}

export interface CreditPayeeRowComponentProps extends BaseRowProps {
  row: CreditPayeeRow
  onUpdate: (index: number, field: keyof CreditPayeeRow, value: string) => void
  onDelete: (index: number) => void
}

export interface DepenseRowComponentProps extends BaseRowProps {
  row: DepenseRow
  onUpdate: (index: number, field: keyof DepenseRow, value: string) => void
  onDelete: (index: number) => void
}

export interface RetraitRowComponentProps extends BaseRowProps {
  row: RetraitRow
  onUpdate: (index: number, field: keyof RetraitRow, value: string) => void
  onDelete: (index: number) => void
}
