// src/components/ProjectModal.js
import { useState, useEffect, useCallback } from 'react';

const ProjectModal = ({ isOpen, onClose, title, description, images = [] }) => {
  // State to manage the currently displayed image index in the slider
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Memoized callback for moving to the next image
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Memoized callback for moving to the previous image
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Effect to handle keyboard navigation (left/right arrows) and close with Escape key
  useEffect(() => {
    // Only attach listener if modal is currently open
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose(); // Close modal on Escape key press
      } else if (event.key === 'ArrowRight') {
        if (images.length > 0) nextImage(); // Navigate next if images exist
      } else if (event.key === 'ArrowLeft') {
        if (images.length > 0) prevImage(); // Navigate previous if images exist
      }
    };

    // Add event listener to the window
    window.addEventListener('keydown', handleKeyDown);
    // Cleanup function to remove event listener when component unmounts or isOpen changes
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, nextImage, prevImage, onClose, images.length]); // Dependencies for useEffect

  // Effect to reset currentImageIndex if the images array changes (e.g., different event selected)
  useEffect(() => {
    if (images.length > 0 && currentImageIndex >= images.length) {
      setCurrentImageIndex(0); // Reset to first image if current index is out of bounds
    } else if (images.length === 0 && currentImageIndex !== 0) {
      setCurrentImageIndex(0); // If no images, reset index to 0
    }
  }, [images.length, currentImageIndex]);

  // If the modal is not open, render nothing
  if (!isOpen) return null;

  // --- INLINE STYLES FOR AESTHETICS & RESPONSIVENESS ---

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker, more immersive overlay
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
    backdropFilter: 'blur(8px)', // Stronger blur for a modern feel
  };

  const modalContentStyle = {
    backgroundColor: '#f9f9f9', // Soft off-white for content background
    borderRadius: '16px', // More pronounced rounded corners
    maxWidth: '95%', // Responsive max width
    width: '900px', // Preferred width on larger screens
    maxHeight: '95vh', // Responsive max height
    overflowY: 'auto', // Allows content to scroll if it overflows vertically
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)', // Deeper, more refined shadow
    position: 'relative',
    display: 'flex',
    flexDirection: 'column', // Stack header, slider, and description vertically
    fontFamily: '"Inter", sans-serif', // Using Inter for a clean, modern look
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 30px', // Increased padding
    borderBottom: '1px solid #e5e5e5', // Lighter, subtle border
    backgroundColor: '#f0f0f0', // Slightly darker header background
    borderTopLeftRadius: '16px', // Match content border-radius
    borderTopRightRadius: '16px',
    flexShrink: 0, // Prevent header from shrinking
  };

  const titleStyle = {
    fontSize: '2.2rem', // Larger, more impactful title
    fontWeight: '700',
    color: '#34495e', // Darker, professional text color
    margin: 0,
    flexGrow: 1,
    paddingRight: '20px',
  };

  const closeButtonStyle = {
    padding: '12px 16px', // Larger clickable area for the close button
    border: 'none',
    background: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '2.5rem', // Larger 'x' for better visibility
    lineHeight: '1',
    color: '#7f8c8d', // Muted grey
    transition: 'all 0.3s ease-in-out', // Smooth transition for hover effects
    display: 'flex', // Center the 'x'
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none', // Remove default focus outline
  };

  const sliderContainerStyle = {
    position: 'relative',
    // Responsive height: minimum 250px, 50% of viewport height, max 500px
    minHeight: images.length > 0 ? 'clamp(250px, 50vh, 500px)' : '0',
    backgroundColor: '#e9ecef', // Light grey background for image area
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0, // Prevent slider from shrinking
    overflow: 'hidden', // Crucial for image containment
  };

  const imageContainerStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Ensures image doesn't overflow its container
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain', // Ensures entire image is visible without cropping/stretching
    transition: 'opacity 0.5s ease-in-out', // Smooth fade transition for images
  };

  const navButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    // Gradient background for Eco-Tech theme
    background: 'linear-gradient(135deg, #556b2f 0%, #6b8e3d 100%)', // Dark green to lighter green
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '15px', // Larger circular buttons
    cursor: 'pointer',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)', // More prominent shadow for depth
    transition: 'all 0.3s ease-in-out', // Smooth transition for hover effects
    fontSize: '2.8rem', // Larger arrow icons
    lineHeight: '1',
    zIndex: 10, // Ensure buttons are above the image
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none', // Remove default focus outline
  };

  // SVG for the left arrow
  const LeftArrowSVG = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );

  // SVG for the right arrow
  const RightArrowSVG = () => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );

  const indicatorsStyle = {
    position: 'absolute',
    bottom: '20px', // Slightly higher from the bottom
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '12px', // Increased gap between indicators
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background for dots
    borderRadius: '20px', // More rounded pill shape
    padding: '8px 16px', // Padding around dots
    zIndex: 10,
  };

  const indicatorStyle = (isActive) => ({
    width: '12px', // Larger dots
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: isActive ? '#8fbc8f' : 'rgba(255, 255, 255, 0.6)', // SWAAS green for active, translucent white for inactive
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    outline: 'none',
  });

  const descriptionStyle = {
    padding: '30px', // Increased padding for description
    flexGrow: 1,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: '#ffffff', // Clean white for description background
    borderBottomLeftRadius: '16px', // Match content border-radius
    borderBottomRightRadius: '16px',
  };

  const descriptionTextStyle = {
    color: '#555', // Softer black for text
    lineHeight: '1.8', // Increased line height for readability
    fontSize: '1.1rem', // Slightly larger font size
    margin: 0,
    whiteSpace: 'pre-wrap',
  };

  return (
    <div
      style={modalOverlayStyle}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      // onKeyDown is handled by the useEffect for global keydown events
    >
      <div
        style={modalContentStyle}
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        {/* Header Section */}
        <div style={headerStyle}>
          <h2 id="modal-title" style={titleStyle}>{title}</h2>
          <button
            onClick={onClose}
            style={closeButtonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e0e0e0';
              e.currentTarget.style.color = '#34495e';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#7f8c8d';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Image Slider Section - Only renders if there are images */}
        {images.length > 0 && (
          <div style={sliderContainerStyle}>
            <div style={imageContainerStyle}>
              <img
                key={currentImageIndex} // Key ensures React re-mounts/re-renders, enabling transition
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                style={imageStyle}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Image+Load+Error'; // Larger fallback
                  console.error("Image failed to load:", images[currentImageIndex]);
                }}
              />
            </div>

            {/* Navigation Arrows - Only renders if there's more than one image */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{ ...navButtonStyle, left: '20px' }} // Adjusted position
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #6b8e3d 0%, #556b2f 100%)'; e.currentTarget.style.transform = 'translateY(-50%) translateX(-5px) scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #556b2f 0%, #6b8e3d 100%)'; e.currentTarget.style.transform = 'translateY(-50%) translateX(0) scale(1)'; }}
                  aria-label="Previous image"
                >
                  <LeftArrowSVG />
                </button>
                <button
                  onClick={nextImage}
                  style={{ ...navButtonStyle, right: '20px' }} // Adjusted position
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #6b8e3d 0%, #556b2f 100%)'; e.currentTarget.style.transform = 'translateY(-50%) translateX(5px) scale(1.05)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #556b2f 0%, #6b8e3d 100%)'; e.currentTarget.style.transform = 'translateY(-50%) translateX(0) scale(1)'; }}
                  aria-label="Next image"
                >
                  <RightArrowSVG />
                </button>
              </>
            )}

            {/* Image Indicators (dots) - Only renders if there's more than one image */}
            {images.length > 1 && (
              <div style={indicatorsStyle}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    style={indicatorStyle(index === currentImageIndex)}
                    onMouseEnter={(e) => {
                      if (index !== currentImageIndex) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                      e.currentTarget.style.transform = 'scale(1.2)'; // More pronounced scale
                    }}
                    onMouseLeave={(e) => {
                      if (index !== currentImageIndex) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    aria-label={`Go to image ${index + 1}`}
                    aria-current={index === currentImageIndex ? 'true' : 'false'}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Description Section */}
        <div style={descriptionStyle}>
          <p style={descriptionTextStyle}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;