import { useState } from 'react';

const EventCard = ({
  date,
  month,
  year,
  imageUrl,
  title,
  description,
  instagramLink,
}) => {
  const [expanded, setExpanded] = useState(false);

  const isLongDescription = description.length > 200;
  const shortDescription = isLongDescription
    ? description.slice(0, 200) + '...'
    : description;

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
          <img className="image" src={imageUrl} alt="Event" />
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
          <p className="description">{expanded ? description : shortDescription}</p>

          {/* Show button only if not expanded */}
          {!expanded && isLongDescription && (
            <button className="see-more" onClick={() => setExpanded(true)}>
              See more <span className="icon">▶</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
