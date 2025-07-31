"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./EventPanel.css";
import Navbar from "../components/Navbar";

// Define the Event interface
interface Event {
  _id: string;
  date: string;
  month: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  projectImages?: string[];
  instagramLink?: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function EventsPanel() {
  const [events, setEvents] = useState({
    'Past Events': [] as Event[],
    'Upcoming Events': [] as Event[],
    'Signature Events': [] as Event[]
  });
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Past Events');
  const [imageUploading, setImageUploading] = useState(false);
  
  const [eventForm, setEventForm] = useState({
    date: "",
    month: "",
    year: new Date().getFullYear().toString(),
    title: "",
    description: "",
    imageUrl: "",
    projectImages: [] as string[],
    instagramLink: "",
    category: "Upcoming Events"
  });

  const router = useRouter();

  const monthsMap: { [key: string]: number } = { "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5, "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11 };

  const parseEventDate = (event: Event) => {
    const day = parseInt(event.date, 10);
    const month = monthsMap[event.month];
    const year = parseInt(event.year, 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return new Date(0); // Return epoch for invalid dates
    }
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

      for (const category in fetchedData) {
        if (Array.isArray(fetchedData[category])) {
          fetchedData[category].sort((a: Event, b: Event) => parseEventDate(b).getTime() - parseEventDate(a).getTime());
        }
      }

      setEvents(fetchedData);
    } catch (err) {
      console.error("Failed to fetch events", err);
      alert("Could not fetch events.");
    } finally {
        setLoading(false);
    }
  };

  const resetForm = () => {
    setEventForm({
      date: "", month: "", year: new Date().getFullYear().toString(),
      title: "", description: "", imageUrl: "",
      projectImages: [], instagramLink: "", category: "Upcoming Events"
    });
  };

  const handleImageUpload = async (file: File, isMainImage = true) => {
    if (!file) return "";
    setImageUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); 

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
      const data = await response.json();
      
      if (data.secure_url) {
        if (isMainImage) {
          setEventForm(prev => ({ ...prev, imageUrl: data.secure_url }));
        } else {
          setEventForm(prev => ({ ...prev, projectImages: [...prev.projectImages, data.secure_url] }));
        }
      } else { throw new Error(data.error?.message || 'Cloudinary upload failed'); }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    } finally {
      setImageUploading(false);
    }
  };
  
  const removeMainImage = () => { setEventForm(prev => ({ ...prev, imageUrl: "" })); };
  const removeProjectImage = (indexToRemove: number) => { setEventForm(prev => ({ ...prev, projectImages: prev.projectImages.filter((_, index) => index !== indexToRemove) })); };
  const validateForm = (form: typeof eventForm) => form.date.trim() && form.month.trim() && form.year.trim() && form.title.trim() && form.description.trim() && form.imageUrl.trim();

  // ✅ RE-ADDED: The createEvent function needed for the form.
  const createEvent = async () => {
    if (!validateForm(eventForm)) {
      alert("Please fill in all required fields (*).");
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
      alert("Failed to create event.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (event: Event) => {
    setEditingEvent(event);
    setShowCreateForm(false);
    setEventForm({
      date: event.date, month: event.month, year: event.year,
      title: event.title, description: event.description, imageUrl: event.imageUrl,
      projectImages: event.projectImages || [], instagramLink: event.instagramLink || "", category: event.category
    });
  };

  const cancelEdit = () => { setEditingEvent(null); resetForm(); };

  const saveEdit = async () => {
    if (!editingEvent || !validateForm(eventForm)) { alert("Please fill in all required fields."); return; }
    setLoading(true);
    try {
      await axios.put(`/api/events/${editingEvent._id}`, eventForm, { withCredentials: true });
      await fetchEvents();
      cancelEdit();
    } catch (err) {
      alert("Failed to update event.");
      console.error(err);
    } finally { setLoading(false); }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    setDeleteLoading(id);
    try {
      await axios.delete(`/api/events/${id}`, { withCredentials: true });
      await fetchEvents();
    } catch (err) {
      alert("Failed to delete event.");
      console.error(err);
    } finally { setDeleteLoading(null); }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      try { await fetch("/api/admin/logout", { method: "POST" }); router.push("/login"); }
      catch (err) { console.error("Logout failed", err); }
    }
  };

  const truncateContent = (content: string, maxLength = 150) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };
  
  // ✅ RE-ADDED: The 'months' array needed for the form dropdown.
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentEvents = events[selectedCategory as keyof typeof events] || [];

  return (
    <div className="events-panel">
      <Navbar />

      <header className="events-header">
        <div className="header-content">
          <h1>SWAAS Events Manager</h1>
          <p className="header-subtitle">Create and manage events for SWAAS - The EcoTech Society</p>
        </div>
        <div className="header-actions">
          <button onClick={() => { setShowCreateForm(!showCreateForm); if (editingEvent) cancelEdit(); resetForm(); }} className="create-button">
            {showCreateForm ? 'Cancel' : 'Create Event'}
          </button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      
      {/* ✅ NEW: This is the full, working create form. */}
      {showCreateForm && (
        <div className="create-form-container">
          <div className="edit-form"> {/* Reusing styles from edit-form */}
            <h2 className="editing-header">Create New Event</h2>
            <div className="form-grid">
              <div className="form-group"><label>Date *</label><input type="text" value={eventForm.date} onChange={(e) => setEventForm({...eventForm, date: e.target.value})} placeholder="e.g., 21, 15" className="form-input"/></div>
              <div className="form-group"><label>Month *</label><select value={eventForm.month} onChange={(e) => setEventForm({...eventForm, month: e.target.value})} className="form-input"><option value="">Select Month</option>{months.map(month => (<option key={month} value={month}>{month}</option>))}</select></div>
              <div className="form-group"><label>Year *</label><input type="number" value={eventForm.year} onChange={(e) => setEventForm({...eventForm, year: e.target.value})} className="form-input" min="2020" max="2030"/></div>
              <div className="form-group"><label>Category *</label><select value={eventForm.category} onChange={(e) => setEventForm({...eventForm, category: e.target.value})} className="form-input"><option value="Upcoming Events">Upcoming Events</option><option value="Past Events">Past Events</option><option value="Signature Events">Signature Events</option></select></div>
            </div>
            <div className="form-group"><label>Event Title *</label><input type="text" value={eventForm.title} onChange={(e) => setEventForm({...eventForm, title: e.target.value})} placeholder="Enter event title" className="form-input" maxLength={200}/></div>
            <div className="form-group"><label>Description *</label><textarea value={eventForm.description} onChange={(e) => setEventForm({...eventForm, description: e.target.value})} placeholder="Describe the event..." className="form-textarea" rows={6}/></div>
            <div className="form-group"><label>Main Event Image *</label>
                <div className="image-upload-section">
                    <input type="file" accept="image/*" onChange={(e) => {const file = e.target.files?.[0]; if (file) handleImageUpload(file, true);}} className="file-input" disabled={imageUploading}/>
                    {imageUploading && <p className="upload-status">Uploading...</p>}
                    {eventForm.imageUrl && (<div className="image-preview edit-image-preview"><img src={eventForm.imageUrl} alt="Main event" /></div>)}
                </div>
            </div>
            <div className="form-group"><label>Project Images (Gallery)</label>
                <div className="image-upload-section">
                    <input type="file" accept="image/*" multiple onChange={(e) => {const files = Array.from(e.target.files || []); files.forEach(file => handleImageUpload(file, false));}} className="file-input" disabled={imageUploading}/>
                    <div className="project-images-preview">
                        {eventForm.projectImages.map((img, index) => (<div key={index} className="project-image-item"><img src={img} alt={`Project ${index + 1}`} /><button type="button" onClick={() => removeProjectImage(index)} className="remove-image-btn">×</button></div>))}
                    </div>
                </div>
            </div>
            <div className="form-group"><label>Instagram Link</label><input type="url" value={eventForm.instagramLink} onChange={(e) => setEventForm({...eventForm, instagramLink: e.target.value})} placeholder="https://instagram.com/..." className="form-input"/></div>

            <div className="form-actions">
              <button onClick={createEvent} disabled={loading || imageUploading} className="save-button">{imageUploading ? "Uploading..." : loading ? "Creating..." : "Create Event"}</button>
              <button onClick={() => { setShowCreateForm(false); resetForm(); }} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="category-nav">
        {Object.keys(events).map((category) => (
            <button key={category} className={`category-button ${selectedCategory === category ? 'active' : ''}`} onClick={() => setSelectedCategory(category)}>
                {category} ({events[category as keyof typeof events].length})
            </button>
        ))}
      </div>

      <main className="events-grid">
        {loading ? ( <p>Loading events...</p> ) : currentEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <h3>No {selectedCategory} Yet</h3>
            <p>Create a new event or check another category.</p>
          </div>
        ) : (
          currentEvents.map((event) => (
            <article className="event-card" key={event._id}>
              {editingEvent?._id === event._id ? (
                // EDITING FORM
                <form className="edit-form" onSubmit={(e) => { e.preventDefault(); saveEdit(); }}>
                  <p className="editing-header">Editing: <strong>{event.title || 'Untitled Event'}</strong></p>
                  
                  <div className="form-group"><label>Title *</label><input type="text" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="form-input" /></div>
                  <div className="form-group"><label>Description *</label><textarea value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} className="form-textarea" rows={4} /></div>
                  <div className="form-group"><label>Category *</label>
                    <select value={eventForm.category} onChange={(e) => setEventForm({...eventForm, category: e.target.value})} className="form-input">
                        <option value="Upcoming Events">Upcoming Events</option><option value="Past Events">Past Events</option><option value="Signature Events">Signature Events</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Main Event Image *</label>
                    <div className="image-upload-section">
                      <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, true); }} className="file-input" disabled={imageUploading}/>
                      {imageUploading && <p className="upload-status">Uploading...</p>}
                      {eventForm.imageUrl && (
                        <div className="image-preview edit-image-preview">
                          <img src={eventForm.imageUrl} alt="Main event" />
                          <button type="button" onClick={removeMainImage} className="remove-image-btn" title="Remove main image">×</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Project Images (Gallery)</label>
                    <div className="image-upload-section">
                      <input type="file" accept="image/*" multiple onChange={(e) => { const files = Array.from(e.target.files || []); files.forEach(file => handleImageUpload(file, false)); }} className="file-input" disabled={imageUploading}/>
                      {eventForm.projectImages.length > 0 && 
                        <div className="project-images-preview">
                          {eventForm.projectImages.map((img, index) => (
                            <div key={index} className="project-image-item">
                              <img src={img} alt={`Project ${index + 1}`} />
                              <button type="button" onClick={() => removeProjectImage(index)} className="remove-image-btn">×</button>
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" disabled={loading || imageUploading} className="save-button">{loading ? "Saving..." : "Save Changes"}</button>
                    <button type="button" onClick={cancelEdit} className="cancel-button" disabled={loading}>Cancel</button>
                  </div>
                </form>
              ) : (
                // DEFAULT CARD VIEW
                <>
                  {event.imageUrl && <img src={event.imageUrl} alt={event.title || 'Event Image'} className="event-image"/>}
                  <div className="event-content">
                    <header className="event-header">
                      <div className="event-date">
                        <span className="date">{event.date || '??'}</span>
                        <span className="month">{event.month?.substring(0, 3) || 'N/A'}</span>
                      </div>
                      <div className="event-category">
                        <span className={`category-badge ${event.category?.toLowerCase().replace(' ', '-')}`}>
                          {event.category || 'Uncategorized'}
                        </span>
                      </div>
                    </header>
                    <h3 className="event-title">{event.title || 'Untitled Event'}</h3>
                    <p className="event-text">{truncateContent(event.description || 'No description provided.')}</p>
                    <footer className="event-footer">
                      <div className="event-actions">
                        <button onClick={() => startEdit(event)} className="edit-button">Edit</button>
                        <button onClick={() => deleteEvent(event._id)} className="delete-button" disabled={deleteLoading === event._id}>
                          {deleteLoading === event._id ? "..." : "Delete"}
                        </button>
                      </div>
                      {event.instagramLink && <div className="instagram-link"><a href={event.instagramLink} target="_blank" rel="noopener noreferrer">View Post</a></div>}
                    </footer>
                  </div>
                </>
              )}
            </article>
          ))
        )}
      </main>
    </div>
  );
}