// Common styles using Tailwind CSS classes

export const COMMON_STYLES = {
  // Button styles
  button: {
    base: 'rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    disabled: 'opacity-50 cursor-not-allowed',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  },

  // Input styles
  input: {
    base: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
    error: 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500',
    disabled: 'bg-gray-100 cursor-not-allowed',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }
  },

  // Container styles
  container: {
    base: 'bg-white rounded-lg shadow',
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    }
  },

  // Form group styles
  formGroup: {
    base: 'space-y-1',
    label: 'block text-sm font-medium text-gray-700',
    error: 'text-sm text-red-600'
  },

  // Animation classes
  animation: {
    fadeIn: 'animate-fadeIn',
    slideIn: 'animate-slideIn',
    shake: 'animate-shake'
  },

  // Voice input specific styles
  voiceInput: {
    button: 'p-2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors',
    listening: 'text-blue-500 animate-pulse',
    feedback: 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
  },

  // Site color specific styles
  siteColors: {
    none: { bg: 'bg-white', hover: 'hover:bg-gray-50', ring: 'ring-gray-200' },
    blue: { bg: 'bg-blue-100', hover: 'hover:bg-blue-200', ring: 'ring-blue-300' },
    green: { bg: 'bg-green-100', hover: 'hover:bg-green-200', ring: 'ring-green-300' },
    yellow: { bg: 'bg-yellow-100', hover: 'hover:bg-yellow-200', ring: 'ring-yellow-300' },
    purple: { bg: 'bg-purple-100', hover: 'hover:bg-purple-200', ring: 'ring-purple-300' },
    red: { bg: 'bg-red-100', hover: 'hover:bg-red-200', ring: 'ring-red-300' }
  }
}

// Helper function to combine classes
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Helper function to get button classes
export function getButtonClasses(
  variant: keyof typeof COMMON_STYLES.button = 'primary',
  size: keyof typeof COMMON_STYLES.button.sizes = 'md',
  disabled: boolean = false,
  additionalClasses: string = ''
): string {
  return classNames(
    COMMON_STYLES.button.base,
    typeof COMMON_STYLES.button[variant] === 'string' 
      ? COMMON_STYLES.button[variant] 
      : COMMON_STYLES.button.primary,
    COMMON_STYLES.button.sizes[size],
    disabled && COMMON_STYLES.button.disabled,
    additionalClasses
  )
}

// Helper function to get input classes
export function getInputClasses(
  hasError: boolean = false,
  disabled: boolean = false,
  size: keyof typeof COMMON_STYLES.input.sizes = 'md',
  additionalClasses: string = ''
): string {
  return classNames(
    COMMON_STYLES.input.base,
    COMMON_STYLES.input.sizes[size],
    hasError && COMMON_STYLES.input.error,
    disabled && COMMON_STYLES.input.disabled,
    additionalClasses
  )
}
