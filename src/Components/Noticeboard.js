

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Noticeboard.css';

const CookingEvents = () => {
  // State to hold events data
  const [events, setEvents] = useState([]);

  // Fetch events from backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8080/api/notices') // Use your backend API URL here
      .then((response) => {
        setEvents(response.data); // Update state with the fetched events
      })
      .catch((error) => {
        console.error("There was an error fetching the events:", error);
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="events-page">
      <header className="navbar">
        <div className="navbar-title">
          <h1>Cooking Events</h1>
        </div>
        <nav className="nav-links">
          <ul>
            <li><a href="/recipe">Home</a></li>
            <li><a href="/help">Help</a></li>
            <li><a href="#events">Upcoming Events</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2 className="main-heading">Ready Amazing Cooking Events!!!!</h2>
        <div className="events-grid">
  {events.length > 0 ? (
    events.map((event) => (
      <div key={event.id} className="event-card">
        <div className="event-date">{event.date}</div>
        <h3 className="event-title">{event.title}</h3>
        <p><strong>Event Date & Time:</strong> {event.dateTime}</p>
        <p><strong>Description:</strong> {event.content}</p> {/* Corrected field name */}
        <p><strong>Location:</strong> {event.location}</p>
      </div>
    ))
  ) : (
    <p>No events found</p>
  )}
</div>

      </main>
    </div>
  );
};

export default CookingEvents;