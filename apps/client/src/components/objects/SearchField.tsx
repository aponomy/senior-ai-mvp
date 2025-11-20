import { format } from 'date-fns';
import { useState } from 'react';

interface SearchFieldProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDate?: Date;
  resultCount?: number;
}

export default function SearchField({
  searchQuery,
  onSearchChange,
  selectedDate,
  resultCount,
}: SearchFieldProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div 
      data-name="search-field"
      style={{
      padding: '20px 40px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      background: 'rgba(10, 11, 15, 0.7)',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        width: '100%',
      }}>
        <div style={{ flex: isSearchFocused ? '0 0 auto' : '1' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'white' }}>
            Time Machine
          </h1>
          {selectedDate && (
            <p style={{ margin: '8px 0 0', opacity: 0.6, fontSize: '14px', color: 'white' }}>
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              {searchQuery && resultCount !== undefined && (
                <span style={{ marginLeft: '12px', color: '#60a5fa' }}>
                  • {resultCount} result{resultCount !== 1 ? 's' : ''}
                </span>
              )}
            </p>
          )}
        </div>

        {/* Expandable Search Field */}
        <div style={{
          position: 'relative',
          width: isSearchFocused ? '500px' : '250px',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}>
            {/* Search Icon */}
            <svg
              style={{
                position: 'absolute',
                left: '12px',
                width: '18px',
                height: '18px',
                opacity: 0.5,
                pointerEvents: 'none',
                zIndex: 1,
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search conversations..."
              style={{
                width: '100%',
                padding: '10px 40px 10px 40px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: isSearchFocused 
                  ? '1px solid rgba(96, 165, 250, 0.5)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                boxShadow: isSearchFocused 
                  ? '0 0 0 3px rgba(96, 165, 250, 0.1)' 
                  : 'none',
              }}
            />

            {/* Clear Button */}
            {searchQuery && (
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSearchChange('');
                }}
                style={{
                  position: 'absolute',
                  right: '8px',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  cursor: 'pointer',
                  opacity: 0.6,
                  transition: 'all 0.2s ease',
                  zIndex: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.6';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Search Hint */}
          {isSearchFocused && !searchQuery && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '8px',
              padding: '8px 12px',
              background: 'rgba(26, 27, 47, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              fontSize: '12px',
              opacity: 0.7,
              color: 'white',
            }}>
              Search by title or content
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
