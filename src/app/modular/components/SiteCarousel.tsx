import React, { useRef, useState } from 'react';
import { Plus, Edit2, Check, X, Palette } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Site, SiteColor } from '../../types/calculator.types';

interface SiteCarouselProps {
  sites: Site[];
  currentSiteIndex: number;
  onSiteChange: (index: number) => void;
  setSites: React.Dispatch<React.SetStateAction<Site[]>>;
}

const SITE_COLORS: { [key in SiteColor]: { bg: string; hover: string; ring: string } } = {
  none: { bg: 'bg-white', hover: 'hover:bg-gray-50', ring: 'ring-gray-200' },
  blue: { bg: 'bg-blue-100', hover: 'hover:bg-blue-200', ring: 'ring-blue-300' },
  green: { bg: 'bg-green-100', hover: 'hover:bg-green-200', ring: 'ring-green-300' },
  yellow: { bg: 'bg-yellow-100', hover: 'hover:bg-yellow-200', ring: 'ring-yellow-300' },
  red: { bg: 'bg-red-100', hover: 'hover:bg-red-200', ring: 'ring-red-300' }
};

interface SiteCardProps {
  site: Site;
  isSelected: boolean;
  onSelect: () => void;
  onUpdateSite: (updatedSite: Site) => void;
}

const SiteCard: React.FC<SiteCardProps> = ({ site, isSelected, onSelect, onUpdateSite }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(site.name);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSave = () => {
    onUpdateSite({
      ...site,
      name: editedName,
      statistics: {
        ...site.statistics,
        lastUpdated: new Date().toISOString()
      }
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(site.name);
    setIsEditing(false);
  };

  const handleColorSelect = (color: SiteColor) => {
    onUpdateSite({
      ...site,
      color,
      statistics: {
        ...site.statistics,
        lastUpdated: new Date().toISOString()
      }
    });
    setShowColorPicker(false);
  };

  return (
    <div
      className={`relative p-4 rounded-lg cursor-pointer transition-all
        ${SITE_COLORS[site.color].bg}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        hover:${SITE_COLORS[site.color].hover}
      `}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-2">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full px-2 py-1 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <h3 className="text-lg font-medium">{site.name}</h3>
        )}
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="p-1 hover:bg-white/50 rounded"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                className="p-1 hover:bg-white/50 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick();
                }}
                className="p-1 hover:bg-white/50 rounded"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker(!showColorPicker);
                }}
                className="p-1 hover:bg-white/50 rounded"
              >
                <Palette className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {showColorPicker && (
        <div
          className="absolute right-0 mt-2 p-2 bg-white rounded-lg shadow-lg z-10 flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries(SITE_COLORS).map(([color, styles]) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color as SiteColor)}
              className={`w-6 h-6 rounded-full ${styles.bg} hover:${styles.hover}`}
            />
          ))}
        </div>
      )}

      <p className="text-sm text-gray-600">
        {site.forms.length} form{site.forms.length !== 1 ? 's' : ''}
      </p>
      <p className="text-sm text-gray-600">
        Last updated {formatDistanceToNow(new Date(site.statistics.lastUpdated))} ago
      </p>
    </div>
  );
};

const SiteCarousel: React.FC<SiteCarouselProps> = ({
  sites,
  currentSiteIndex,
  onSiteChange,
  setSites
}) => {
  const handleUpdateSite = (siteIndex: number, updatedSite: Site) => {
    setSites(prevSites => {
      const newSites = [...prevSites];
      newSites[siteIndex] = updatedSite;
      return newSites;
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
      {sites.map((site, index) => (
        <div key={site.id} className="flex-shrink-0 w-64 snap-start">
          <SiteCard
            site={site}
            isSelected={index === currentSiteIndex}
            onSelect={() => onSiteChange(index)}
            onUpdateSite={(updatedSite) => handleUpdateSite(index, updatedSite)}
          />
        </div>
      ))}
    </div>
  );
};

export default SiteCarousel;
