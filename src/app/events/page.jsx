"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import eventsData from "./EventData.jsx";
import EventCard from "../components/EventsCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { useRouter } from "next/navigation";
import DecorativeLeaves from "../components/DecorativeLeaves.jsx";
import "../globals.css";

const Events = () => {
  const [events, setEvents] = useState(eventsData);
  const [selectedCategory, setSelectedCategory] = useState("Past Events");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Helper map to convert month names to numbers for sorting
  const monthsMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  // Helper function to parse event dates for reliable sorting
  const parseEventDate = (event) => {
    const day = parseInt(event.date, 10);
    const month = monthsMap[event.month];
    const year = parseInt(event.year, 10);
    return new Date(year, month, day);
  };

  useEffect(() => {
    // Initial sort of static data
    const sortedInitialData = { ...eventsData };
    for (const category in sortedInitialData) {
      if (Array.isArray(sortedInitialData[category])) {
        sortedInitialData[category].sort(
          (a, b) => parseEventDate(b) - parseEventDate(a)
        );
      }
    }
    setEvents(sortedInitialData);

    const fetchAndMergeEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/events");
        const dynamicData = res.data;

        // Start with a deep copy of the already sorted static data
        const mergedData = JSON.parse(JSON.stringify(sortedInitialData));

        // Merge dynamic data, avoiding duplicates
        for (const category in dynamicData) {
          if (dynamicData.hasOwnProperty(category)) {
            dynamicData[category].forEach((dynamicEvent) => {
              const isDuplicate = mergedData[category].some(
                (staticEvent) => staticEvent.title === dynamicEvent.title
              );
              if (!isDuplicate) {
                mergedData[category].push(dynamicEvent);
              }
            });
          }
        }

        // Re-sort each category after merging to ensure correct order
        for (const category in mergedData) {
          if (Array.isArray(mergedData[category])) {
            mergedData[category].sort(
              (a, b) => parseEventDate(b) - parseEventDate(a)
            );
          }
        }

        setEvents(mergedData);
      } catch (err) {
        console.error(
          "Failed to fetch dynamic events, showing static data only.",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAndMergeEvents();
  }, []);

  const currentEvents = events[selectedCategory] || [];
  const goToAdmin = () => {
    router.push("/admin");
  };
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

          <header className={`teamHeader`} onDoubleClick={goToAdmin}>
            <h1>OUR EVENTS</h1>
          </header>

          <nav className={`categoryNav`}>
            {Object.keys(events).map((eventType) => (
              <button
                key={eventType}
                className={`categoryButton ${
                  selectedCategory === eventType ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(eventType)}
              >
                {eventType}
              </button>
            ))}
          </nav>

          <div className={`eventsContainer`}>
            {loading && (
              <div className="loaderContainer">
                <div className="loader"></div>
              </div>
            )}{" "}
            {currentEvents.length > 0 ? (
              currentEvents.map((event, index) => (
                <EventCard
                  key={`${event.title}-${index}`}
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
                <h2>No Events Found in this Category.</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
