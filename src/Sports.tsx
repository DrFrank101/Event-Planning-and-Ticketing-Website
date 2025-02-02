// pages/SportsEvents.tsx
import React, { useState, useEffect } from 'react';
import './Events.css';

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  available_tickets: number;
  category: string;
  image_url: string | null;
}

const Sports = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/events/category/Sports');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching sports events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-container">
      <div className="middle-name">
      <h1>Sporto Renginiai</h1>
      </div>
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              {event.image_url ? (
                <img src={event.image_url} alt={event.title} />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
            </div>
            <div className="event-info">
              <h2>{event.title}</h2>
              <p className="event-date">
                {new Date(event.date).toLocaleDateString()} {event.time}
              </p>
              <p className="event-location">{event.location} - {event.venue}</p>
              <p className="event-price">€{event.price}</p>
              <p className="tickets-left">
                Liko bilietų: {event.available_tickets}
              </p>
              <button className="buy-ticket-btn">Pirkti Bilietus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sports