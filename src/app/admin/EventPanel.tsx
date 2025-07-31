"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./EventPanel.css";
import Navbar from "../components/Navbar";

export default function EventsPanel() {
  const [events, setEvents] = useState({
    'Past Events': [],
    'Upcoming Events': [],
    'Signature Events': []
  });
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Past Events');
  const [imageUploading, setImageUploading] = useState(false);
  
  const [eventForm, setEventForm] = useState({
    date: "",
    month: "",
    year: new Date().getFullYear().toString(),
    title: "",
    description: "",
    imageUrl: "",
    projectImages: [],
    instagramLink: "",
    category: "Upcoming Events"
  });

  const router = useRouter();

  // Helper map to convert month names to numbers for sorting
  const monthsMap = { "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5, "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11 };

  // Helper function to parse event dates for reliable sorting
  const parseEventDate = (event) => {
    const day = parseInt(event.date, 10);
    const month = monthsMap[event.month];
    const year = parseInt(event.year, 10);
    return new Date(year, month, day);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/events");
      const fetchedData = res.data;

      // ✅ Sort each category by date (newest first) after fetching
      for (const category in fetchedData) {
        if (Array.isArray(fetchedData[category])) {
          fetchedData[category].sort((a, b) => parseEventDate(b) - parseEventDate(a));
        }
      }

      setEvents(fetchedData); // Set the sorted data

    } catch (err) {
      console.error("Failed to fetch events", err);
      alert("Could not fetch events. Please check your connection or API.");
    } finally {
        setLoading(false);
    }
  };

  const resetForm = () => {
    setEventForm({
      date: "",
      month: "",
      year: new Date().getFullYear().toString(),
      title: "",
      description: "",
      imageUrl: "",
      projectImages: [],
      instagramLink: "",
      category: "Upcoming Events"
    });
  };

  const handleImageUpload = async (file, isMainImage = true) => {
    if (!file) return "";

    setImageUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); 

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      
      if (data.secure_url) {
        if (isMainImage) {
          setEventForm(prev => ({ ...prev, imageUrl: data.secure_url }));
        } else {
          setEventForm(prev => ({
            ...prev,
            projectImages: [...prev.projectImages, data.secure_url]
          }));
        }
        return data.secure_url;
      } else {
        throw new Error(data.error?.message || 'Cloudinary upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please check console for details.');
    } finally {
      setImageUploading(false);
    }
    return "";
  };

  const removeProjectImage = (indexToRemove) => {
    setEventForm(prev => ({
      ...prev,
      projectImages: prev.projectImages.filter((_, index) => index !== indexToRemove)
    }));
  };

  const validateForm = (form) => {
    return form.date.trim() &&
           form.month.trim() &&
           form.year.trim() &&
           form.title.trim() &&
           form.description.trim() &&
           form.imageUrl.trim();
  };

  const createEvent = async () => {
    if (!validateForm(eventForm)) {
      alert("Please fill in all required fields (*) and ensure the main image has finished uploading.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/events", eventForm, { withCredentials: true });
      await fetchEvents();
      setShowCreateForm(false);
      resetForm();
      alert("Event created successfully!");
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to create event";
      alert(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (event) => {
    setEditingEvent(event);
    setShowCreateForm(false);
    setEventForm({
      date: event.date,
      month: event.month,
      year: event.year,
      title: event.title,
      description: event.description,
      imageUrl: event.imageUrl,
      projectImages: event.projectImages || [],
      instagramLink: event.instagramLink || "",
      category: event.category
    });
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    resetForm();
  };

  const saveEdit = async () => {
    if (!editingEvent) return;
    if (!validateForm(eventForm)) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`/api/events/${editingEvent._id}`, eventForm, {
        withCredentials: true,
      });
      await fetchEvents();
      cancelEdit();
      alert("Event updated successfully!");
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Failed to update event";
      alert(errorMsg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return;
    }
    setDeleteLoading(id);
    try {
      await axios.delete(`/api/events/${id}`, { withCredentials: true });
      await fetchEvents();
      alert("Event deleted successfully!");
    } catch (err) {
      alert("Failed to delete event. Please try again.");
      console.error(err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      try {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/login");
      } catch (err) {
        console.error("Logout failed", err);
      }
    }
  };

  const truncateContent = (content, maxLength = 200) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentEvents = events[selectedCategory] || [];

  return (
    <div className="events-panel">
      <Navbar />

      <header className="events-header">
        <div className="header-content">
          <h1>SWAAS Events Manager</h1>
          <p className="header-subtitle">Create and manage events for SWAAS - The EcoTech Society</p>
          <div className="swaas-badge"><span className="eco-icon">🎉</span><span>Events Dashboard</span></div>
        </div>
        <div className="header-actions">
          <button onClick={() => { setShowCreateForm(!showCreateForm); if (editingEvent) cancelEdit(); }} className="create-button" disabled={loading}>
            <span className="create-icon">+</span>{showCreateForm ? 'Cancel' : 'Create Event'}
          </button>
          <button onClick={handleLogout} className="logout-button"><span className="logout-icon">🚪</span>Logout</button>
        </div>
      </header>

      {showCreateForm && (
        <div className="create-form-container">
          <div className="create-form">
            <h2>Create New Event</h2>
            <div className="form-grid">
              <div className="form-group"><label>Date *</label><input type="text" value={eventForm.date} onChange={(e) => setEventForm({...eventForm, date: e.target.value})} placeholder="e.g., 21st, 15th" className="form-input"/></div>
              <div className="form-group"><label>Month *</label><select value={eventForm.month} onChange={(e) => setEventForm({...eventForm, month: e.target.value})} className="form-input"><option value="">Select Month</option>{months.map(month => (<option key={month} value={month}>{month}</option>))}</select></div>
              <div className="form-group"><label>Year *</label><input type="number" value={eventForm.year} onChange={(e) => setEventForm({...eventForm, year: e.target.value})} className="form-input" min="2020" max="2030"/></div>
              <div className="form-group"><label>Category *</label><select value={eventForm.category} onChange={(e) => setEventForm({...eventForm, category: e.target.value})} className="form-input"><option value="Upcoming Events">Upcoming Events</option><option value="Past Events">Past Events</option><option value="Signature Events">Signature Events</option></select></div>
            </div>
            <div className="form-group"><label>Event Title *</label><input type="text" value={eventForm.title} onChange={(e) => setEventForm({...eventForm, title: e.target.value})} placeholder="Enter event title" className="form-input" maxLength={200}/></div>
            <div className="form-group"><label>Description *</label><textarea value={eventForm.description} onChange={(e) => setEventForm({...eventForm, description: e.target.value})} placeholder="Describe the event in detail..." className="form-textarea" rows={6} maxLength={5000}/></div>
            <div className="form-group">
              <label>Main Event Image *</label>
              <div className="image-upload-section">
                <input type="file" accept="image/*" onChange={(e) => {const file = e.target.files?.[0]; if (file) handleImageUpload(file, true);}} className="file-input" disabled={imageUploading}/>
                {imageUploading && <p>Uploading...</p>}
                {eventForm.imageUrl && (<div className="image-preview"><img src={eventForm.imageUrl} alt="Main event" /></div>)}
              </div>
            </div>
            <div className="form-group">
              <label>Project Images (Gallery)</label>
              <div className="image-upload-section">
                <input type="file" accept="image/*" multiple onChange={(e) => {const files = Array.from(e.target.files || []); files.forEach(file => handleImageUpload(file, false));}} className="file-input" disabled={imageUploading}/>
                <div className="project-images-preview">
                  {eventForm.projectImages.map((img, index) => (<div key={index} className="project-image-item"><img src={img} alt={`Project ${index + 1}`} /><button type="button" onClick={() => removeProjectImage(index)} className="remove-image-btn">×</button></div>))}
                </div>
              </div>
            </div>
            <div className="form-group"><label>Instagram Link</label><input type="url" value={eventForm.instagramLink} onChange={(e) => setEventForm({...eventForm, instagramLink: e.target.value})} placeholder="https://instagram.com/..." className="form-input"/></div>
            <div className="form-actions">
              <button onClick={createEvent} disabled={loading || imageUploading} className="save-button">{imageUploading ? "📷 Uploading..." : loading ? "🌱 Creating..." : "Create Event"}</button>
              <button onClick={() => {setShowCreateForm(false); resetForm();}} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="category-nav">
        {Object.keys(events).map((category) => (<button key={category} className={`category-button ${selectedCategory === category ? 'active' : ''}`} onClick={() => setSelectedCategory(category)}>{category} ({events[category].length})</button>))}
      </div>

      <main className="events-grid">
        {currentEvents.length === 0 && !loading ? (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <h3>No {selectedCategory} Yet</h3>
            <p>{selectedCategory === 'Upcoming Events' ? 'Create your first upcoming event to get started!' : `No events in the ${selectedCategory} category yet.`}</p>
          </div>
        ) : (
          currentEvents.map((event) => (
            <article className="event-card" key={event._id}>
              {editingEvent?._id === event._id ? (
                <form className="edit-form" onSubmit={(e) => {e.preventDefault(); saveEdit();}}>
                  <p>Editing: {event.title}</p>
                  <div className="form-group"><label>Title *</label><input type="text" value={eventForm.title} onChange={(e) => setEventForm({...eventForm, title: e.target.value})} className="form-input" /></div>
                  <div className="form-group"><label>Description *</label><textarea value={eventForm.description} onChange={(e) => setEventForm({...eventForm, description: e.target.value})} className="form-textarea" rows={4} /></div>
                  <div className="form-actions"><button type="submit" disabled={loading} className="save-button">{loading ? "🌱 Saving..." : "Save Changes"}</button><button type="button" onClick={cancelEdit} className="cancel-button" disabled={loading}>Cancel</button></div>
                </form>
              ) : (
                <div className="event-content">
                  <header className="event-header">
                    <div className="event-date"><span className="date">{event.date}</span><span className="month">{event.month}</span><span className="year">{event.year}</span></div>
                    <div className="event-category"><span className={`category-badge ${event.category.toLowerCase().replace(' ', '-')}`}>{event.category}</span></div>
                    <div className="event-actions">
                      <button onClick={() => startEdit(event)} className="edit-button" disabled={loading || deleteLoading === event._id}>Edit</button>
                      <button onClick={() => deleteEvent(event._id)} disabled={loading || deleteLoading === event._id} className="delete-button">{deleteLoading === event._id ? "⏳" : "Delete"}</button>
                    </div>
                  </header>
                  <h3 className="event-title">{event.title}</h3>
                  <div className="event-text">{truncateContent(event.description)}</div>
                  {event.imageUrl && (<div className="event-image-container"><img src={event.imageUrl} alt={event.title} className="event-image" loading="lazy" /></div>)}
                  {event.projectImages && event.projectImages.length > 0 && (
                    <div className="project-images-gallery">
                      <h4>Gallery ({event.projectImages.length} images)</h4>
                      <div className="gallery-preview">
                        {event.projectImages.slice(0, 4).map((img, index) => (<img key={index} src={img} alt={`Gallery ${index + 1}`} />))}
                        {event.projectImages.length > 4 && (<div className="more-images">+{event.projectImages.length - 4}</div>)}
                      </div>
                    </div>
                  )}
                  {event.instagramLink && (<div className="instagram-link"><a href={event.instagramLink} target="_blank" rel="noopener noreferrer">📸 View on Instagram</a></div>)}
                </div>
              )}
            </article>
          ))
        )}
      </main>
    </div>
  );
}