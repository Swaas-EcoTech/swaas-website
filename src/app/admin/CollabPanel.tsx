// CollabPanel.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./EventPanel.css"; // You can reuse styles from EventPanel
import Navbar from "../components/Navbar";

interface Collab {
  _id: string;
  src: string;
  alt: string;
  impact: string;
  collaborators: string;
  images: string[];
  instagramLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function CollabPanel() {
  const [collabs, setCollabs] = useState<Collab[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCollab, setEditingCollab] = useState<Collab | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  
  const [collabForm, setCollabForm] = useState({
    src: "",
    alt: "",
    impact: "",
    collaborators: "",
    images: [] as string[],
    instagramLink: ""
  });

  const router = useRouter();

  useEffect(() => {
    fetchCollabs();
  }, []);

  const fetchCollabs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/collabs");
      setCollabs(res.data);
    } catch (err) {
      console.error("Failed to fetch collaborations", err);
      alert("Could not fetch collaborations.");
    } finally {
        setLoading(false);
    }
  };

  const resetForm = () => {
    setCollabForm({
      src: "", alt: "", impact: "",
      collaborators: "", images: [], instagramLink: ""
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
          setCollabForm(prev => ({ ...prev, src: data.secure_url }));
        } else {
          setCollabForm(prev => ({ ...prev, images: [...prev.images, data.secure_url] }));
        }
      } else { throw new Error(data.error?.message || 'Cloudinary upload failed'); }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    } finally {
      setImageUploading(false);
    }
  };

  const removeMainImage = () => { setCollabForm(prev => ({ ...prev, src: "" })); };
  const removeProjectImage = (indexToRemove: number) => { setCollabForm(prev => ({ ...prev, images: prev.images.filter((_, index) => index !== indexToRemove) })); };
  const validateForm = (form: typeof collabForm) => form.src.trim() && form.alt.trim() && form.impact.trim() && form.collaborators.trim();

  const createCollab = async () => {
    if (!validateForm(collabForm)) {
      alert("Please fill in all required fields (*).");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/collabs", collabForm, { withCredentials: true });
      await fetchCollabs();
      setShowCreateForm(false);
      resetForm();
      alert("Collaboration created successfully!");
    } catch (err) {
      alert("Failed to create collaboration.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (collab: Collab) => {
    setEditingCollab(collab);
    setShowCreateForm(false);
    setCollabForm({
      src: collab.src,
      alt: collab.alt,
      impact: collab.impact,
      collaborators: collab.collaborators,
      images: collab.images || [],
      instagramLink: collab.instagramLink || ""
    });
  };

  const cancelEdit = () => { setEditingCollab(null); resetForm(); };

  const saveEdit = async () => {
    if (!editingCollab || !validateForm(collabForm)) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`/api/collabs/${editingCollab._id}`, collabForm, { withCredentials: true });
      await fetchCollabs();
      cancelEdit();
    } catch (err) {
      alert("Failed to update collaboration.");
      console.error(err);
    } finally { setLoading(false); }
  };

  const deleteCollab = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collaboration?")) return;
    setDeleteLoading(id);
    try {
      await axios.delete(`/api/collabs/${id}`, { withCredentials: true });
      await fetchCollabs();
    } catch (err) {
      alert("Failed to delete collaboration.");
      console.error(err);
    } finally { setDeleteLoading(null); }
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      try { await fetch("/api/admin/logout", { method: "POST" }); router.push("/login"); }
      catch (err) { console.error("Logout failed", err); }
    }
  };

  return (
    <div className="events-panel"> {/* Reusing events-panel class */}
      <Navbar />

      <header className="events-header">
        <div className="header-content">
          <h1>SWAAS Collaborations Manager</h1>
          <p className="header-subtitle">Create and manage collaboration posts</p>
        </div>
        <div className="header-actions">
          <button onClick={() => { setShowCreateForm(!showCreateForm); if (editingCollab) cancelEdit(); resetForm(); }} className="create-button">
            {showCreateForm ? 'Cancel' : 'Create Collab'}
          </button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      
      {showCreateForm && (
        <div className="create-form-container">
          <div className="edit-form">
            <h2 className="editing-header">Create New Collaboration</h2>
            <div className="form-group"><label>Collaborators *</label><input type="text" value={collabForm.collaborators} onChange={(e) => setCollabForm({...collabForm, collaborators: e.target.value})} placeholder="e.g., Bisleri, Google" className="form-input" maxLength={500}/></div>
            <div className="form-group"><label>Alt Text *</label><input type="text" value={collabForm.alt} onChange={(e) => setCollabForm({...collabForm, alt: e.target.value})} placeholder="e.g., Bisleri Cleanliness Drive" className="form-input" maxLength={200}/></div>
            <div className="form-group"><label>Impact Description *</label><textarea value={collabForm.impact} onChange={(e) => setCollabForm({...collabForm, impact: e.target.value})} placeholder="Describe the collaboration and its impact..." className="form-textarea" rows={6}/></div>

            <div className="form-group"><label>Main Image (src) *</label>
                <div className="image-upload-section">
                    <input type="file" accept="image/*" onChange={(e) => {const file = e.target.files?.[0]; if (file) handleImageUpload(file, true);}} className="file-input" disabled={imageUploading}/>
                    {imageUploading && <p className="upload-status">Uploading...</p>}
                    {collabForm.src && (<div className="image-preview edit-image-preview"><img src={collabForm.src} alt="Main collaboration" /></div>)}
                </div>
            </div>
            <div className="form-group"><label>Additional Images (Gallery)</label>
                <div className="image-upload-section">
                    <input type="file" accept="image/*" multiple onChange={(e) => {const files = Array.from(e.target.files || []); files.forEach(file => handleImageUpload(file, false));}} className="file-input" disabled={imageUploading}/>
                    <div className="project-images-preview">
                        {collabForm.images.map((img, index) => (<div key={index} className="project-image-item"><img src={img} alt={`Collab ${index + 1}`} /><button type="button" onClick={() => removeProjectImage(index)} className="remove-image-btn">×</button></div>))}
                    </div>
                </div>
            </div>
            <div className="form-group"><label>Instagram Link</label><input type="url" value={collabForm.instagramLink} onChange={(e) => setCollabForm({...collabForm, instagramLink: e.target.value})} placeholder="https://instagram.com/..." className="form-input"/></div>

            <div className="form-actions">
              <button onClick={createCollab} disabled={loading || imageUploading} className="save-button">{imageUploading ? "Uploading..." : loading ? "Creating..." : "Create Collab"}</button>
              <button onClick={() => { setShowCreateForm(false); resetForm(); }} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <main className="events-grid"> {/* Reusing styles */}
        {loading ? ( <p>Loading collaborations...</p> ) : collabs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🤝</div>
            <h3>No Collaborations Yet</h3>
            <p>Create a new collaboration post to display it on your collabs page.</p>
          </div>
        ) : (
          collabs.map((collab) => (
            <article className="event-card" key={collab._id}>
              {editingCollab?._id === collab._id ? (
                // EDITING FORM
                <form className="edit-form" onSubmit={(e) => { e.preventDefault(); saveEdit(); }}>
                  <p className="editing-header">Editing: <strong>{collab.collaborators || 'Untitled Collab'}</strong></p>
                  
                  <div className="form-group"><label>Collaborators *</label><input type="text" value={collabForm.collaborators} onChange={(e) => setCollabForm({ ...collabForm, collaborators: e.target.value })} className="form-input" /></div>
                  <div className="form-group"><label>Alt Text *</label><input type="text" value={collabForm.alt} onChange={(e) => setCollabForm({ ...collabForm, alt: e.target.value })} className="form-input" /></div>
                  <div className="form-group"><label>Impact Description *</label><textarea value={collabForm.impact} onChange={(e) => setCollabForm({ ...collabForm, impact: e.target.value })} className="form-textarea" rows={4} /></div>
                  
                  <div className="form-group">
                    <label>Main Image (src) *</label>
                    <div className="image-upload-section">
                      <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, true); }} className="file-input" disabled={imageUploading}/>
                      {imageUploading && <p className="upload-status">Uploading...</p>}
                      {collabForm.src && (
                        <div className="image-preview edit-image-preview">
                          <img src={collabForm.src} alt="Main collab" />
                          <button type="button" onClick={removeMainImage} className="remove-image-btn" title="Remove main image">×</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Additional Images (Gallery)</label>
                    <div className="image-upload-section">
                      <input type="file" accept="image/*" multiple onChange={(e) => { const files = Array.from(e.target.files || []); files.forEach(file => handleImageUpload(file, false)); }} className="file-input" disabled={imageUploading}/>
                      {collabForm.images.length > 0 && 
                        <div className="project-images-preview">
                          {collabForm.images.map((img, index) => (
                            <div key={index} className="project-image-item">
                              <img src={img} alt={`Collab ${index + 1}`} />
                              <button type="button" onClick={() => removeProjectImage(index)} className="remove-image-btn">×</button>
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Instagram Link</label>
                    <input type="url" value={collabForm.instagramLink} onChange={(e) => setCollabForm({ ...collabForm, instagramLink: e.target.value })} className="form-input" placeholder="https://instagram.com/..." />
                  </div>
                  
                  <div className="form-actions">
                    <button type="submit" disabled={loading || imageUploading} className="save-button">{loading ? "Saving..." : "Save Changes"}</button>
                    <button type="button" onClick={cancelEdit} className="cancel-button" disabled={loading}>Cancel</button>
                  </div>
                </form>
              ) : (
                // DEFAULT CARD VIEW
                <>
                  {collab.src && <img src={collab.src} alt={collab.alt || 'Collab Image'} className="event-image"/>}
                  <div className="event-content">
                    <header className="event-header">
                      <h3 className="event-title">{collab.collaborators || 'Untitled Collab'}</h3>
                    </header>
                    <p className="event-text">{collab.impact}</p>
                    <footer className="event-footer">
                      <div className="event-actions">
                        <button onClick={() => startEdit(collab)} className="edit-button">Edit</button>
                        <button onClick={() => deleteCollab(collab._id)} className="delete-button" disabled={deleteLoading === collab._id}>
                          {deleteLoading === collab._id ? "..." : "Delete"}
                        </button>
                      </div>
                      {collab.instagramLink && <div className="instagram-link"><a href={collab.instagramLink} target="_blank" rel="noopener noreferrer">View Post</a></div>}
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