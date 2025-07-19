"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./AdminPanel.css"; // Your enhanced CSS file
import Navbar from "../components/Navbar";
interface Post {
  _id: string;
  name: string;
  content: string;
  imageUrl?: string;
}

export default function AdminPanel() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    content: "",
    imageUrl: "",
  });
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const deletePost = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    )
      return;

    setDeleteLoading(id);
    try {
      await axios.delete(`/api/posts/${id}`, { withCredentials: true });
      await fetchPosts(); // Refresh after delete
    } catch (err) {
      alert("Failed to delete post. Please try again.");
      console.error(err);
    } finally {
      setDeleteLoading(null);
    }
  };

  const startEdit = (post: Post) => {
    setEditingPost(post);
    setEditForm({
      name: post.name,
      content: post.content,
      imageUrl: post.imageUrl || "",
    });
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setEditForm({ name: "", content: "", imageUrl: "" });
  };

  const saveEdit = async () => {
    if (!editingPost) return;

    // Basic validation
    if (!editForm.name.trim() || !editForm.content.trim()) {
      alert("Please fill in both title and content fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`/api/posts/${editingPost._id}`, editForm, {
        withCredentials: true,
      });
      await fetchPosts(); // Refresh after update
      cancelEdit();
    } catch (err) {
      alert("Failed to update post. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
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

  // Helper function to truncate content for display
  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="admin-panel">
      <Navbar />

      <header className="admin-header">
        <div className="header-content">
          <h1>SWAAS Admin</h1>
          <p className="header-subtitle">
            Social Workers and Awakeners Society - Content Management
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

      <main className="posts-grid">
        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🌿</div>
            <h3>No Content Yet</h3>
            <p>
              {`Your SWAAS content will appear here once you create posts.
  Start sharing your society's impactful initiatives and environmental projects.`}
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <article className="post-card" key={post._id}>
              {editingPost?._id === post._id ? (
                <form
                  className="edit-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    saveEdit();
                  }}
                >
                  <div className="form-group">
                    <label htmlFor={`title-${post._id}`}>Post Title</label>
                    <input
                      id={`title-${post._id}`}
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="edit-input"
                      placeholder="Enter post title..."
                      maxLength={100}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`content-${post._id}`}>Post Content</label>
                    <textarea
                      id={`content-${post._id}`}
                      value={editForm.content}
                      onChange={(e) =>
                        setEditForm({ ...editForm, content: e.target.value })
                      }
                      className="edit-textarea"
                      rows={6}
                      placeholder="Share your society's initiatives, events, or environmental projects..."
                      maxLength={2000}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`image-${post._id}`}>
                      Image URL (Optional)
                    </label>
                    <input
                      id={`image-${post._id}`}
                      type="url"
                      value={editForm.imageUrl}
                      onChange={(e) =>
                        setEditForm({ ...editForm, imageUrl: e.target.value })
                      }
                      className="edit-input"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="edit-actions">
                    <button
                      type="submit"
                      disabled={
                        loading ||
                        !editForm.name.trim() ||
                        !editForm.content.trim()
                      }
                      className="save-button"
                    >
                      {loading ? "🌱 Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="cancel-button"
                      disabled={loading}
                    >
                      ✖ Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="post-content">
                  <header className="post-header">
                    <h3 className="post-title">{post.name}</h3>
                    <div className="post-actions">
                      <button
                        onClick={() => startEdit(post)}
                        className="edit-button"
                        title="Edit this post"
                        disabled={loading || deleteLoading === post._id}
                      >
                        <span className="edit-icon">Edit</span>
                      </button>
                      <button
                        onClick={() => deletePost(post._id)}
                        disabled={loading || deleteLoading === post._id}
                        className="delete-button"
                        title="Delete this post"
                      >
                        <span className="delete-icon">
                          {deleteLoading === post._id ? "⏳" : " Delete "}
                        </span>
                      </button>
                    </div>
                  </header>

                  <div className="post-text">
                    {truncateContent(post.content)}
                  </div>

                  {post.imageUrl && (
                    <div className="post-image-container">
                      <img
                        src={post.imageUrl}
                        alt={`Visual content for ${post.name}`}
                        className="post-image"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </article>
          ))
        )}
      </main>
    </div>
  );
}
