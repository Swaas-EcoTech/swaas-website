"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminPanel from "./AdminPanel"; // Your existing community admin panel
import EventsPanel from "./EventPanel"; // New events admin panel
import "./AdminDashboard.css";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);
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

  if (!selectedDashboard) {
    return (
      <div className="admin-dashboard-selector">
        <Navbar />
        
        <div className="">
          <header className="selector-header">
            <div className="header-content">
              <h1>SWAAS Admin Dashboard</h1>
              <p className="header-subtitle">
                Social Workers and Awakeners Society - Management Portal
              </p>
              <div className="swaas-badge">
                <span className="eco-icon">🌱</span>
                <span>Eco-Technical Society</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </header>

          <main className="dashboard-options">
            <h2>Choose Management Dashboard</h2>
            <div className="options-grid">
              <div 
                className="dashboard-option community-option"
                onClick={() => setSelectedDashboard('community')}
              >
                <div className="option-icon">📝</div>
                <h3>Community Dashboard</h3>
                <p>Manage community posts, user content, and social interactions</p>
                <div className="option-features">
                  <span>• Post Management</span>
                  <span>• Content Moderation</span>
                  <span>• User Engagement</span>
                </div>
                <button className="option-button">
                  Access Community Dashboard
                </button>
              </div>

              <div 
                className="dashboard-option events-option"
                onClick={() => setSelectedDashboard('events')}
              >
                <div className="option-icon">🎉</div>
                <h3>Events Dashboard</h3>
                <p>Create, edit, and manage all SWAAS events and activities</p>
                <div className="option-features">
                  <span>• Event Creation</span>
                  <span>• Category Management</span>
                  <span>• Image Gallery</span>
                </div>
                <button className="option-button">
                  Access Events Dashboard
                </button>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h4>Quick Access</h4>
                  <p>Switch between dashboards anytime using the navigation</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Render selected dashboard
  if (selectedDashboard === 'community') {
    return (
      <div>
        <div className="dashboard-header">
          <button 
            onClick={() => setSelectedDashboard(null)}
            className="back-button"
          >
            ← Back to Dashboard Selection
          </button>
          <button 
            onClick={() => setSelectedDashboard('events')}
            className="switch-button"
          >
            Switch to Events Dashboard
          </button>
        </div>
        <AdminPanel />
      </div>
    );
  }

  if (selectedDashboard === 'events') {
    return (
      <div>
        <div className="dashboard-header">
          <button 
            onClick={() => setSelectedDashboard(null)}
            className="back-button"
          >
            ← Back to Dashboard Selection
          </button>
          <button 
            onClick={() => setSelectedDashboard('community')}
            className="switch-button"
          >
            Switch to Community Dashboard
          </button>
        </div>
        <EventsPanel />
      </div>
    );
  }

  return null;
}