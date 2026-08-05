import React, { useMemo, useState, useEffect, useRef, useId, useCallback } from 'react';

export default function SearchSelectInput({
  label,
  value,
  onChange,
  placeholder,
  options,
  getOptionValue,
  getOptionLabel,
  getOptionSearchText,
  getOptionDisplayLabel,
  buttonClassName = '',
  showCaret = true,
  buttonWidthClass = 'min-w-[160px]',
  buttonHeightClass = 'h-8',
  buttonTextClass = 'text-[11px]',
  buttonPaddingClass = 'px-2',
  closeButtonLabel = 'Close selector',
  openButtonPrefix = 'Open',
  noResultsText = 'No results.',
  resultHintTemplate = '{count} options available. Use arrow keys and Enter to select.',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const triggerId = useId();
  const searchId = useId();
  const labelId = useId();
  const dialogId = useId();
  const statusId = useId();
  const listId = useId();

  const selected = useMemo(
    () => options.find((option) => getOptionValue(option) === value),
    [options, value, getOptionValue]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return options;
    }

    return options.filter((option) => {
      const searchText = getOptionSearchText
        ? getOptionSearchText(option)
        : `${getOptionLabel(option)} ${getOptionValue(option)}`;

      return String(searchText).toLowerCase().includes(q);
    });
  }, [options, search, getOptionLabel, getOptionValue, getOptionSearchText]);

  const safeHighlightedIndex = Math.max(0, Math.min(highlightedIndex, Math.max(filtered.length - 1, 0)));

  const closeModal = () => {
    setSearch('');
    setHighlightedIndex(0);
    setIsOpen(false);
  };

  const openModal = () => {
    setSearch('');
    setHighlightedIndex(0);
    setIsOpen(true);
  };

  const onSelect = useCallback((optionValue) => {
    onChange(optionValue);
    closeModal();
  }, [onChange]);

  const onMoveSelection = useCallback((direction) => {
    if (!filtered.length) {
      return;
    }

    setHighlightedIndex((previous) => {
      if (direction === 'down') {
        return (previous + 1) % filtered.length;
      }
      if (direction === 'up') {
        return (previous - 1 + filtered.length) % filtered.length;
      }
      return previous;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const currentOption = optionRefs.current[safeHighlightedIndex];
    if (currentOption && typeof currentOption.scrollIntoView === 'function') {
      currentOption.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, safeHighlightedIndex]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        onMoveSelection('down');
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        onMoveSelection('up');
        return;
      }

      if (event.key === 'Home' && filtered.length > 0) {
        event.preventDefault();
        setHighlightedIndex(0);
        return;
      }

      if (event.key === 'End' && filtered.length > 0) {
        event.preventDefault();
        setHighlightedIndex(filtered.length - 1);
        return;
      }

      if (event.key === 'Enter' && filtered.length > 0) {
        event.preventDefault();
        const selectedOption = filtered[safeHighlightedIndex];
        if (selectedOption) {
          onSelect(getOptionValue(selectedOption));
        }
      }
    };

    const onPointerDown = (event) => {
      const target = event.target;
      const insidePanel = panelRef.current && panelRef.current.contains(target);
      const insideTrigger = triggerRef.current && triggerRef.current.contains(target);
      if (insidePanel || insideTrigger) {
        return;
      }
      closeModal();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('touchstart', onPointerDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('touchstart', onPointerDown);
    };
  }, [
    isOpen,
    filtered,
    safeHighlightedIndex,
    onMoveSelection,
    onSelect,
    getOptionValue,
  ]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }

    if (!isOpen) {
      return;
    }

    return () => {
      setSearch('');
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={`${openButtonPrefix} ${label} selector`}
        onClick={() => {
          if (isOpen) {
            closeModal();
            return;
          }
          openModal();
        }}
        className={`${buttonWidthClass} ${buttonHeightClass} ${buttonPaddingClass} border border-[#3d4758] bg-[var(--aws-surface)] ${buttonTextClass} text-[var(--aws-header-bg)] inline-flex items-center justify-between ${buttonClassName}`}
      >
        <span className="truncate">{selected ? (getOptionDisplayLabel ? getOptionDisplayLabel(selected) : getOptionLabel(selected)) : label}</span>
        {showCaret ? (
          <span className="text-[#64748b] ml-2" aria-hidden="true">
            ▾
          </span>
        ) : null}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/35"
          role="presentation"
          onMouseDown={closeModal}
          onTouchStart={closeModal}
        >
          <div className="relative mx-auto mt-16 w-[min(90vw,720px)]" onMouseDown={(event) => event.stopPropagation()} onTouchStart={(event) => event.stopPropagation()}>
            <div
              ref={panelRef}
              role="dialog"
              id={dialogId}
              aria-labelledby={labelId}
              aria-modal="true"
              aria-describedby={statusId}
              className="mx-auto max-w-[320px] bg-[#ffffff] border border-[#d6deeb] shadow-xl"
              onMouseDown={(event) => event.stopPropagation()}
              onTouchStart={(event) => event.stopPropagation()}
            >
              <h2 id={labelId} className="sr-only">
                Select {label}
              </h2>
              <div className="p-2 border-b border-[#e5e7eb] flex items-center gap-2">
                <input
                  ref={inputRef}
                  id={searchId}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onFocus={() => setHighlightedIndex(0)}
                  placeholder={placeholder}
                  aria-controls={listId}
                  aria-describedby={statusId}
                  className="w-full h-9 px-2 border border-[#d6deeb] text-[12px]"
                />
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-9 px-3 border border-[#d6deeb] text-xs text-[#475569] hover:bg-[#f8fafc] shrink-0"
                  aria-label={closeButtonLabel}
                >
                  ×
                </button>
              </div>

              <div id={listId} role="listbox" aria-label={`${label} options`} className="max-h-72 overflow-auto p-1">
                {filtered.length === 0 ? (
                  <p id={statusId} role="status" className="text-xs p-2 text-[#64748b]">
                    {noResultsText}
                  </p>
                ) : (
                  <>
                    {filtered.map((option, index) => {
                      const optionValue = getOptionValue(option);
                      const optionLabel = getOptionLabel(option);
                      const isSelected = optionValue === getOptionValue(selected);
                      const isHighlighted = index === safeHighlightedIndex;

                      return (
                        <button
                          key={optionValue}
                          ref={(node) => {
                            optionRefs.current[index] = node;
                          }}
                          type="button"
                          role="option"
                          id={`${listId}-option-${index}`}
                          aria-selected={isHighlighted}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          onClick={() => onSelect(optionValue)}
                          className={`w-full text-left px-3 h-9 text-[12px] hover:bg-[#f8fafc] text-[#111827] ${
                            isSelected || isHighlighted ? 'bg-[#f8fafc]' : ''
                          }`}
                        >
                          {optionLabel}
                        </button>
                      );
                    })}
                    <span id={statusId} className="sr-only">
                      {resultHintTemplate.replace('{count}', filtered.length)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
