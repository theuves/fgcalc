import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

export default function ComboSelect({
  id,
  value,
  onChange,
  options,
  ariaLabel,
  searchable = false,
  searchPlaceholder = 'Search...',
  noResultsText = 'No results.',
  renderOption,
  renderValue,
}) {
  const generatedId = useId();
  const triggerId = id || generatedId;
  const listId = `${triggerId}-options`;
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const searchRef = useRef(null);
  const optionRefs = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState('bottom');

  const selected = options.find((option) => option.value === value);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filtered = normalizedQuery
    ? options.filter((option) => String(option.searchText || option.label).toLocaleLowerCase().includes(normalizedQuery))
    : options;
  const currentIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));

  const updatePlacement = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const estimatedHeight = Math.min(320, options.length * 45 + (searchable ? 66 : 12));
    const visibleBottom = window.visualViewport
      ? window.visualViewport.offsetTop + window.visualViewport.height
      : window.innerHeight;
    const below = visibleBottom - rect.bottom;
    setPlacement(below < estimatedHeight && rect.top > below ? 'top' : 'bottom');
  }, [options.length, searchable]);

  const openMenu = () => {
    updatePlacement();
    setQuery('');
    setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)));
    setIsOpen(true);
  };

  const closeMenu = (restoreFocus = false) => {
    setIsOpen(false);
    setQuery('');
    if (restoreFocus) triggerRef.current?.focus();
  };

  const selectOption = (option) => {
    onChange(option.value);
    closeMenu(true);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    if (searchable) searchRef.current?.focus();

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', updatePlacement);
    window.visualViewport?.addEventListener('resize', updatePlacement);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', updatePlacement);
      window.visualViewport?.removeEventListener('resize', updatePlacement);
    };
  }, [isOpen, searchable, updatePlacement]);

  useEffect(() => {
    if (isOpen) optionRefs.current[currentIndex]?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, currentIndex, query]);

  const onKeyDown = (event) => {
    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
    } else if (event.key === 'Tab') {
      closeMenu();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (filtered.length) {
        setActiveIndex((index) => (index + (event.key === 'ArrowDown' ? 1 : -1) + filtered.length) % filtered.length);
      }
    } else if ((event.key === 'Home' || event.key === 'End') && event.target !== searchRef.current) {
      event.preventDefault();
      setActiveIndex(event.key === 'Home' ? 0 : Math.max(filtered.length - 1, 0));
    } else if (event.key === 'Enter' && filtered[currentIndex]) {
      event.preventDefault();
      selectOption(filtered[currentIndex]);
    }
  };

  return (
    <div ref={rootRef} className={`combo${isOpen ? ' is-open' : ''}`} onKeyDown={onKeyDown}>
      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className="combo-trigger"
        role="combobox"
        aria-label={`${ariaLabel}: ${selected?.label || '—'}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        aria-activedescendant={isOpen && !searchable && filtered.length ? `${listId}-${currentIndex}` : undefined}
        onClick={() => isOpen ? closeMenu() : openMenu()}
      >
        <span className="combo-value">{selected ? (renderValue ? renderValue(selected) : selected.label) : '—'}</span>
        <svg className="combo-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {isOpen && (
        <div className={`combo-menu combo-menu-${placement}`}>
          {searchable && (
            <div className="combo-search-wrap">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.7" cy="8.7" r="5.7" stroke="currentColor" strokeWidth="1.6" /><path d="m13 13 4.4 4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              <input
                ref={searchRef}
                type="search"
                className="combo-search"
                value={query}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                aria-controls={listId}
                aria-activedescendant={filtered.length ? `${listId}-${currentIndex}` : undefined}
                onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
              />
            </div>
          )}
          <div id={listId} role="listbox" aria-label={ariaLabel} className="combo-list">
            {filtered.length ? filtered.map((option, index) => (
              <button
                key={option.value}
                ref={(node) => { optionRefs.current[index] = node; }}
                id={`${listId}-${index}`}
                type="button"
                role="option"
                tabIndex={-1}
                aria-selected={option.value === value}
                className={`combo-option${index === currentIndex ? ' is-active' : ''}${option.value === value ? ' is-selected' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(option)}
              >
                <span className="combo-option-content">{renderOption ? renderOption(option) : option.label}</span>
                {option.value === value && <svg className="combo-check" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m3 8 3.2 3.2L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </button>
            )) : <p className="combo-empty" role="status">{noResultsText}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
