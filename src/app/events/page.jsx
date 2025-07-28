'use client';
import { useState } from 'react';
import eventsData from './EventData.jsx';
import EventCard from '../components/EventsCard.jsx';
import Navbar from '../components/Navbar.jsx';
import DecorativeLeaves from '../components/DecorativeLeaves.jsx';
import BottomDecorations from '../components/BottomDecorations.jsx';
import "../globals.css"

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState("Past Events");

  return (
    <div>
      <Navbar />
      <DecorativeLeaves />
      <div className="pageBackground">
        <div className="teamContainer">
          <div className={`diamondDecoration diamond1`}></div>
          <div className={`diamondDecoration diamond2`}></div>
          <div className={`diamondDecoration diamond3`}></div>
          <div className={`diamondDecoration diamond4`}></div>

          <header className={`teamHeader`}>
            <h1>OUR EVENTS</h1>
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
          </nav>

          <div className={`eventsContainer`}>
            {eventsData[selectedEvent] && eventsData[selectedEvent].length > 0 ? (
              eventsData[selectedEvent].map((event, index) => (
                <EventCard
                  key={index}
                  date={event.date}
                  month={event.month}
                  year={event.year}
                  title={event.title}
                  description={event.description}
                  imageUrl={event.imageUrl}
                  instagramLink={event.instagramLink}
                  projectImages={event.projectImages || []}
                />
              ))
            ) : (
              <div className="noEventsMessage">
                <h2>Events Coming Soon!</h2>
                <p>Stay tuned for exciting updates on our upcoming activities.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;