import React from "react";
import "./gallery.css"; // Import the CSS file

// Import the images directly from the same folder
import screen from "./screen.png";
import leaf from "./leaf.png";

const Gallery = () => {
  return (
    <div
      className="gallery-container"
      style={{
        backgroundImage: `url(${screen})`, // Use the imported background image
      }}
    >
      {/* Horizontal line */}
      <hr className="gallery-divider" />

      <div>
        {/* Title section */}
        <section className="gallery-title-section">
          <img src="" alt="Gallery Image 1" className="gallery-image" />
          <div className="gallery-title-container">
            <h1 className="gallery-title">Gallery</h1>
            {/* Use the imported leaf image */}
            <img src={leaf} alt="Leaf decoration" className="gallery-leaf" />
          </div>
          <img src="" alt="Gallery Image 2" className="gallery-image" />
        </section>

        {/* Images section */}
        <section className="gallery-images-section">
          <img src="" alt="Gallery Image 3" className="gallery-image" />
          <img src="" alt="Gallery Image 4" className="gallery-image" />
          <img src="" alt="Gallery Image 5" className="gallery-image" />
        </section>
      </div>
    </div>
  );
};

export default Gallery;
