'use client'

import { useEffect } from 'react'

type KeyboardShortcut = {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      for (const shortcut of shortcuts) {
        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!event.ctrlKey === !!shortcut.ctrlKey &&
          !!event.shiftKey === !!shortcut.shiftKey &&
          !!event.altKey === !!shortcut.altKey
        ) {
          event.preventDefault()
          shortcut.action()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
}

export const DEFAULT_SHORTCUTS: KeyboardShortcut[] = [
  {
    key: 's',
    ctrlKey: true,
    action: () => document.querySelector<HTMLButtonElement>('button[type="submit"]')?.click(),
    description: 'Save/Submit Form'
  },
  {
    key: 'r',
    ctrlKey: true,
    action: () => document.querySelector<HTMLButtonElement>('button[type="reset"]')?.click(),
    description: 'Reset Form'
  },
  {
    key: 'n',
    ctrlKey: true,
    action: () => document.querySelector<HTMLButtonElement>('button[aria-label="Add Row"]')?.click(),
    description: 'Add New Row'
  },
  {
    key: 'v',
    ctrlKey: true,
    shiftKey: true,
    action: () => document.querySelector<HTMLButtonElement>('button[aria-label="Voice Input"]')?.click(),
    description: 'Start Voice Input'
  }
]

export function getShortcutDescription(shortcut: KeyboardShortcut): string {
  const modifiers = [
    shortcut.ctrlKey && 'Ctrl',
    shortcut.shiftKey && 'Shift',
    shortcut.altKey && 'Alt'
  ].filter(Boolean)

  const key = shortcut.key.toUpperCase()
  return [...modifiers, key].join(' + ')
}
