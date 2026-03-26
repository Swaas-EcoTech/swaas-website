"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import "./TeamPanel.css";
import { uploadImageToCloudinary } from "@/lib/clientImageUpload";

type Person = {
  _id: string;
  name: string;
  role?: string;
  category: string;
  description?: string;
  imageUrl: string;
  linkedInLink?: string;
  membershipType: "team" | "alumni";
  academicYear?: string;
  sortOrder: number;
};

type PersonForm = {
  name: string;
  role: string;
  category: string;
  description: string;
  imageUrl: string;
  linkedInLink: string;
  membershipType: "team" | "alumni";
  academicYear: string;
  sortOrder: number;
};

const initialForm: PersonForm = {
  name: "",
  role: "",
  category: "",
  description: "",
  imageUrl: "",
  linkedInLink: "",
  membershipType: "team",
  academicYear: "",
  sortOrder: 0,
};

export default function TeamPanel() {
  const router = useRouter();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [selectedType, setSelectedType] = useState<"team" | "alumni">("team");
  const [personForm, setPersonForm] = useState<PersonForm>(initialForm);

  useEffect(() => {
    fetchPeople();
  }, []);

  async function fetchPeople() {
    try {
      setLoading(true);
      const res = await axios.get("/api/team");
      setPeople((res.data.allPeople || []) as Person[]);
    } catch (error) {
      console.error("Failed to fetch people", error);
      alert("Could not fetch team and alumni data.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setPersonForm(initialForm);
  }

  function startCreate(type: "team" | "alumni") {
    setSelectedType(type);
    setEditingPerson(null);
    setShowCreateForm(true);
    setPersonForm({
      ...initialForm,
      membershipType: type,
      category: type === "team" ? "Core" : "Alumni",
    });
  }

  function startEdit(person: Person) {
    setEditingPerson(person);
    setShowCreateForm(false);
    setSelectedType(person.membershipType);
    setPersonForm({
      name: person.name || "",
      role: person.role || "",
      category: person.category || "",
      description: person.description || "",
      imageUrl: person.imageUrl || "",
      linkedInLink: person.linkedInLink || "",
      membershipType: person.membershipType,
      academicYear: person.academicYear || "",
      sortOrder: person.sortOrder || 0,
    });
  }

  function cancelEdit() {
    setEditingPerson(null);
    setShowCreateForm(false);
    resetForm();
  }

  async function handleImageUpload(file: File) {
    if (!file) return;
    setImageUploading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(
        file,
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      );
      setPersonForm((prev) => ({ ...prev, imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    } finally {
      setImageUploading(false);
    }
  }

  function validateForm(form: PersonForm) {
    return form.name.trim() && form.category.trim() && form.imageUrl.trim();
  }

  async function createPerson() {
    if (!validateForm(personForm)) {
      alert("Please fill in name, category, and image.");
      return;
    }

    try {
      setSaving(true);
      await axios.post("/api/team", personForm, { withCredentials: true });
      await fetchPeople();
      cancelEdit();
      alert("Person created successfully.");
    } catch (error) {
      console.error("Failed to create person:", error);
      alert("Failed to create person.");
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit() {
    if (!editingPerson || !validateForm(personForm)) {
      alert("Please fill in name, category, and image.");
      return;
    }

    try {
      setSaving(true);
      await axios.put(`/api/team/${editingPerson._id}`, personForm, { withCredentials: true });
      await fetchPeople();
      cancelEdit();
      alert("Person updated successfully.");
    } catch (error) {
      console.error("Failed to update person:", error);
      alert("Failed to update person.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePerson(id: string) {
    if (!confirm("Are you sure you want to delete this person?")) return;

    try {
      setSaving(true);
      await axios.delete(`/api/team/${id}`, { withCredentials: true });
      await fetchPeople();
    } catch (error) {
      console.error("Failed to delete person:", error);
      alert("Failed to delete person.");
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

  async function seedDefaultData() {
    if (!confirm("Import the current static team data into the database?")) {
      return;
    }

    try {
      setSaving(true);
      await axios.post("/api/team/seed", {}, { withCredentials: true });
      await fetchPeople();
      alert("Default team data imported. You can edit it now.");
    } catch (error) {
      console.error("Failed to import default data:", error);
      alert("Could not import default data. It may already exist.");
    } finally {
      setSaving(false);
    }
  }

  const filteredPeople = useMemo(
    () =>
      [...people]
        .filter((person) => person.membershipType === selectedType)
        .sort((a, b) => {
          const categoryCompare = a.category.localeCompare(b.category);
          if (categoryCompare !== 0) return categoryCompare;
          const orderCompare = (a.sortOrder || 0) - (b.sortOrder || 0);
          if (orderCompare !== 0) return orderCompare;
          return a.name.localeCompare(b.name);
        }),
    [people, selectedType]
  );

  return (
    <div className="team-panel">
      <Navbar />

      <header className="team-panel-header">
        <div>
          <h1>SWAAS Team Manager</h1>
          <p>Manage current team and alumni without touching the codebase.</p>
        </div>
        <div className="team-panel-actions">
          <button onClick={() => startCreate(selectedType)} className="primary-button">
            Add {selectedType === "team" ? "Team Member" : "Alumni"}
          </button>
          <button onClick={handleLogout} className="danger-button">
            Logout
          </button>
        </div>
      </header>

      {(showCreateForm || editingPerson) && (
        <section className="team-form-shell">
          <div className="team-form-card">
            <h2>{editingPerson ? `Edit ${editingPerson.name}` : `Create ${selectedType === "team" ? "Team Member" : "Alumni"}`}</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Name *</label>
                <input
                  className="form-input"
                  value={personForm.name}
                  onChange={(e) => setPersonForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label>Role / Position</label>
                <input
                  className="form-input"
                  value={personForm.role}
                  onChange={(e) => setPersonForm((prev) => ({ ...prev, role: e.target.value }))}
                  placeholder="President, Tech Lead, Convener..."
                />
              </div>

              <div className="form-group">
                <label>Type *</label>
                <select
                  className="form-input"
                  value={personForm.membershipType}
                  onChange={(e) =>
                    setPersonForm((prev) => ({
                      ...prev,
                      membershipType: e.target.value as "team" | "alumni",
                      category: e.target.value === "team" ? prev.category || "Core" : prev.category || "Alumni",
                    }))
                  }
                >
                  <option value="team">Current Team</option>
                  <option value="alumni">Alumni</option>
                </select>
              </div>

              <div className="form-group">
                <label>{personForm.membershipType === "team" ? "Department / Tab *" : "Category *"}</label>
                <input
                  className="form-input"
                  value={personForm.category}
                  onChange={(e) => setPersonForm((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder={personForm.membershipType === "team" ? "Core, Technical, Design..." : "Alumni"}
                />
              </div>

              <div className="form-group">
                <label>Academic Year</label>
                <input
                  className="form-input"
                  value={personForm.academicYear}
                  onChange={(e) => setPersonForm((prev) => ({ ...prev, academicYear: e.target.value }))}
                  placeholder="2025-2026"
                />
              </div>

              <div className="form-group">
                <label>Sort Order</label>
                <input
                  type="number"
                  className="form-input"
                  value={personForm.sortOrder}
                  onChange={(e) => setPersonForm((prev) => ({ ...prev, sortOrder: Number(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-textarea"
                rows={5}
                value={personForm.description}
                onChange={(e) => setPersonForm((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label>LinkedIn URL</label>
              <input
                className="form-input"
                value={personForm.linkedInLink}
                onChange={(e) => setPersonForm((prev) => ({ ...prev, linkedInLink: e.target.value }))}
                placeholder="https://www.linkedin.com/in/..."
              />
            </div>

            <div className="form-group">
              <label>Photo *</label>
              <div className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  disabled={imageUploading}
                />
                {imageUploading && <p className="helper-text">Uploading image...</p>}
                {personForm.imageUrl && (
                  <div className="image-preview">
                    <img src={personForm.imageUrl} alt={personForm.name || "Preview"} />
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                className="primary-button"
                onClick={editingPerson ? saveEdit : createPerson}
                disabled={saving || imageUploading}
              >
                {saving ? "Saving..." : editingPerson ? "Save Changes" : "Create"}
              </button>
              <button className="secondary-button" onClick={cancelEdit} disabled={saving}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      <div className="people-nav">
        <button
          className={selectedType === "team" ? "active" : ""}
          onClick={() => setSelectedType("team")}
        >
          Current Team ({people.filter((person) => person.membershipType === "team").length})
        </button>
        <button
          className={selectedType === "alumni" ? "active" : ""}
          onClick={() => setSelectedType("alumni")}
        >
          Alumni ({people.filter((person) => person.membershipType === "alumni").length})
        </button>
      </div>

      <main className="people-list">
        {loading ? (
          <p className="empty-state">Loading data...</p>
        ) : filteredPeople.length === 0 ? (
          <div className="empty-state">
            No {selectedType === "team" ? "team members" : "alumni"} found. Use the button above to add entries.
            {people.length === 0 && (
              <div className="seed-actions">
                <button className="secondary-button" onClick={seedDefaultData} disabled={saving}>
                  Import Current Static Data
                </button>
              </div>
            )}
          </div>
        ) : (
          filteredPeople.map((person) => (
            <article className="person-card" key={person._id}>
              <img
                src={person.imageUrl || "/default-avatar.webp"}
                alt={person.name}
                className="person-image"
              />
              <div className="person-content">
                <div className="person-meta">
                  <span className="pill">{person.category}</span>
                  {person.academicYear && <span className="pill muted">{person.academicYear}</span>}
                </div>
                <h3>{person.name}</h3>
                {person.role && <p className="person-role">{person.role}</p>}
                {person.description && <p className="person-description">{person.description}</p>}
                <div className="card-footer">
                  <span className="sort-order">Order: {person.sortOrder || 0}</span>
                  <div className="card-actions">
                    <button className="secondary-button" onClick={() => startEdit(person)}>
                      Edit
                    </button>
                    <button className="danger-button" onClick={() => deletePerson(person._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}
