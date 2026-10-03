import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { buildShareUrl, isShareableEstimate } from '../utils/shareEstimate.js';

function ShareIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.8 10.7 12.3 7.9M7.8 9.3l4.5 2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="5.6" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="14.3" cy="5.7" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="14.3" cy="14.3" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="7" y="6.5" width="9" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 6.5V5a1.5 1.5 0 0 0-1.5-1.5h-6A1.5 1.5 0 0 0 4 5v7a1.5 1.5 0 0 0 1.5 1.5H7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function ShareEstimate({ estimate, locale, total, messages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const inputRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const share = messages.ui.share;
  const canShare = isShareableEstimate(estimate);
  const url = canShare && typeof window !== 'undefined' ? buildShareUrl(window.location.href, locale, estimate) : '';

  useEffect(() => {
    if (!isOpen) return undefined;
    const trigger = triggerRef.current;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
      } else if (event.key === 'Tab') {
        const focusable = [...dialogRef.current.querySelectorAll('button:not(:disabled), input:not(:disabled)')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  const copyUrl = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        inputRef.current?.select();
        if (!document.execCommand('copy')) throw new Error('Copy failed');
      }
      setStatus('copied');
    } catch {
      setStatus('error');
      inputRef.current?.select();
    }
  };

  const shareNatively = async () => {
    try {
      await navigator.share({ title: messages.documentTitle, text: share.description, url });
      setIsOpen(false);
    } catch (error) {
      if (error.name !== 'AbortError') setStatus('error');
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="share-trigger"
        disabled={!canShare}
        onClick={() => { setStatus('idle'); setIsOpen(true); }}
      >
        <span className="share-trigger-icon"><ShareIcon /></span>
        <span>{share.button}</span>
      </button>

      {isOpen && createPortal(
        <div className="share-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
          <div ref={dialogRef} className="share-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
            <button ref={closeRef} type="button" className="share-close" aria-label={share.close} onClick={() => setIsOpen(false)}>×</button>
            <div className="share-icon"><ShareIcon /></div>
            <span className="share-eyebrow">AWS Fargate Calculator</span>
            <h2 id={titleId}>{share.title}</h2>
            <p id={descriptionId} className="share-description">{share.description}</p>

            <div className="share-preview">
              <span className="share-preview-label">{share.preview}</span>
              <strong>{total}</strong>
              <span className="share-preview-detail">{estimate.region} · {estimate.cpu} vCPU · {estimate.ram} GiB · {estimate.currency}</span>
              <span className="share-preview-detail">
                {estimate.timeValue} {messages.sections.timeUnits[estimate.timeType][estimate.timeValue === 1 ? 'singular' : 'plural']}
                {' · '}{estimate.capacityFargate} Fargate · {estimate.capacityFargateSpot} Spot
              </span>
            </div>

            <label className="share-url-label" htmlFor={`${titleId}-url`}>{share.urlLabel}</label>
            <div className="share-url-row">
              <input ref={inputRef} id={`${titleId}-url`} type="text" value={url} readOnly onFocus={(event) => event.target.select()} />
              <button type="button" className="share-copy" onClick={copyUrl}><CopyIcon /><span>{status === 'copied' ? share.copied : share.copy}</span></button>
            </div>
            <p className={`share-status${status === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite">
              {status === 'copied' ? share.copiedMessage : status === 'error' ? share.copyError : share.note}
            </p>
            {typeof navigator.share === 'function' && (
              <button type="button" className="share-native" onClick={shareNatively}><ShareIcon />{share.nativeButton}</button>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
