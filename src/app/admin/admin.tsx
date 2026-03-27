"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminPanel from "./AdminPanel";
import EventsPanel from "./EventPanel";
import TeamPanel from "./TeamPanel";
import CollabsPanel from "./CollabsPanel";
import "./AdminDashboard.css";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const router = useRouter();

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

  const dashboards = [
    {
      id: "community",
      label: "Community",
      description: "Manage posts, content moderation, and user engagement",
      meta: ["Post Management", "Content Moderation", "User Engagement"],
    },
    {
      id: "events",
      label: "Events",
      description: "Create and manage all SWAAS events and activities",
      meta: ["Event Creation", "Category Management", "Image Gallery"],
    },
    {
      id: "team",
      label: "Team",
      description: "Manage members, alumni, roles, and profile links",
      meta: ["Team Tabs", "Alumni Gallery", "Member Photos"],
    },
    {
      id: "collabs",
      label: "Collabs",
      description: "Manage collaboration cards, galleries, and stories",
      meta: ["Cover Images", "Gallery Images", "Modal Content"],
    },
  ];

  if (!selectedDashboard) {
    return (
      <div className="selector-root">
        <Navbar />
        <div className="selector-body">
          <header className="selector-header">
            <div className="header-left">
              <p className="header-eyebrow">SWAAS Admin</p>
              <h1 className="header-title">Management Portal</h1>
              <p className="header-sub">Social Workers and Awakeners Society — Eco-Technical Society</p>
            </div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </header>

          <section className="panel-section">
            <p className="section-label">Select a dashboard</p>
            <div className="cards-grid">
              {dashboards.map((d) => (
                <button
                  key={d.id}
                  className="dash-card"
                  onClick={() => setSelectedDashboard(d.id)}
                >
                  <div className="card-top">
                    <h2 className="card-title">{d.label}</h2>
                    <span className="card-arrow">&#8599;</span>
                  </div>
                  <p className="card-desc">{d.description}</p>
                  <ul className="card-meta">
                    {d.meta.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  const panelMap = {
    community: <AdminPanel />,
    events: <EventsPanel />,
    team: <TeamPanel />,
    collabs: <CollabsPanel />,
  };

  return (
    <div className="panel-root">
      <div className="panel-nav">
        <button className="nav-back" onClick={() => setSelectedDashboard(null)}>
          &#8592; Back
        </button>
        <div className="nav-tabs">
          {["community", "events", "team", "collabs"].map((id) => (
            <button
              key={id}
              className={`nav-tab ${selectedDashboard === id ? "active" : ""}`}
              onClick={() => setSelectedDashboard(id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {panelMap[selectedDashboard]}
    </div>
  );
}