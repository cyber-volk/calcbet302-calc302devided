import { Site, SiteColor } from '../types/calculator.types'

export const MAX_FORMS_PER_SITE = 3
export const MAX_SITES = 5

export const SITE_COLORS = {
  red: { bg: 'bg-red-100', hover: 'hover:bg-red-200', ring: 'ring-red-300' },
  blue: { bg: 'bg-blue-100', hover: 'hover:bg-blue-200', ring: 'ring-blue-300' },
  green: { bg: 'bg-green-100', hover: 'hover:bg-green-200', ring: 'ring-green-300' },
  yellow: { bg: 'bg-yellow-100', hover: 'hover:bg-yellow-200', ring: 'ring-yellow-300' },
  purple: { bg: 'bg-purple-100', hover: 'hover:bg-purple-200', ring: 'ring-purple-300' },
  none: { bg: 'bg-gray-100', hover: 'hover:bg-gray-200', ring: 'ring-gray-300' }
}

export const DEFAULT_SITE: Site = {
  id: '1',
  name: 'Default Site',
  color: 'none',
  forms: [],
  statistics: {
    lastUpdated: new Date().toISOString()
  }
}
