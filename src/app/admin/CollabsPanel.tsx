"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { uploadImageToCloudinary } from "@/lib/clientImageUpload";
import "./CollabsPanel.css";

type Collab = {
  _id: string;
  title: string;
  coverImage: string;
  description?: string;
  impact?: string;
  collaborators?: string;
  galleryImages: string[];
  instagramLink?: string;
  date?: string;
  sortOrder: number;
};

type CollabForm = {
  title: string;
  coverImage: string;
  description: string;
  impact: string;
  collaborators: string;
  galleryImages: string[];
  instagramLink: string;
  date: string;
  sortOrder: number;
};

const initialForm: CollabForm = {
  title: "",
  coverImage: "",
  description: "",
  impact: "",
  collaborators: "",
  galleryImages: [],
  instagramLink: "",
  date: "",
  sortOrder: 0,
};

export default function CollabsPanel() {
  const router = useRouter();
  const [collabs, setCollabs] = useState<Collab[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [editingCollab, setEditingCollab] = useState<Collab | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [form, setForm] = useState<CollabForm>(initialForm);

  useEffect(() => {
    fetchCollabs();
  }, []);

  async function fetchCollabs() {
    try {
      setLoading(true);
      const res = await axios.get("/api/collabs");
      setCollabs((res.data.collabs || []) as Collab[]);
    } catch (error) {
      console.error("Failed to fetch collabs:", error);
      alert("Could not fetch collabs.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm(initialForm);
  }

  function startCreate() {
    setEditingCollab(null);
    setShowCreateForm(true);
    resetForm();
  }

  function startEdit(collab: Collab) {
    setEditingCollab(collab);
    setShowCreateForm(false);
    setForm({
      title: collab.title || "",
      coverImage: collab.coverImage || "",
      description: collab.description || "",
      impact: collab.impact || "",
      collaborators: collab.collaborators || "",
      galleryImages: collab.galleryImages || [],
      instagramLink: collab.instagramLink || "",
      date: collab.date || "",
      sortOrder: collab.sortOrder || 0,
    });
  }

  function cancelEdit() {
    setEditingCollab(null);
    setShowCreateForm(false);
    resetForm();
  }

  async function handleImageUpload(file: File, isCover = false) {
    if (!file) return;
    setImageUploading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(
        file,
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      );

      if (isCover) {
        setForm((prev) => ({ ...prev, coverImage: imageUrl }));
      } else {
        setForm((prev) => ({ ...prev, galleryImages: [...prev.galleryImages, imageUrl] }));
      }
    } catch (error) {
      console.error("Failed to upload collab image:", error);
      alert("Failed to upload image.");
    } finally {
      setImageUploading(false);
    }
  }

  function validateForm(currentForm: CollabForm) {
    return currentForm.title.trim() && currentForm.coverImage.trim();
  }

  async function createCollab() {
    if (!validateForm(form)) {
      alert("Please fill in title and cover image.");
      return;
    }

    try {
      setSaving(true);
      await axios.post("/api/collabs", form, { withCredentials: true });
      await fetchCollabs();
      cancelEdit();
      alert("Collab created successfully.");
    } catch (error) {
      console.error("Failed to create collab:", error);
      alert("Failed to create collab.");
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit() {
    if (!editingCollab || !validateForm(form)) {
      alert("Please fill in title and cover image.");
      return;
    }

    try {
      setSaving(true);
      await axios.put(`/api/collabs/${editingCollab._id}`, form, { withCredentials: true });
      await fetchCollabs();
      cancelEdit();
      alert("Collab updated successfully.");
    } catch (error) {
      console.error("Failed to update collab:", error);
      alert("Failed to update collab.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCollab(id: string) {
    if (!confirm("Are you sure you want to delete this collab?")) return;

    try {
      setSaving(true);
      await axios.delete(`/api/collabs/${id}`, { withCredentials: true });
      await fetchCollabs();
    } catch (error) {
      console.error("Failed to delete collab:", error);
      alert("Failed to delete collab.");
    } finally {
      setSaving(false);
    }
  }

  async function seedDefaultData() {
    if (!confirm("Import the current static collab data into the database?")) return;

    try {
      setSaving(true);
      await axios.post("/api/collabs/seed", {}, { withCredentials: true });
      await fetchCollabs();
      alert("Default collab data imported.");
    } catch (error) {
      console.error("Failed to import collab defaults:", error);
      alert("Could not import default collab data. It may already exist.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    if (!confirm("Are you sure you want to logout?")) return;
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return (
    <div className="collabs-panel">
      <Navbar />

      <header className="collabs-header">
        <div>
          <h1>SWAAS Collabs Manager</h1>
          <p>Manage collaboration cards, gallery images, and links from the admin area.</p>
        </div>
        <div className="header-actions">
          <button className="primary-button" onClick={startCreate}>
            Add Collab
          </button>
          <button className="danger-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {(showCreateForm || editingCollab) && (
        <section className="form-shell">
          <div className="form-card">
            <h2>{editingCollab ? `Edit ${editingCollab.title}` : "Create Collab"}</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input className="form-input" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Collaborators</label>
                <input className="form-input" value={form.collaborators} onChange={(e) => setForm((prev) => ({ ...prev, collaborators: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input className="form-input" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Sort Order</label>
                <input type="number" className="form-input" value={form.sortOrder} onChange={(e) => setForm((prev) => ({ ...prev, sortOrder: Number(e.target.value) || 0 }))} />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea className="form-textarea" rows={4} value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Impact / Full Content</label>
              <textarea className="form-textarea" rows={6} value={form.impact} onChange={(e) => setForm((prev) => ({ ...prev, impact: e.target.value }))} />
            </div>
            <div className="form-group">
              <label>Instagram URL</label>
              <input className="form-input" value={form.instagramLink} onChange={(e) => setForm((prev) => ({ ...prev, instagramLink: e.target.value }))} />
            </div>

            <div className="form-group">
              <label>Cover Image *</label>
              <div className="upload-box">
                <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, true); }} disabled={imageUploading} />
                {form.coverImage && <img src={form.coverImage} alt={form.title || "Preview"} className="preview-image" />}
              </div>
            </div>

            <div className="form-group">
              <label>Gallery Images</label>
              <div className="upload-box">
                <input type="file" accept="image/*" multiple onChange={(e) => { Array.from(e.target.files || []).forEach((file) => handleImageUpload(file)); }} disabled={imageUploading} />
                <div className="gallery-preview">
                  {form.galleryImages.map((image, index) => (
                    <div className="preview-item" key={`${image}-${index}`}>
                      <img src={image} alt={`Gallery ${index + 1}`} className="preview-image small" />
                      <button className="remove-button" type="button" onClick={() => setForm((prev) => ({ ...prev, galleryImages: prev.galleryImages.filter((_, currentIndex) => currentIndex !== index) }))}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="primary-button" onClick={editingCollab ? saveEdit : createCollab} disabled={saving || imageUploading}>
                {saving ? "Saving..." : editingCollab ? "Save Changes" : "Create"}
              </button>
              <button className="secondary-button" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      <main className="collabs-list">
        {loading ? (
          <p className="empty-state">Loading collabs...</p>
        ) : collabs.length === 0 ? (
          <div className="empty-state">
            No collabs found.
            <div className="seed-actions">
              <button className="secondary-button" onClick={seedDefaultData} disabled={saving}>
                Import Current Static Data
              </button>
            </div>
          </div>
        ) : (
          collabs.map((collab) => (
            <article className="collab-card" key={collab._id}>
              <img className="cover-image" src={collab.coverImage} alt={collab.title} />
              <div className="card-content">
                <div className="meta-row">
                  <span className="pill">Order: {collab.sortOrder || 0}</span>
                  {collab.collaborators && <span className="pill muted">{collab.collaborators}</span>}
                </div>
                <h3>{collab.title}</h3>
                {collab.date && <p className="subtle-text">{collab.date}</p>}
                <p>{(collab.impact || collab.description || "").slice(0, 220)}{(collab.impact || collab.description || "").length > 220 ? "..." : ""}</p>
                <div className="card-actions">
                  <button className="secondary-button" onClick={() => startEdit(collab)}>Edit</button>
                  <button className="danger-button" onClick={() => deleteCollab(collab._id)}>Delete</button>
                </div>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}
