"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import DecorativeLeaves from "../components/DecorativeLeaves";
import Header from "../components/grid";
import ProjectModal from "../components/EventModal";

const Collab = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [windowWidth, setWindowWidth] = useState(1200);
  const contentRef = useRef(null);
  const shapesRef = useRef(null);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible((prev) => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting,
        }));
      });
    }, observerOptions);

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const photos = [
    {
      id: 1,
      src: "/collabs/photo8.jpeg",
      alt: "Donation Drive 2025",
      description:
        "SWAAS, in collaboration with the Robin Hood Army, organized Donation Drive 2025 to support underprivileged communities. Donation boxes were set up at multiple campus locations including the Main Gate, Lab Block, Canteen, Under the Bridge, and Mother Dairy. Students and faculty contributed generously by donating clothes, books, toys, and daily essentials.",
      impact:
        "SWAAS, in collaboration with the Robin Hood Army, organized Donation Drive 2025 to support underprivileged communities. Donation boxes were set up at multiple campus locations including the Main Gate, Lab Block, Canteen, Under the Bridge, and Mother Dairy. Students and faculty contributed generously by donating clothes, books, toys, and daily essentials SWAAS volunteers personally distributed donations to children in need, conducted a food drive with freshly prepared meals, and engaged in teaching and playful interactions in local parks. The initiative fostered community bonding and highlighted the impact of collective compassion.",
      date: "17th, 21st February 2025",
      collaborators: "Robin Hood Army",
      images: [
        "/collabs/dd3.jpeg",
        "/collabs/photo8.jpeg",
        "/collabs/dd2.jpeg",
        "/collabs/dd4.jpeg",
      ],
      instagramLink: "https://www.instagram.com/p/DGTFa0pzJl9/?img_index=1",
    },
    {
      id: 2,
      src: "/collabs/photo2.jpeg",
      alt: "The Ultimate Tech Battle",
      description:
        "SWAAS, in collaboration with FFT, organized The Ultimate Tech Battle a high-energy quiz competition combining technology and sustainability. Participants competed for the title of TECH WIZARD, showcasing exceptional technical knowledge and eco-conscious thinking.",
      collaborators: "FFT",
      impact:
        "SWAAS, in collaboration with FFT, organized The Ultimate Tech Battle a high-energy quiz competition combining technology and sustainability. Participants competed for the title of TECH WIZARD, showcasing exceptional technical knowledge and eco-conscious thinking The event celebrated innovation and intellect, offering cash prizes, medals, e certificates, and exclusive subscriptions. With active participation and enthusiastic engagement, the quiz fostered a fun, competitive, and educational atmosphere that highlighted the importance of sustainable technology.",
      images: [
        "/collabs/photo2.jpeg",
        "/collabs/tt1.jpeg",
        "/collabs/tt2.jpeg",
        "/collabs/tt3.jpeg",
      ],
      instagramLink: "https://www.instagram.com/p/DH_YfA8T74A/?img_index=1",
    },
    {
      id: 3,
      src: "/collabs/iitd.png",
      alt: "Climate Ideation Case Competition",
      description:
        "SWAAS collaborated with AIESEC Delhi IIT as the official promotional partner for the Climate Change Ideation Case Competition held at IIT Delhi. The initiative aimed to empower youth to address real-world sustainability challenges through innovative ideas and expert engagement.",
      impact:
        "SWAAS collaborated with AIESEC Delhi IIT as the official promotional partner for the Climate Change Ideation Case Competition held at IIT Delhi. The initiative aimed to empower youth to address real-world sustainability challenges through innovative ideas and expert engagement SWAAS amplified the competitions reach through targeted social media campaigns. The event connected participants with professionals from UNDP, Log9, and the Government of India. Winners were awarded certificates, vouchers, and recognition from AIESEC and IIT Delhi. This partnership strengthened SWAAS’s role in advancing youth-driven environmental leadership.",
      collaborators: "AIESEC Delhi IIT, IIT Delhi",
      // images: ["/collabs/photo6.jpeg", "/collabs/photo8.jpeg"],
      instagramLink:
        "https://www.instagram.com/stories/highlights/17893051218037030/",
    },
    {
      id: 3,
      src: "/collabs/bvp.png",
      alt: " BVCOE's EduMinerva : Building Bridges of Innovation & Talent",
      impact:
        "EduVation 2.0 was a resounding success, with multiple teams from SWAAS competing in the hackathon. Three teams excelled by clearing the first round and stayed overnight to continue their coding journey. This collaboration not only highlighted the innovation and dedication of our members but also strengthened the bond between SWAAS and EduMinerva, paving the way for future partnerships and joint ventures.",
      collaborators: "BVCOE's EduMinerva",
      images: ["/collabs/bvp1.png", "/collabs/bvp2.png"],
      // instagramLink:
      // "https://www.instagram.com/stories/highlights/17893051218037030/",
    },
  ];

  // Function to truncate text
  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  // Function to open modal
  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div
      style={{
        fontFamily: "Inika, serif",
        margin: 0,
        padding: 0,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Grey+Qo&family=Inika:wght@400;700&family=Noto+Music&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&family=Russo+One&display=swap");

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
            }
            25% {
              transform: translateY(-10px) rotate(1deg);
            }
            50% {
              transform: translateY(-5px) rotate(-1deg);
            }
            75% {
              transform: translateY(-15px) rotate(0.5deg);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.5);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes bounce {
            0%,
            20%,
            50%,
            80%,
            100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-slideInLeft {
            animation: slideInLeft 0.8s ease-out forwards;
          }

          .animate-slideInRight {
            animation: slideInRight 0.5s ease-out forwards;
          }

          .animate-scaleIn {
            animation: scaleIn 0.6s ease-out forwards;
          }

          .animate-bounce {
            animation: bounce 2s infinite;
          }

          .animate-pulse {
            animation: pulse 2s infinite;
          }

          .floating {
            animation: float 6s ease-in-out infinite;
          }

          .shimmer {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }

          .photo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 4rem;
            max-width: 1500px;
            margin: 0 auto;
          }

          .photo-card {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            /* No cursor: pointer here, as only the button should be clickable for modal */
          }

          .photo-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          }

          .photo-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .photo-card:hover img {
            transform: scale(1.1);
          }

          .photo-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
            color: white;
            padding: 1rem;
            transform: translateY(
              0
            ); /* Keep overlay visible for text and button */
            transition: transform 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }

          .photo-overlay h3,
          .photo-overlay p {
            margin: 0 0 0.5rem 0; /* Add some space below text */
          }

          .view-more-button {
            background-color: rgba(94, 120, 90, 0.9);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 15px;
            cursor: pointer;
            font-family: "Inika", serif;
            font-size: 0.9rem;
            align-self: flex-end; /* Align button to the right within the flex container */
            margin-top: 10px; /* Space between description and button */
            transition: background-color 0.3s ease;
          }

          .view-more-button:hover {
            background-color: rgba(94, 120, 90, 1);
          }

          .scroll-indicator {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            color: rgba(94, 120, 90, 1);
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .scroll-indicator:hover {
            transform: translateX(-50%) scale(1.1);
          }

          .scroll-indicator svg {
            animation: bounce 2s infinite;
          }

          .parallax-bg {
            position: absolute;
            top: 0;
            left: 0;
            height: 10%;
            background: linear-gradient(
              135deg,
              #f0f8f0 0%,
              #e8f5e8 50%,
              #d0e8d0 100%
            );
            z-index: -1;
          }
          .collab-heading-section {
            position: relative;
            text-align: center;
            padding-top: 80px;
          }

          .collab-grid-image {
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            max-width: 600px;
            height: auto;
            z-index: 0;
            opacity: 0.5;
          }

          .collab-title {
            position: relative;
            font-size: 2.8rem;
            font-weight: 700;
            color: #000;
            z-index: 2;
            background: white;
            border: 1px solid #000;
            padding: 10px 40px;
            border-radius: 30px;
            display: inline-block;
            font-family: "Inika", serif;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin: 0;
          }

          .collab-star-left {
            position: absolute;
            top: 50%;
            left: 15%;
            width: 85px;
            height: auto;
            z-index: 3;
            transform: translateY(-50%) rotate(87deg);
          }

          .collab-star-right {
            position: absolute;
            top: 50%;
            right: 15%;
            width: 85px;
            height: auto;
            z-index: 3;
            transform: translateY(-50%) rotate(267deg);
          }

          @media (max-width: 1024px) {
            .collab-heading-section {
              padding-top: 60px;
            }

            .collab-title {
              font-size: 2.2rem;
              padding: 8px 30px;
            }

            .collab-star-left,
            .collab-star-right {
              width: 70px;
              left: 5%;
              right: 5%;
            }
          }

          @media (max-width: 768px) {
            .collab-heading-section {
              padding-top: 20px;
            }

            .collab-title {
              font-size: 1.8rem;
            }

            .collab-star-left,
            .collab-star-right {
              width: 50px;
              left: 2%;
              right: 2%;
            }
          }

          @media (max-width: 480px) {
            .collab-heading-section {
              margin-top: 55px;
            }

            .collab-grid-image {
              z-index: -1;
            }

            .collab-title {
              font-size: clamp(1.2rem, 6vw, 1.6rem);
              padding: 5px 20px;
              white-space: normal;
            }

            .collab-star-left,
            .collab-star-right {
              width: clamp(30px, 8vw, 40px);
              left: 5%;
              right: 5%;
            }
          }

          @media (max-width: 410px) {
            .collab-title {
              font-size: clamp(1.2rem, 5vw, 1.5rem);
            }

            .collab-grid-image {
              width: 70%;
            }

            .collab-star-left,
            .collab-star-right {
              width: clamp(30px, 8vw, 40px);
            }
          }

          @media (max-width: 320px) {
            .collab-title {
              font-size: clamp(1rem, 4.5vw, 1.2rem);
            }

            .collab-star-left,
            .collab-star-right {
              width: clamp(25px, 7vw, 30px);
            }
          }

          /* --- Existing Responsive Styles for Collab Page Content --- */
          @media (max-width: 768px) {
            .photo-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
              padding: 1rem;
            }

            .photo-card {
              margin: 0 auto;
              max-width: 350px;
            }
          }

          @media (max-width: 480px) {
            .photo-card img {
              height: 200px;
            }
          }
        `}
      </style>

      <DecorativeLeaves />
      <Navbar />

      {/* Parallax Background */}
      <div
        className="parallax-bg"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      ></div>

      {/* Collab Page Heading Section */}
      <div>
        <div className="teamContainer">
          <div className={`diamondDecoration diamond1`}></div>
          <div className={`diamondDecoration diamond2`}></div>
          <div className={`diamondDecoration diamond3`}></div>
          <div className={`diamondDecoration diamond4`}></div>
          <img src="/grid.png" alt="Grid" className="collab-grid-image" />

          <Header title={"OUR COLLABS"} />
        </div>
      </div>
      {/* Content Section (Original "Our Collaborations" text and shapes) */}
      <div
        ref={contentRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          // minHeight: "100vh",
          position: "relative",
        }}
      >
        {/* Text Content */}
        <div
          id="text-content"
          data-animate
          className={isVisible["text-content"] ? "animate-slideInLeft" : ""}
          style={{
            width: windowWidth <= 992 ? "100%" : "60%",
            padding: "1rem",
            opacity: isVisible["text-content"] ? 1 : 0,
          }}
        >
          <h2
            style={{
              fontSize:
                windowWidth <= 480
                  ? "2rem"
                  : windowWidth <= 768
                  ? "2.5rem"
                  : "3rem",
              color: "rgba(94, 120, 90, 1)",
              fontFamily: "Inika, serif",
              fontWeight: 700,
              lineHeight: "1.2",
              marginBottom: "2rem",
            }}
          >
            Our Collaborations
          </h2>

          <p
            style={{
              fontSize:
                windowWidth <= 480
                  ? "1rem"
                  : windowWidth <= 768
                  ? "1.125rem"
                  : "1.25rem",
              lineHeight: "1.6",
              color: "rgba(94, 120, 90, 1)",
              fontFamily: "Inika, serif",
              textAlign: "justify",
            }}
          >
            At SWAAS, collaborations play a pivotal role in amplifying our
            impact and broadening our reach. By partnering with like-minded
            organizations, student bodies, and professional networks, we aim to
            drive meaningful change across health, sustainability, and social
            equity initiatives. These collaborations allow us to pool resources,
            share expertise, and create opportunities for students to engage in
            real-world problem-solving. Whether it's organizing donation drives,
            hosting competitions, or promoting climate action, our collaborative
            efforts reflect SWAASs commitment to community empowerment,
            innovation, and inclusive growth.
          </p>
        </div>

        {/* Animated Shapes */}
        <div
          ref={shapesRef}
          id="shapes"
          data-animate
          className={isVisible.shapes ? "animate-slideInRight" : ""}
          style={{
            width: windowWidth <= 992 ? "100%" : "35%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            minHeight: "450px",
            opacity: isVisible.shapes ? 1 : 0,
          }}
        >
          {/* Shape components with staggered animations and images */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
            <div
              key={num}
              className="animate-scaleIn floating"
              style={{
                position: "absolute",
                backgroundImage: `url(/collabs/photo${num}.jpeg)`, // different image per shape
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "80px",
                animationDelay: `${index * 0.01}s`,
                animationDuration: `${4 + index * 0.05}s`,
                ...getShapeStyle(num, windowWidth),
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          id="gallery-title"
          data-animate
          className={isVisible["gallery-title"] ? "animate-fadeInUp" : ""}
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            opacity: isVisible["gallery-title"] ? 1 : 0,
          }}
        >
          <h2
            style={{
              fontSize: windowWidth <= 480 ? "2rem" : "2.5rem",
              color: "rgba(94, 120, 90, 1)",
              fontFamily: "Inika, serif",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Our Collaborations
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "rgba(94, 120, 90, 0.8)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Discover the amazing partnerships and projects we've worked on
          </p>
        </div>

        <div
          id="photo-gallery"
          data-animate
          className={`photo-grid ${
            isVisible["photo-gallery"] ? "animate-fadeInUp" : ""
          }`}
          style={{
            opacity: isVisible["photo-gallery"] ? 1 : 0,
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="photo-card animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img src={photo.src} alt={photo.alt} />
              <div className="photo-overlay">
                {/* <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.25rem" }}>
                  {photo.alt}
                </h3> */}
                {/* <p style={{ margin: "0", opacity: 0.9, fontSize: "0.9rem" }}>
                  {truncateText(photo.description, 20)}
                </p> */}
                <button
                  className="view-more-button"
                  onClick={() => openModal(photo)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedPhoto.alt}
          description={selectedPhoto.impact || selectedPhoto.description} // Use impact if available, otherwise description
          images={selectedPhoto.images || [selectedPhoto.src]} // Pass all related images, or just the main one
          date={selectedPhoto.date}
          collaborators={selectedPhoto.collaborators}
          instagramLink={selectedPhoto.instagramLink}
          // Assuming date is in "DDth Month YYYY" format,
          // you might need to parse it for separate month/year props if your modal expects them.
          // For now, passing the full date string to 'date' prop should work if modal handles it.
        />
      )}
    </div>
  );
};

// Helper function for shape positioning
const getShapeStyle = (num, screenWidth) => {
  const isMobile = screenWidth <= 768;
  const isTablet = screenWidth <= 992;

  const baseStyles = {
    1: {
      width: isMobile ? "200px" : "300px",
      height: isMobile ? "150px" : "200px",
      top: "60%",
      left: "10%",
    },
    2: {
      width: isMobile ? "200px" : "300px",
      height: isMobile ? "150px" : "200px",
      top: "58%",
      left: "20%",
    },
    3: {
      width: isMobile ? "150px" : "200px",
      height: isMobile ? "180px" : "250px",
      top: "30%",
      left: "5%",
    },
    4: {
      width: isMobile ? "150px" : "200px",
      height: isMobile ? "180px" : "250px",
      top: "25%",
      left: "-5%",
    },
    5: {
      width: isMobile ? "150px" : "200px",
      height: isMobile ? "180px" : "250px",
      top: "35%",
      left: "70%",
    },
    6: {
      width: isMobile ? "150px" : "200px",
      height: isMobile ? "180px" : "250px",
      top: "30%",
      left: "65%",
    },
    7: {
      width: isMobile ? "200px" : "300px",
      height: isMobile ? "150px" : "200px",
      top: "5%",
      left: "40%",
    },
    8: {
      width: isMobile ? "200px" : "300px",
      height: isMobile ? "150px" : "200px",
      top: "5%",
      left: "25%",
    },
  };

  return baseStyles[num] || {};
};

export default Collab;
