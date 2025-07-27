// src/components/EventCard.js
import { useState } from 'react';
import ProjectModal from './EventModal'; // Import the ProjectModal component

const EventCard = ({
  date,
  month,
  year,
  imageUrl,
  title,
  description,
  instagramLink,
  projectImages = [], // This prop receives the array of image paths
}) => {
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  // Determine if the description is long enough to warrant a "See more" button
  const isLongDescription = description.length > 200;
  // Create a short version of the description for the card itself
  const shortDescription = isLongDescription
    ? description.slice(0, 200) + '...'
    : description;

  // Function to handle the click on "Event Details" button
  const handleSeeMoreClick = () => {
    setModalOpen(true); // Always open the modal when this button is clicked
  };

  return (
    <div className="card-container">
      {/* Date Bubble Section */}
      <div className="date-bubble">
        <span className="date-bubble-text">{date}</span>
        <span className="date-bubble-text">{month},</span>
        <span className="date-bubble-text">{year}</span>
      </div>

      {/* Content Box Section */}
      <div className="content-box">
        {/* Image Wrapper for the main event image */}
        <div className="image-wrapper">
          <div className="image-background"></div> {/* Optional background effect */}
          <img 
            className="image" 
            src={imageUrl} // Main event image
            alt={title} 
            onError={(e) => { // Fallback for main image
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

        {/* Text Content Section */}
        <div className="text-content">
          <h2 className="title">{title}</h2>
          {/* Display the short description on the card */}
          <p className="description">{shortDescription}</p> 

          {/* "Event Details" Button - Only shown if description is long */}
          {isLongDescription && (
            <button className="see-more" onClick={handleSeeMoreClick}>
              Event Details <span className="icon">▶</span>
            </button>
          )}
          
          {/* Project Modal Component */}
          <ProjectModal 
            isOpen={modalOpen} // Controls if the modal is visible
            onClose={() => setModalOpen(false)} // Function to close the modal
            title={title} // Pass event title to modal
            description={description} // Pass FULL description to modal
            images={projectImages} // Pass the array of project images to modal
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;