'use client';

import { useEffect, useRef, useState } from 'react';
import { christmasCard } from './content';
import styles from './christmas.module.css';

type ShareStatus = 'idle' | 'copied' | 'manual';

export default function ShareButton() {
  const [status, setStatus] = useState<ShareStatus>('idle');
  const [manualUrl, setManualUrl] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status !== 'copied') return;
    const id = window.setTimeout(() => setStatus('idle'), 4000);
    return () => window.clearTimeout(id);
  }, [status]);

  useEffect(() => {
    if (status !== 'manual') return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [status]);

  async function onShare() {
    const url = window.location.href;
    setManualUrl(url);

    if (typeof navigator.share === 'function') {
      const payload = {
        title: christmasCard.shareTitle,
        text: christmasCard.shareText,
        url,
      };
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        try {
          await navigator.share({ url });
          return;
        } catch (retryError) {
          if (retryError instanceof DOMException && retryError.name === 'AbortError') return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
    } catch {
      setStatus('manual');
    }
  }

  return (
    <div className={styles.shareWrap}>
      <button
        type="button"
        className={styles.shareButton}
        onClick={onShare}
        aria-label={christmasCard.shareLabel}
      >
        <svg
          className={styles.shareIcon}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v12M8 7l4-4 4 4M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"
          />
        </svg>
        <span aria-hidden="true">{christmasCard.shareLabel}</span>
      </button>
      <p className={styles.shareStatus} role="status" aria-live="polite">
        {status === 'copied' ? christmasCard.copiedLabel : ''}
      </p>
      {status === 'manual' ? (
        <div className={styles.copyFallback}>
          <label htmlFor="christmas-card-url">{christmasCard.copyFallbackLabel}</label>
          <input
            ref={inputRef}
            id="christmas-card-url"
            className={styles.copyField}
            type="text"
            readOnly
            spellCheck={false}
            value={manualUrl}
            onFocus={(event) => event.currentTarget.select()}
          />
        </div>
      ) : null}
    </div>
  );
}
