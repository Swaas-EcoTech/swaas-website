const EventCard = () => {
	return (
		<div className="card-container">
			<div className="date-bubble">
				<span className="date-bubble-text">3rd</span>
				<span className="date-bubble-text">November,</span>
				<span className="date-bubble-text">2023</span>
			</div>
			<div className="content-box">
				<div className="image-wrapper">
					<div className="image-background"></div>
					<img className="image" src="https://www.gtbit.ac.in/assets/img/swaas/2swass.jpg" alt="Placeholder" />
				</div>
				<div className="text-content">
					<h2 className="title">Loren Ipsum</h2>
					<p className="description">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum..
					</p>
					<button className="see-more">See more <span className="icon">▶</span></button>
				</div>
			</div>
		</div>
	);
};

export default EventCard;