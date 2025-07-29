"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const ProjectModal = ({
  isOpen,
  onClose,
  title,
  description,
  collaborators,
  images = [],
  instagramLink,
  date,
  month,
  year,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  // Enhanced close function with animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  // Navigation functions
  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    setIsImageLoading(true);
    setImageLoadError(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;
    setIsImageLoading(true);
    setImageLoadError(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, nextImage, prevImage]);

  // Reset image index when images change
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoadError(false);
  }, [images]);

  // Handle image load events
  const handleImageLoad = () => {
    setIsImageLoading(false);
    setImageLoadError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setImageLoadError(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: ${isClosing ? "fadeOut" : "fadeIn"} 0.2s ease-out;
        }

        .modal-container {
          background: #ffffff;
          border-radius: 20px;
          max-width: 90vw;
          width: 900px;
          max-height: 90vh;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          position: relative;
          display: flex;
          flex-direction: column;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          animation: ${isClosing ? "scaleOut" : "scaleIn"} 0.2s ease-out;
          transform-origin: center;
        }

        .image-section {
          position: relative;
          width: 100%;
          height: 70vh;
          min-height: 400px;
          max-height: 600px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 20px 20px 0 0;
        }

        .main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
          opacity: ${isImageLoading ? "0.7" : "1"};
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          padding: 40px 30px 30px;
          color: white;
        }

        .overlay-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 8px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          line-height: 1.2;
        }

        .overlay-subtitle {
          font-size: 0.95rem;
          font-weight: 400;
          margin: 0;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .close-button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          font-size: 20px;
          font-weight: 300;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
        }

        .close-button:hover {
          background: rgba(0, 0, 0, 0.7);
          transform: scale(1.1);
        }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #333;
          font-size: 18px;
          z-index: 10;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          opacity: 0;
          visibility: hidden;
        }

        .image-section:hover .nav-button {
          opacity: 1;
          visibility: visible;
        }

        .nav-button:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .nav-button.prev {
          left: 20px;
        }

        .nav-button.next {
          right: 20px;
        }

        .nav-arrow {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }

        .indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 10;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(255, 255, 255, 0.5);
        }

        .indicator.active {
          background: white;
          transform: scale(1.2);
        }

        .indicator:hover:not(.active) {
          background: rgba(255, 255, 255, 0.8);
        }

        .content-section {
          padding: 30px;
          background: white;
          border-radius: 0 0 20px 20px;
          max-height: 40vh;
          overflow-y: auto;
        }

        .description {
          color: #374151;
          line-height: 1.7;
          font-size: 1rem;
          margin: 0 0 25px 0;
          font-weight: 400;
        }

        .meta-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .date-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-size: 0.9rem;
          font-weight: 500;
        }


        .loading-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .error-message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          font-size: 1rem;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scaleOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.9);
          }
        }

        @keyframes spin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .modal-overlay {
            padding: 10px;
          }

          .modal-container {
            width: 95vw;
            max-height: 95vh;
            border-radius: 16px;
          }

          .image-section {
            height: 60vh;
            min-height: 300px;
            border-radius: 16px 16px 0 0;
          }

          .overlay-title {
            font-size: 1.5rem;
          }

          .overlay-subtitle {
            font-size: 0.85rem;
          }

          .image-overlay {
            padding: 30px 20px 20px;
          }

          .close-button {
            top: 15px;
            right: 15px;
            width: 36px;
            height: 36px;
            font-size: 18px;
          }

          .nav-button {
            width: 44px;
            height: 44px;
            opacity: 1;
            visibility: visible;
          }

          .nav-button.prev {
            left: 15px;
          }

          .nav-button.next {
            right: 15px;
          }

          .content-section {
            padding: 20px;
            max-height: 35vh;
            border-radius: 0 0 16px 16px;
          }

          .description {
            font-size: 0.95rem;
            line-height: 1.6;
          }

          .meta-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        @media (max-width: 480px) {
          .image-section {
            height: 50vh;
            min-height: 250px;
          }

          .overlay-title {
            font-size: 1.25rem;
          }

          .content-section {
            padding: 15px;
          }
          .collaborators-info {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #6b7280; /* Or a color that fits your design */
            font-size: 1.1rem;
            font-weight: 500;
            margin-bottom: 5px;
          }

          /* Add this if you want it responsive like the date-info */
          @media (max-width: 768px) {
            .collaborators-info {
              /* Adjust as needed for mobile */
            }
          }
          .nav-button {
            width: 40px;
            height: 40px;
          }

          .nav-button.prev {
            left: 10px;
          }

          .nav-button.next {
            right: 10px;
          }
        }
      `}</style>

      <div
        className="modal-overlay"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          ref={modalRef}
          className="modal-container"
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          {/* Image Section */}
          <div className="image-section">
            {isImageLoading && <div className="loading-spinner"></div>}
            {imageLoadError ? (
              <div className="error-message">
                <div>🌱</div>
                <div>Image could not be loaded</div>
              </div>
            ) : (
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="main-image"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}

            {/* Image Overlay with Title */}
            <div className="image-overlay">
              <h2 id="modal-title" className="overlay-title">
                {title}
              </h2>
              {(date || month || year) && (
                <p className="overlay-subtitle">
                  {date} {month} {year} • SWAAS GTBIT
                </p>
              )}
            </div>

            {/* Close Button */}
            <button
              className="close-button"
              onClick={handleClose}
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  className="nav-button prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <svg className="nav-arrow" viewBox="0 0 24 24">
                    <polyline points="15,18 9,12 15,6"></polyline>
                  </svg>
                </button>
                <button
                  className="nav-button next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <svg className="nav-arrow" viewBox="0 0 24 24">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>

                {/* Indicators */}
                <div className="indicators">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => {
                        setIsImageLoading(true);
                        setCurrentImageIndex(index);
                      }}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="content-section">
            {(date || month || year || instagramLink || collaborators) && (
              <div className="meta-info">
                {collaborators && (
                  <div className="collaborators-info">
                    Collaborators: {collaborators}
                  </div>
                )}

                {instagramLink && (
                  <a
                    className="instagram"
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🌱 View on Instagram
                  </a>
                )}
              </div>
            )}

            {/* Always show description */}
            {description && <p className="description">{description}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
