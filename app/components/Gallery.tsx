'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { FaPlay, FaPause } from 'react-icons/fa';

interface GalleryImage {
  src: string;
  fullSrc: string;
  alt: string;
  model: string;
  photographer: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Gallery({ images }: GalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openModal = (index: number, trigger: HTMLElement) => {
    returnFocusRef.current = trigger;
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsPlaying(false);
  }, []);

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const toggleSlideshow = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      setIsPlaying(false);
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReducedMotion(media.matches);
      if (media.matches) setIsPlaying(false);
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isPlaying || !isModalOpen || reducedMotion) return;
    const interval = setInterval(showNext, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, isModalOpen, reducedMotion, showNext]);

  useEffect(() => {
    if (!isModalOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previouslyFocused = returnFocusRef.current;

    const frame = window.requestAnimationFrame(() => {
      dialog.querySelector<HTMLElement>('[data-lightbox-close]')?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrev();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      dialog.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isModalOpen, closeModal, showNext, showPrev]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isModalOpen || !dialog) return;

    let touchStartX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
      if (touchEndX < touchStartX - 50) showNext();
      if (touchEndX > touchStartX + 50) showPrev();
    };

    dialog.addEventListener('touchstart', handleTouchStart, { passive: true });
    dialog.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      dialog.removeEventListener('touchstart', handleTouchStart);
      dialog.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isModalOpen, showNext, showPrev]);

  const current = images[currentIndex];

  return (
    <>
      <div className="gallery">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="gallery-thumb"
            onClick={(event) => openModal(index, event.currentTarget)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={600}
              className="gallery-image"
            />
          </button>
        ))}
      </div>

      <div
        ref={dialogRef}
        id="imageModal"
        className={`image-viewer ${isModalOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal={isModalOpen}
        aria-hidden={!isModalOpen}
        inert={!isModalOpen}
        aria-label={current ? current.alt : 'Portfolio photo'}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeModal();
        }}
      >
        {isModalOpen && current && (
          <>
            <button
              type="button"
              className="close"
              data-lightbox-close
              onClick={closeModal}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <Image
              src={current.fullSrc}
              alt={current.alt}
              width={1200}
              height={1800}
              className="viewer-content"
              style={{ objectFit: 'contain', maxHeight: '90vh', width: 'auto' }}
            />

            <div className="image-info">
              <p>
                {current.model}
                <br />
                {current.photographer}
              </p>
            </div>

            <button
              type="button"
              id="prev-btn"
              className="nav-btn"
              onClick={showPrev}
              aria-label="Previous photo"
            >
              <span aria-hidden="true">&#10094;</span>
            </button>
            <button
              type="button"
              id="next-btn"
              className="nav-btn"
              onClick={showNext}
              aria-label="Next photo"
            >
              <span aria-hidden="true">&#10095;</span>
            </button>
            <button
              type="button"
              id="play-btn"
              className="play-btn"
              onClick={toggleSlideshow}
              aria-pressed={isPlaying}
              aria-disabled={reducedMotion}
              aria-label={
                reducedMotion
                  ? 'Slideshow is paused because reduced motion is on'
                  : isPlaying
                    ? 'Pause slideshow'
                    : 'Play slideshow'
              }
            >
              {isPlaying ? <FaPause aria-hidden="true" /> : <FaPlay aria-hidden="true" />}
            </button>
          </>
        )}
      </div>
    </>
  );
}
