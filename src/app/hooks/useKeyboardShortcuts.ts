import { useEffect } from 'react'

type ShortcutAction = () => void

interface ShortcutMap {
  [key: string]: ShortcutAction
}

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Get the key combination
      const key = [
        event.ctrlKey ? 'Ctrl' : '',
        event.shiftKey ? 'Shift' : '',
        event.key.toUpperCase()
      ]
        .filter(Boolean)
        .join('+')

      // Execute the corresponding action if it exists
      if (shortcuts[key]) {
        event.preventDefault()
        shortcuts[key]()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

// Default shortcuts
export const DEFAULT_SHORTCUTS: ShortcutMap = {
  'Ctrl+S': () => console.log('Save'), // Save form
  'Ctrl+Z': () => console.log('Undo'), // Undo last action
  'Ctrl+Shift+Z': () => console.log('Redo'), // Redo last action
  'Ctrl+N': () => console.log('New Form'), // Create new form
  'Ctrl+P': () => console.log('Print'), // Print form
  'Ctrl+E': () => console.log('Export'), // Export form
  'Ctrl+H': () => console.log('History'), // Toggle history
  'Ctrl+M': () => console.log('Voice'), // Toggle voice input
  'Ctrl+L': () => console.log('Language'), // Toggle language
  'Ctrl+D': () => console.log('Delete'), // Delete current form
}
