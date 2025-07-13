'use client';
import Navbar from "../components/Navbar"
import DecorativeLeaves from '../components/DecorativeLeaves';
import Masonry from '../components/GalleryC';
import Header from '../components/grid';
const DiamondIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="diamond-icon"
    >
      <path
        d="M20 0L26.7949 13.2051L40 20L26.7949 26.7949L20 40L13.2051 26.7949L0 20L13.2051 13.2051L20 0Z"
        fill="none"
        stroke="#556b2f"
        strokeWidth="1.5"
      />
    </svg>
  )
}

const Gallery = () => {
  const items = [
    {
      id: "1",
      img: "/Gallery/BottleForChange2.jpg",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    {
      id: "4",
      img: "https://picsum.photos/id/1018/600/700?grayscale",
      url: "https://example.com/four",
      height: 350,
    },
    {
      id: "5",
      img: "/Events/BottleForChange.jpg",
      url: "https://example.com/five",
      height: 500,
    },
    {
      id: "6",
      img: "https://picsum.photos/id/1019/600/650?grayscale",
      url: "https://example.com/six",
      height: 300,
    },
    {
      id: "7",
      img: "https://picsum.photos/id/1021/600/750?grayscale",
      url: "https://example.com/seven",
      height: 450,
    },
    {
      id: "8",
      img: "https://picsum.photos/id/1022/600/900?grayscale",
      url: "https://example.com/eight",
      height: 550,
    },
    {
      id: "9",
      img: "https://picsum.photos/id/1023/600/700?grayscale",
      url: "https://example.com/nine",
      height: 400,
    },
    {
      id: "10",
      img: "https://picsum.photos/id/1024/600/800?grayscale",
      url: "https://example.com/ten",
      height: 480,
    },
    {
      id: "11",
      img: "https://picsum.photos/id/1025/600/650?grayscale",
      url: "https://example.com/eleven",
      height: 320,
    },
    {
      id: "12",
      img: "https://picsum.photos/id/1026/600/750?grayscale",
      url: "https://example.com/twelve",
      height: 380,
    },
        {
      id: "12",
      img: "https://picsum.photos/id/1026/600/750?grayscale",
      url: "https://example.com/twelve",
      height: 460,
    },
        {
      id: "13",
      img: "https://picsum.photos/id/1026/600/750?grayscale",
      url: "https://example.com/twelve",
      height: 380,
    },
        {
      id: "14",
      img: "https://picsum.photos/id/1026/600/750?grayscale",
      url: "https://example.com/twelve",
      height: 380,
    },
        {
      id: "15",
      img: "https://picsum.photos/id/1026/600/750?grayscale",
      url: "https://example.com/twelve",
      height: 380,
    },
    {
      id: "16",
      img: "https://picsum.photos/id/1026/600/750?grayscale",
      url: "https://example.com/twelve",
      height: 580,
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="">
        <div className="">
          {/* Title section */}
          <section className="gallery-title-section">
            <DiamondIcon />
            <div className="gallery-title-container">
            <Header title={"GALLERY"}/>
            </div>
            <DiamondIcon />
          </section>

          <DecorativeLeaves />

          {/* Masonry Gallery */}
          <div className="masonry-wrapper">
            <Masonry
              items={items}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={false}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .gallery-container {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 20px 0;
        }

        .gallery-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .gallery-title-section {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 60px 0 40px 0;
          gap: 30px;
        }

        .gallery-title-container {
          text-align: center;
        }

        .gallery-title {
          font-size: 3.5rem;
          font-weight: 300;
          color: #556b2f;
          letter-spacing: 8px;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .diamond-icon {
          animation: gentle-rotate 6s ease-in-out infinite;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
        }

        @keyframes gentle-rotate {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(45deg); }
        }

        .masonry-wrapper {
          margin-top: 60px;
          padding: 0 10px;
        }

        /* Masonry specific styles */
        :global(.list) {
          position: relative;
          width: 100%;
          min-height: 400px;
        }

        :global(.item-wrapper) {
          position: absolute;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 8px;
          box-sizing: border-box;
        }

        :global(.item-img) {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }

        :global(.item-wrapper:hover .item-img) {
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
          border-color: #556b2f;
        }

        :global(.color-overlay) {
          border-radius: 12px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .gallery-title {
            font-size: 2.5rem;
            letter-spacing: 4px;
          }
          
          .gallery-title-section {
            gap: 20px;
            margin: 40px 0 30px 0;
          }
          
          .masonry-wrapper {
            margin-top: 40px;
            padding: 0 5px;
          }
        }

        @media (max-width: 480px) {
          .gallery-title {
            font-size: 2rem;
            letter-spacing: 2px;
          }
          
          .gallery-content {
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  )
}

export default Gallery;