'use client'

import React from 'react'
import { animated } from '@react-spring/web'
import { Settings, HelpCircle, Info } from 'lucide-react'
import { useFadeAnimation } from '../../utils/animationUtils'
import { notify } from '../../utils/notificationUtils'
import { useKeyboardShortcuts, DEFAULT_SHORTCUTS, getShortcutDescription } from '../../utils/keyboardUtils'

interface CalculatorHeaderProps {
  onSettingsClick?: () => void
  className?: string
}

export function CalculatorHeader({ onSettingsClick, className = '' }: CalculatorHeaderProps) {
  const [showShortcuts, setShowShortcuts] = React.useState(false)
  const fadeAnimation = useFadeAnimation()

  const handleHelpClick = () => {
    setShowShortcuts(!showShortcuts)
  }

  const handleInfoClick = () => {
    notify.info('Calc302 - Financial Calculator\nVersion 1.0.0')
  }

  return (
    <animated.div
      style={fadeAnimation}
      className={`bg-white shadow-sm ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Calc302</h1>
            <span className="ml-2 text-sm text-gray-500">Financial Calculator</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleInfoClick}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Information"
            >
              <Info className="w-5 h-5" />
            </button>
            <button
              onClick={handleHelpClick}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            {onSettingsClick && (
              <button
                onClick={onSettingsClick}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        {showShortcuts && (
          <div className="py-4 border-t">
            <h2 className="text-sm font-medium text-gray-900 mb-2">
              Keyboard Shortcuts
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {DEFAULT_SHORTCUTS.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-500">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-700">
                    {getShortcutDescription(shortcut)}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </animated.div>
  )
}
