"use client"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar";
import DecorativeLeaves from "../components/DecorativeLeaves";
import Masonry from "../components/GalleryC";
import Header from "../components/grid";
import Loader from "../components/Loader"
import "./gallery.css"

// const DiamondIcon = () => {
//   return (
//     <svg
//       width="40"
//       height="40"
//       viewBox="0 0 40 40"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="diamond-icon"
//     >
//       <path
//         d="M20 0L26.7949 13.2051L40 20L26.7949 26.7949L20 40L13.2051 26.7949L0 20L13.2051 13.2051L20 0Z"
//         fill="none"
//         stroke="#556b2f"
//         strokeWidth="1.5"
//       />
//     </svg>
//   )
// }

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(0)

const items = [
  {
    id: "1",
    img: "/Gallery/1.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 631,
  },
  {
    id: "4",
    img: "/Gallery/4.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 689,
  },
  {
    id: "5",
    img: "/Gallery/5.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 563,
  },
  {
    id: "7",
    img: "/Gallery/7.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 521,
  },
  {
    id: "9",
    img: "/Gallery/9.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 596,
  },
  {
    id: "10",
    img: "/Gallery/10.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 1203,
  },
  {
    id: "11",
    img: "/Gallery/11.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 657,
  },
  {
    id: "15",
    img: "/Gallery/15.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 763,
  },
  {
    id: "17",
    img: "/Gallery/17.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 621,
  },
  {
    id: "18",
    img: "/Gallery/18.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 879,
  },
  {
    id: "21",
    img: "/Gallery/21.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 373,
  },
  {
    id: "32",
    img: "/Gallery/32.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 459,
  },
  {
    id: "33",
    img: "/Gallery/33.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 371,
  },
  {
    id: "34",
    img: "/Gallery/34.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 455,
  },
  {
    id: "35",
    img: "/Gallery/35.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 536,
  },
  {
    id: "36",
    img: "/Gallery/36.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 488,
  },
  {
    id: "37",
    img: "/Gallery/37.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 307,
  },
  {
    id: "38",
    img: "/Gallery/38.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 596,
  },
  {
    id: "39",
    img: "/Gallery/39.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 485,
  },
  {
    id: "40",
    img: "/Gallery/40.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 476,
  },
  {
    id: "41",
    img: "/Gallery/41.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 428,
  },
  {
    id: "42",
    img: "/Gallery/42.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 387,
  },
  {
    id: "43",
    img: "/Gallery/43.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 503,
  },
  {
    id: "44",
    img: "/Gallery/44.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 377,
  },
  {
    id: "46",
    img: "/Gallery/46.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 562,
  },
  {
    id: "47",
    img: "/Gallery/47.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 689,
  },
  {
    id: "48",
    img: "/Gallery/48.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 912,
  },
  {
    id: "49",
    img: "/Gallery/49.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 981,
  },
  {
    id: "50",
    img: "/Gallery/50.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 558,
  },
  {
    id: "51",
    img: "/Gallery/51.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 348,
  },
  {
    id: "52",
    img: "/Gallery/52.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 259,
  },
  {
    id: "71",
    img: "/Gallery/71s.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 512,
  },
  {
    id: "73",
    img: "/Gallery/73s.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 266,
  },
  {
    id: "77",
    img: "/Gallery/77s.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 489,
  },
  {
    id: "79",
    img: "/Gallery/79s.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 453,
  },
  {
    id: "88",
    img: "/Gallery/88s.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 548,
  },
  {
    id: "90",
    img: "/Gallery/90s.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 413,
  },
  {
    id: "91",
    img: "/Gallery/91s.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 283,
  },
  {
    id: "100",
    img: "/Gallery/100s.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 332,
  },
  {
    id: "104",
    img: "/Gallery/104s.JPG",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 314,
  },
  {
    id: "105",
    img: "/Gallery/105s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 372,
  },
  {
    id: "106",
    img: "/Gallery/106s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 608,
  },
  {
    id: "112",
    img: "/Gallery/112s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 538,
  },
  {
    id: "114",
    img: "/Gallery/114s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 755,
  },
  {
    id: "119",
    img: "/Gallery/119s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 281,
  },
  {
    id: "126",
    img: "/Gallery/126s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 873,
  },
  {
    id: "137",
    img: "/Gallery/137s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 443,
  },
  {
    id: "139",
    img: "/Gallery/139s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 364,
  },
  {
    id: "142",
    img: "/Gallery/142s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 520,
  },
  {
    id: "143",
    img: "/Gallery/143s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 285,
  },
  {
    id: "144",
    img: "/Gallery/144s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 267,
  },
  {
    id: "145",
    img: "/Gallery/145s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 389,
  },
  {
    id: "150",
    img: "/Gallery/150s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 558,
  },
  {
    id: "153",
    img: "/Gallery/153s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 499,
  },
  {
    id: "154",
    img: "/Gallery/154s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 400,
  },
  {
    id: "155",
    img: "/Gallery/155s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 255,
  },
  {
    id: "157",
    img: "/Gallery/157s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 552,
  },
  {
    id: "161",
    img: "/Gallery/161s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 411,
  },
  {
    id: "185",
    img: "/Gallery/185s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 473,
  },
  {
    id: "195",
    img: "/Gallery/195s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 462,
  },
  {
    id: "205",
    img: "/Gallery/205s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 261,
  },
  {
    id: "206",
    img: "/Gallery/206s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 575,
  },
  {
    id: "221",
    img: "/Gallery/221s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 330,
  },
  {
    id: "228",
    img: "/Gallery/228s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 515,
  },
  {
    id: "233",
    img: "/Gallery/233s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 352,
  },
  {
    id: "235",
    img: "/Gallery/235s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 292,
  },
  {
    id: "236",
    img: "/Gallery/236s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 572,
  },
  {
    id: "250",
    img: "/Gallery/250s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 359,
  },
  {
    id: "256",
    img: "/Gallery/256s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 303,
  },
  {
    id: "269",
    img: "/Gallery/269s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 506,
  },
  {
    id: "270",
    img: "/Gallery/270s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 409,
  },
  {
    id: "272",
    img: "/Gallery/272s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 565,
  },
  {
    id: "306",
    img: "/Gallery/306s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 522,
  },
  {
    id: "307",
    img: "/Gallery/307s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 327,
  },
  {
    id: "308",
    img: "/Gallery/308s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 579,
  },
  {
    id: "311",
    img: "/Gallery/311s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 278,
  },
  {
    id: "312",
    img: "/Gallery/312s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 365,
  },
  {
    id: "314",
    img: "/Gallery/314s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 369,
  },
  {
    id: "334",
    img: "/Gallery/334s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 512,
  },
  {
    id: "336",
    img: "/Gallery/336s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 486,
  },
  {
    id: "337",
    img: "/Gallery/337s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 542,
  },
  {
    id: "339",
    img: "/Gallery/339s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 307,
  },
  {
    id: "340",
    img: "/Gallery/340s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 281,
  },
  {
    id: "341",
    img: "/Gallery/341s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 479,
  },
  {
    id: "343",
    img: "/Gallery/343s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 507,
  },
  {
    id: "363",
    img: "/Gallery/363s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 423,
  },
  {
    id: "367",
    img: "/Gallery/367s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 625,
  },
  {
    id: "464",
    img: "/Gallery/464s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 543,
  },
  {
    id: "465",
    img: "/Gallery/465s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 750,
  },
  {
    id: "466",
    img: "/Gallery/466s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 431,
  },
  {
    id: "467",
    img: "/Gallery/467s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 456,
  },
  {
    id: "468",
    img: "/Gallery/468s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 752,
  },
  {
    id: "469",
    img: "/Gallery/469s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 565,
  },
  {
    id: "471",
    img: "/Gallery/471s.jpg",
    url: "https://www.instagram.com/swaas.gtbit/",
    height: 501,
  },
];

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = items.map((item) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            setImagesLoaded((prev) => prev + 1)
            resolve(img)
          }
          img.onerror = reject
          img.src = item.img
        })
      })

      try {
        await Promise.all(imagePromises)
        // Add a small delay to show the complete loading animation
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error loading images:", error)
        // Still show content even if some images fail to load
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }
    }

    preloadImages()
  }, [])

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  return (
    <div>
      <Loader isLoading={isLoading} onLoadComplete={handleLoadComplete} />

      <div className={`gallery-main ${isLoading ? "hidden" : "visible"}`}>
        <Navbar />
        <div className="">
          <div className="">
            {/* Title section */}
            <section className="gallery-title-section">
              {/* <DiamondIcon /> */}
              <div className="gallery-title-container">
                <Header title={"GALLERY"} />
              </div>
              {/* <DiamondIcon /> */}
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
      </div>

      <style jsx>{`
        .gallery-main {
          transition: opacity 0.5s ease-in-out;
        }

        .gallery-main.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .gallery-main.visible {
          opacity: 1;
          pointer-events: auto;
          animation: slideIn 0.8s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(45deg);
          }
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

export default Gallery
