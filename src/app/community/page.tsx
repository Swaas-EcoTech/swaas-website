"use client";

import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./community.css";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Leaf from "../components/DecorativeLeaves";

interface Post {
  _id: string;
  name: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default function Community() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [inspiredPosts, setInspiredPosts] = useState<Set<string>>(new Set());
  const router = useRouter();

  const goToAdmin = () => {
    router.push("/admin");
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      let imageUrl = "";
      if (image) {
        const form = new FormData();
        form.append("file", image);
        const res = await axios.post("/api/upload", form);
        imageUrl = res.data.url;
      }

      await axios.post("/api/posts", { name, content, imageUrl });
      setName("");
      setContent("");
      setImage(null);
      setShowCreateModal(false);
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleInspire = (postId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setInspiredPosts((prev) => new Set([...prev, postId]));

    setTimeout(() => {
      setInspiredPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="community-wrapper">
              <Navbar/>
      
      <div className="community-container">
        {/* Header */}
        <div className="community-header">
          <div className="header-content">
            <div className="profile-section">
              <div className="profile-avatar">
                <img
                  src="/logo-swaas1.jpg"
                  onDoubleClick={goToAdmin}
                  alt="SWAAS"
                />
              </div>
              <div className="profile-info">
                <h1>SWAAS Community 🌱</h1>
                <p className="profile-subtitle">
                  The Social Workers and Awakeners Society
                </p>
                <p className="profile-description">
                  Eco-Technical Society of GTBIT • Established 2009
                  <br />
                  Breathing life into environmental conservation & community
                  empowerment 🌍
                </p>
                <div className="profile-stats">
                  <span>
                    <strong>{posts.length}</strong> posts
                  </span>
                  <span>
                    <strong>1k+</strong> members
                  </span>
                  <span>
                    <strong>150+</strong> trees planted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn-style Post Creation */}
        <div className="post-creation-section">
          <div className="post-creation-card">
            <div className="post-input-row">
              <div className="user-avatar">
                <img src="/logo-swaas1.jpg" alt="Your avatar" />
              </div>
              <button
                className="post-input-button"
                onClick={() => setShowCreateModal(true)}
              >
                Start a post about your eco journey...
              </button>
            </div>
            <div className="post-actions-row">
              <button
                className="post-action-btn media-btn"
                onClick={() => setShowCreateModal(true)}
              >
                <svg
                  className="action-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
                </svg>
                Photo
              </button>
              <button
                className="post-action-btn article-btn"
                onClick={() => setShowCreateModal(true)}
              >
                <svg
                  className="action-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
                Write article
              </button>
            </div>
          </div>
        </div>
<Leaf/>
        {/* Posts Grid */}
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <div className="post-author">
                  <div className="author-avatar">
                    <span>{post.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="author-info">
                    <h4>{post.name}</h4>
                    <p className="post-time">{formatDate(post.createdAt)}</p>
                  </div>
                </div>

                <button
                  className={`inspire-btn ${
                    inspiredPosts.has(post._id) ? "inspired" : ""
                  }`}
                  onClick={(e) => handleInspire(post._id, e)}
                >
                  <span className="inspire-icon">🌱</span>
                  Inspire
                  {inspiredPosts.has(post._id) && (
                    <div className="inspire-animation">
                      <span>🌱</span>
                      <span>🌿</span>
                      <span>🍃</span>
                    </div>
                  )}
                </button>
              </div>

              <div className="post-content">
                <p>{post.content}</p>
              </div>

              {post.imageUrl && (
                <div
                  className="post-image"
                  onClick={() => setSelectedPost(post)}
                >
                  <img
                    src={post.imageUrl || "/placeholder.svg"}
                    alt={post.content}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* LinkedIn-style Create Post Modal */}
        {showCreateModal && (
          <div className="modal-overlay">
            <div className="linkedin-modal">
              <div className="linkedin-modal-header">
                <div className="modal-user-info">
                  <div className="modal-user-avatar">
                    <img src="/logo-swaas1.jpg" alt="Your avatar" />
                  </div>
                  <div className="modal-user-details">
                    <h3>SWAAS Member</h3>
                    <p>Post to Community</p>
                  </div>
                </div>
                <button
                  className="modal-close-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>

              <div className="linkedin-modal-body">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="name-input"
                />
                <textarea
                  placeholder="What do you want to talk about?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="content-textarea"
                  rows={6}
                />
                {image && (
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(image) || "/placeholder.svg"}
                      alt="Preview"
                    />
                    <button
                      className="remove-image-btn"
                      onClick={() => setImage(null)}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <div className="linkedin-modal-footer">
                <div className="linkedin-modal-toolbar">
                  <div className="toolbar-left">
                    <label className="toolbar-btn photo-btn">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  <div className="toolbar-right">
                    <button
                      className="post-btn"
                      onClick={handleSubmit}
                      disabled={!name.trim() || !content.trim()}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
            <div
              className="post-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedPost(null)}
              >
                ×
              </button>
              <div className="post-detail-content">
                {selectedPost.imageUrl && (
                  <div className="post-image-container">
                    <img
                      src={selectedPost.imageUrl || "/placeholder.svg"}
                      alt={selectedPost.content}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
