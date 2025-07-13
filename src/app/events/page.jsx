'use client';
import  { useState } from 'react';
import eventsData from './EventData.jsx';
import EventCard from '../components/EventsCard.jsx';
import Navbar from '../components/Navbar.jsx';
import DecorativeLeaves from '../components/DecorativeLeaves.jsx';
import BottomDecorations from '../components/BottomDecorations.jsx';
const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState("Upcoming Events");


  return (
    <div>
      <Navbar />
      <DecorativeLeaves />
    <div className="pageBackground">
      <div className="teamContainer">
        {/* <img
          src='/image-5.png'
          alt="Decorative Leaf"
          className={`leafDecoration leafTopRight`}
        />
        <img
          src='/image-5.png'
          alt="Decorative Leaf"
          className={`leafDecoration leafBottomLeft`}
        /> */}

        <div className={`diamondDecoration diamond1`}></div>
        <div className={`diamondDecoration diamond2`}></div>
        <div className={`diamondDecoration diamond3`}></div>
        <div className={`diamondDecoration diamond4`}></div>

        <header className={`teamHeader`}>
          <h1>Events</h1>
        </header>

        <nav className={`categoryNav`}>
          {Object.keys(eventsData).map((eventType) => (
            <button
              key={eventType}
              className={`categoryButton ${selectedEvent === eventType ? 'active' : ''
                }`}
              onClick={() => setSelectedEvent(eventType)}
            >
              {eventType}
            </button>
          ))}
          <div className={`wavyLine`}>
            <img src={'/img1.png'} alt="Wavy line decoration" />
          </div>
        </nav>

<div className={`eventsContainer`}>
  {eventsData[selectedEvent]?.map((event, index) => (
    <EventCard
      key={index}
      date={event.date}
      month={event.month}
      year={event.year}
      title={event.title}
      description={event.description}
      imageUrl={event.imageUrl}
    />
  ))}
</div>



        
      </div>
      <img
        src={'/image-14.png'}
        alt="Bottom Left Decoration"
        className={`bottomLeftImage`}
      />
      <img
        src={'/image-10.png'}
        alt="Bottom Right Decoration"
        className={`bottomRightImage`}
      />
      
    </div>
    </div>
  );
}

export default Events