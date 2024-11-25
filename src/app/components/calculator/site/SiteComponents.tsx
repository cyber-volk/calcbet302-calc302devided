'use client'

import React, { useState } from 'react'
import { Edit2, Check, Trash, ChevronRight, ChevronLeft } from 'lucide-react'
import { Site, SiteColor, SITE_COLORS } from '../../../types/calculator.types'

interface SiteCardProps {
  site: Site
  isDefault?: boolean
  onSelect: (siteId: string) => void
  onUpdateSite: (updatedSite: Site) => void
  onDeleteSite: () => void
}

export function SiteCard({ site, isDefault = false, onSelect, onUpdateSite, onDeleteSite }: SiteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(site.name)
  const [selectedColor, setSelectedColor] = useState<SiteColor>(site.color)

  const handleSave = () => {
    onUpdateSite({
      ...site,
      name: editedName,
      color: selectedColor as SiteColor
    })
    setIsEditing(false)
  }

  const colorOptions: SiteColor[] = ['none', 'blue', 'green', 'yellow', 'red']

  return (
    <div className={`p-4 rounded-lg shadow-sm ring-1 ${SITE_COLORS[site.color].ring} ${SITE_COLORS[site.color].bg}`}>
      <div className="flex items-center justify-between">
        {isEditing ? (
          <div className="flex-1 mr-2">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
        ) : (
          <button
            onClick={() => onSelect(site.id)}
            className={`flex-1 text-left font-medium ${SITE_COLORS[site.color].hover} rounded px-2 py-1`}
          >
            {site.name}
          </button>
        )}
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <div className="flex space-x-1">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full ${SITE_COLORS[color].bg} ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:text-green-700 focus:outline-none"
              >
                <Check className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {!isDefault && (
            <button
              onClick={onDeleteSite}
              className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
            >
              <Trash className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      {!isEditing && (
        <div className="mt-2 text-sm text-gray-500">
          Last updated: {new Date(site.statistics.lastUpdated).toLocaleDateString()}
        </div>
      )}
    </div>
  )
}

interface SiteCarouselProps {
  sites: Site[]
  currentSiteIndex: number
  onSiteChange: (index: number) => void
  onAddSite: () => void
  onUpdateSite: (siteIndex: number, updatedSite: Site) => void
  onDeleteSite: (siteIndex: number) => void
}

export function SiteCarousel({
  sites,
  currentSiteIndex,
  onSiteChange,
  onAddSite,
  onUpdateSite,
  onDeleteSite
}: SiteCarouselProps) {
  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onSiteChange(Math.max(0, currentSiteIndex - 1))}
          disabled={currentSiteIndex === 0}
          className={`p-1 rounded-full ${
            currentSiteIndex === 0
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <SiteCard
            site={sites[currentSiteIndex]}
            isDefault={currentSiteIndex === 0}
            onSelect={() => {}}
            onUpdateSite={(updatedSite) => onUpdateSite(currentSiteIndex, updatedSite)}
            onDeleteSite={() => onDeleteSite(currentSiteIndex)}
          />
        </div>
        <button
          onClick={() => onSiteChange(Math.min(sites.length - 1, currentSiteIndex + 1))}
          disabled={currentSiteIndex === sites.length - 1}
          className={`p-1 rounded-full ${
            currentSiteIndex === sites.length - 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {sites.length < 5 && (
        <button
          onClick={onAddSite}
          className="mt-4 w-full py-2 px-4 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Site
        </button>
      )}
    </div>
  )
}
