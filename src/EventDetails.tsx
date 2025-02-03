import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventDetails.css';

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

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!event) {
    return <div className="error">Event not found</div>;
  }

  return (
    <div className="event-details-container">
      <div className="event-details-card">
        <div className="event-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Grįžti
          </button>
          <h1>{event.title}</h1>
        </div>

        <div className="event-details-content">
          <div className="event-image-large">
            {event.image_url ? (
              <img src={event.image_url} alt={event.title} />
            ) : (
              <div className="placeholder-image-large">No Image Available</div>
            )}
          </div>

          <div className="event-info-detailed">
            <div className="info-section">
              <h2>Informacija apie renginį</h2>
              <p className="event-description">{event.description}</p>
              
              <div className="event-meta">
                <div className="meta-item">
                  <strong>Data:</strong>
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="meta-item">
                  <strong>Laikas:</strong>
                  <span>{event.time}</span>
                </div>
                <div className="meta-item">
                  <strong>Vieta:</strong>
                  <span>{event.venue}, {event.location}</span>
                </div>
                <div className="meta-item">
                  <strong>Kaina:</strong>
                  <span>€{event.price}</span>
                </div>
                <div className="meta-item">
                  <strong>Liko bilietų:</strong>
                  <span>{event.available_tickets}</span>
                </div>
              </div>
            </div>

            <div className="purchase-section">
              <div className="ticket-price">
                <span className="price">€{event.price}</span>
                <span className="per-ticket">už bilietą</span>
              </div>
              <button className="purchase-button">
                Pirkti Bilietus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;