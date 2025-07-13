import { useState } from 'react';

const EventCard = ({ date, month, year, imageUrl, title, description }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	const shortDescription = description.length > 200 ? description.slice(0, 200) + '...' : description;

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
				</div>
				<div className="text-content">
					<h2 className="title">{title}</h2>
					<p className="description">
						{expanded ? description : shortDescription}
					</p>
					{description.length > 200 && (
						<button className="see-more" onClick={toggleExpand}>
							{expanded ? 'See less' : 'See more'} <span className="icon">▶</span>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventCard;
