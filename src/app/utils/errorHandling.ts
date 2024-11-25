import React from 'react';
import { ErrorKeys } from '../types/calculator.types'

// Error messages for different languages
const errorMessages = {
  'en-US': {
    fond: 'Invalid fund amount',
    soldeALinstant: 'Invalid current balance',
    soldeDeDebut: 'Invalid initial balance',
    credit: 'Invalid credit amount',
    creditPayee: 'Invalid paid credit',
    depense: 'Invalid expense',
    retrait: 'Invalid withdrawal',
    generic: 'An error occurred',
    siteLimit: 'Site limit reached',
    formLimit: 'Form limit reached'
  },
  'fr-FR': {
    fond: 'Montant de fonds invalide',
    soldeALinstant: 'Solde actuel invalide',
    soldeDeDebut: 'Solde initial invalide',
    credit: 'Montant de crédit invalide',
    creditPayee: 'Crédit payé invalide',
    depense: 'Dépense invalide',
    retrait: 'Retrait invalide',
    generic: 'Une erreur est survenue',
    siteLimit: 'Limite de site atteinte',
    formLimit: 'Limite de formulaire atteinte'
  },
  'es-ES': {
    fond: 'Monto de fondos inválido',
    soldeALinstant: 'Saldo actual inválido',
    soldeDeDebut: 'Saldo inicial inválido',
    credit: 'Monto de crédito inválido',
    creditPayee: 'Crédito pagado inválido',
    depense: 'Gasto inválido',
    retrait: 'Retiro inválido',
    generic: 'Ocurrió un error',
    siteLimit: 'Límite de sitio alcanzado',
    formLimit: 'Límite de formulario alcanzado'
  },
  'ar-SA': {
    fond: 'مبلغ الصندوق غير صالح',
    soldeALinstant: 'الرصيد الحالي غير صالح',
    soldeDeDebut: 'الرصيد الأولي غير صالح',
    credit: 'مبلغ الائتمان غير صالح',
    creditPayee: 'الائتمان المدفوع غير صالح',
    depense: 'المصروف غير صالح',
    retrait: 'السحب غير صالح',
    generic: 'حدث خطأ',
    siteLimit: 'تم الوصول إلى الحد الأقصى لعدد المواقع',
    formLimit: 'تم الوصول إلى الحد الأقصى لعدد النماذج'
  }
}

// Type definitions
type Language = keyof typeof errorMessages
type ErrorType = keyof typeof errorMessages['en-US']

// Validate number input
function validateNumber(value: string): boolean {
  return !isNaN(parseFloat(value)) && isFinite(Number(value));
}

// Get error message based on language
function getErrorMessage(
  error: ErrorType,
  language: Language = 'en-US'
): string {
  return errorMessages[language][error] || errorMessages[language].generic
}

// Form validation
function validateForm(form: any, language: Language = 'en-US'): Record<ErrorKeys, string> {
  const errors: Record<ErrorKeys, string> = {} as Record<ErrorKeys, string>

  // Validate numeric fields
  if (!validateNumber(form.fond)) {
    errors.fond = getErrorMessage('fond', language)
  }

  return errors
}

// Error boundary class component
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return React.createElement('div', { className: 'p-4 bg-red-50 border border-red-200 rounded-md' }, [
        React.createElement('h2', { className: 'text-red-800 text-lg font-medium' }, 'Something went wrong'),
        React.createElement('p', { className: 'text-red-600 mt-1' }, this.state.error?.message)
      ])
    }

    return this.props.children
  }
}

// Custom hook for form validation
export function useFormValidation(initialErrors: Record<ErrorKeys, string> = {} as Record<ErrorKeys, string>) {
  const [errors, setErrors] = React.useState<Record<ErrorKeys, string>>(initialErrors)

  const validateField = (name: ErrorKeys, value: string, language: Language = 'en-US') => {
    if (!validateNumber(value)) {
      setErrors(prev => ({
        ...prev,
        [name]: getErrorMessage(name, language)
      }))
      return false
    }
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
    return true
  }

  const clearErrors = () => {
    setErrors({} as Record<ErrorKeys, string>)
  }

  return { errors, validateField, clearErrors }
}
