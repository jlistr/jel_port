'use client';

import { useState, useEffect, useCallback } from 'react';
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

export default function Gallery({ images }: GalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const openModal = (index: number) => {
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
    setIsPlaying((prev) => !prev);
  };

  // Slideshow effect
  useEffect(() => {
    if (isPlaying && isModalOpen) {
      const interval = setInterval(showNext, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isModalOpen, showNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, showNext, showPrev, closeModal]);

  // Touch gestures
  useEffect(() => {
    if (!isModalOpen) return;

    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchEndX < touchStartX - 50) showNext();
      if (touchEndX > touchStartX + 50) showPrev();
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isModalOpen, showNext, showPrev]);

  return (
    <>
      <div className="gallery">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={400}
            height={600}
            className="gallery-image"
            onClick={() => openModal(index)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <div
        id="imageModal"
        className={`image-viewer ${isModalOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <span className="close" onClick={closeModal}>&times;</span>

        {isModalOpen && images[currentIndex] && (
          <>
            <Image
              src={images[currentIndex].fullSrc}
              alt={images[currentIndex].alt}
              width={1200}
              height={1800}
              className="viewer-content"
              style={{ objectFit: 'contain', maxHeight: '90vh', width: 'auto' }}
            />

            <div className="image-info">
              <p>
                {images[currentIndex].model}
                <br />
                {images[currentIndex].photographer}
              </p>
            </div>

            <button id="play-btn" className="play-btn" onClick={toggleSlideshow}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button id="prev-btn" className="nav-btn" onClick={showPrev}>&#10094;</button>
            <button id="next-btn" className="nav-btn" onClick={showNext}>&#10095;</button>
          </>
        )}
      </div>
    </>
  );
}

