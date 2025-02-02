import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CreateEvent.css';
import './index.css';

interface EventFormData {
    title: string;
    description: string;
    category: string;
    date: string;
    time: string;
    location: string;
    venue: string;
    price: string;
    total_tickets: string;
    image_url?: string;
  }
  
  const CreateEvent = () => {
    const navigate = useNavigate(); // Add this hook inside the component
    const [formData, setFormData] = useState<EventFormData>({
      title: '',
      description: '',
      category: 'Concerts',
      date: '',
      time: '',
      location: '',
      venue: '',
      price: '',
      total_tickets: '',
      image_url: ''
    });
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
        return;
      }
  
      const { id: creator_id } = JSON.parse(user);
  
      try {
        const response = await fetch('http://localhost:3001/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            creator_id,
            price: parseFloat(formData.price),
            total_tickets: parseInt(formData.total_tickets)
            // available_tickets will be set on the server
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to create event');
        }
  
        navigate('/');
      } catch (error) {
        console.error('Error creating event:', error);
      }
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="create-event-container">
      <div className="create-event-box">
        <h2>Sukurti Naują Renginį</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Pavadinimas</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Aprašymas</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategorija</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Concerts">Koncertai</option>
              <option value="Sports">Sportas</option>
              <option value="Festivals">Festivaliai</option>
              <option value="Theatre">Teatras</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Data</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Laikas</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Miestas</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue">Vieta</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Kaina (€)</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="total_tickets">Viso bilietų</label>
              <input
                type="number"
                id="total_tickets"
                name="total_tickets"
                min="1"
                value={formData.total_tickets}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Nuotraukos URL (neprivaloma)</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="create-button">
            Sukurti Renginį
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;