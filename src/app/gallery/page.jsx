'use client';

import { items } from './galleryData'; 
import Navbar from "../components/Navbar";
import DecorativeLeaves from "../components/DecorativeLeaves";
import Header from "../components/grid";
import "./gallery.css";

const Gallery = () => {
  return (
    <div>
      <div className="gallery-main">
        <Navbar />
        <div className="">
          <div className="">
            <section className="">
              <div className="teamContainer">
                <div className="diamondDecoration diamond1"></div>
                <div className="diamondDecoration diamond2"></div>
                <div className="diamondDecoration diamond3"></div>
                <div className="diamondDecoration diamond4"></div>
                <Header title={"OUR GALLERY"} />
              </div>
            </section>
            <DecorativeLeaves />
            
            <div className="simple-masonry-grid">
              {items.map(item => (
                <div key={item.id} className="masonry-item">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    
                    {/* If item.type is 'video', render a video tag. Otherwise, render an image tag. */}
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        poster={item.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <img 
                        src={item.img} // Use item.src for consistency
                        alt={`Gallery item ${item.id}`} 
                      />
                    )}

                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .simple-masonry-grid {
          column-count: 4;
          column-gap: 1rem;
          padding: 2rem;
          margin-top: 10px;
        }

        .masonry-item {
          margin-bottom: 1rem;
          break-inside: avoid;
          border-radius: 8px; /* Apply radius to the container */
          overflow: hidden; /* Hide anything that spills out */
        }

        .masonry-item img,
        .masonry-item video { /* Apply styles to both images and videos */
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease-in-out;
        }

        .masonry-item:hover img,
        .masonry-item:hover video {
          transform: scale(1.05); /* Slightly larger zoom on hover */
        }

        /* Responsive adjustments */
        @media (max-width: 1200px) {
          .simple-masonry-grid {
            column-count: 3;
          }
        }

        @media (max-width: 800px) {
          .simple-masonry-grid {
            column-count: 2;
          }
        }

        @media (max-width: 500px) {
          .simple-masonry-grid {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;