import { useEffect, useRef } from 'react'
import { Form } from '../types/calculator.types'

export function useAutosave(
  form: Form,
  onSave: (form: Form) => void,
  delay: number = 1000
) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const previousFormRef = useRef<Form>(form)

  useEffect(() => {
    // Check if form has changed
    if (JSON.stringify(previousFormRef.current) === JSON.stringify(form)) {
      return
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      onSave(form)
      previousFormRef.current = form
    }, delay)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [form, onSave, delay])
}
