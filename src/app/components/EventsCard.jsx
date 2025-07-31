import { useState } from 'react';
import ProjectModal from './EventModal';

const EventCard = ({
  date,
  month,
  year,
  imageUrl,
  title,
  description,
  instagramLink,
  projectImages = [],
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const isLongDescription = description.length > 200;
  const shortDescription = isLongDescription
    ? description.slice(0, 200) + '...'
    : description;

  // ✅ New logic: show button if description is long OR there are gallery images
  const hasGalleryImages = projectImages && projectImages.length > 0;
  const showDetailsButton = isLongDescription || hasGalleryImages;

  const handleSeeMoreClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="card-container">
      <div className="date-bubble">
        <span className="date-bubble-text">{date}</span>
        <span className="date-bubble-text">{month},</span>
        <span className="date-bubble-text">{year}</span>
      </div>

      <div className="content-box">
        <div className="image-wrapper">
          <div className="image-background"></div>
          <img 
            className="image" 
            src={imageUrl}
            alt={title} 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/200x200?text=Event+Image';
              console.error("Event Card Image failed to load:", imageUrl);
            }}
          />
          {instagramLink && (
            <a
              className="instagram-link"
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              🌱 View on Instagram
            </a>
          )}
        </div>

        <div className="text-content">
          <h2 className="title">{title}</h2>
          <p className="description">{shortDescription}</p> 

          {/* ✅ Use the new variable to render the button conditionally */}
          {showDetailsButton && (
            <button className="see-more" onClick={handleSeeMoreClick}>
              Event Details <span className="icon">▶</span>
            </button>
          )}
          
          <ProjectModal 
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title={title}
            description={description}
            images={projectImages}
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;