"use client";
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import DecorativeLeaves from '../components/DecorativeLeaves';

const Collab = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [windowWidth, setWindowWidth] = useState(1200); // Default fallback value
  const contentRef = useRef(null);
  const shapesRef = useRef(null);

  // Handle window resize and set initial width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(prev => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting
        }));
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const photos = [
    { id: 1, src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000', alt: 'Collaboration 1' },
    { id: 2, src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000', alt: 'Collaboration 2' },
    { id: 3, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000', alt: 'Collaboration 3' },
    { id: 4, src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000', alt: 'Collaboration 4' },
    { id: 5, src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000', alt: 'Collaboration 5' },
    { id: 6, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000', alt: 'Collaboration 6' }
  ];

  return (
    <div style={{ fontFamily: 'Inika, serif', margin: 0, padding: 0, backgroundColor: 'white', overflow: 'hidden' }}>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Grey+Qo&family=Inika:wght@400;700&family=Noto+Music&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Russo+One&display=swap");

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(1deg); }
            50% { transform: translateY(-5px) rotate(-1deg); }
            75% { transform: translateY(-15px) rotate(0.5deg); }
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
            0%, 20%, 50%, 80%, 100% {
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
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-slideInLeft {
            animation: slideInLeft 0.8s ease-out forwards;
          }

          .animate-slideInRight {
            animation: slideInRight 0.8s ease-out forwards;
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
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }

          .photo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .photo-card {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .photo-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
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
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
            color: white;
            padding: 1rem;
            transform: translateY(100%);
            transition: transform 0.3s ease;
          }

          .photo-card:hover .photo-overlay {
            transform: translateY(0);
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
            width: 100%;
            height: 120%;
            background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 50%, #d0e8d0 100%);
            z-index: -1;
          }

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

      {/* Navbar Component */}
      <DecorativeLeaves/>
      <Navbar/>

      {/* Parallax Background */}
      <div className="parallax-bg" style={{
        transform: `translateY(${scrollY * 0.5}px)`
      }}></div>

      {/* Content Section */}
      <div ref={contentRef} style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: '4rem 2rem',
        minHeight: '100vh',
        position: 'relative'
      }}>
        {/* Text Content */}
        <div 
          id="text-content"
          data-animate
          className={isVisible['text-content'] ? 'animate-slideInLeft' : ''}
          style={{
            width: windowWidth <= 992 ? '100%' : '60%',
            padding: '2rem',
            opacity: isVisible['text-content'] ? 1 : 0
          }}
        >
          <h2 style={{
            fontSize: windowWidth <= 480 ? '2rem' : windowWidth <= 768 ? '2.5rem' : '3rem',
            color: 'rgba(94, 120, 90, 1)',
            fontFamily: 'Inika, serif',
            fontWeight: 700,
            lineHeight: '1.2',
            marginBottom: '2rem'
          }}>
            Lorem Ipsum
          </h2>
          
          <p style={{
            fontSize: windowWidth <= 480 ? '1rem' : windowWidth <= 768 ? '1.125rem' : '1.25rem',
            lineHeight: '1.6',
            color: 'rgba(94, 120, 90, 1)',
            fontFamily: 'Inika, serif',
            textAlign: 'justify'
          }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s... 
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit esse, ipsa, 
            perspiciatis itaque quia dicta eveniet in adipisci repellat placeat at, 
            eaque nisi ut assumenda! Facilis dicta a unde nesciunt. Lorem ipsum dolor, 
            sit amet consectetur adipisicing elit. Commodi ea, vero voluptatum similique 
            corrupti eum minima voluptatem quis ipsa expedita pariatur, dicta exercitationem 
            doloremque debitis autem. Sint veniam quibusdam maxime.
          </p>
        </div>

        {/* Animated Shapes */}
        <div 
          ref={shapesRef}
          id="shapes"
          data-animate
          className={isVisible.shapes ? 'animate-slideInRight' : ''}
          style={{
            width: windowWidth <= 992 ? '100%' : '35%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            minHeight: '400px',
            opacity: isVisible.shapes ? 1 : 0
          }}
        >
          {/* Shape components with staggered animations */}
          {[1,2,3,4,5,6,7,8].map((num, index) => (
            <div
              key={num}
              className="animate-scaleIn floating"
              style={{
                position: 'absolute',
                backgroundColor: num % 2 === 0 ? 'rgba(59, 88, 55, 1)' : 'rgba(202, 196, 196, 1)',
                borderRadius: '80px',
                animationDelay: `${index * 0.1}s`,
                animationDuration: `${4 + index * 0.5}s`,
                ...getShapeStyle(num, windowWidth)
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div style={{
        padding: '4rem 0',
        position: 'relative'
      }}>
        <div 
          id="gallery-title"
          data-animate
          className={isVisible['gallery-title'] ? 'animate-fadeInUp' : ''}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            opacity: isVisible['gallery-title'] ? 1 : 0
          }}
        >
          <h2 style={{
            fontSize: windowWidth <= 480 ? '2rem' : '2.5rem',
            color: 'rgba(94, 120, 90, 1)',
            fontFamily: 'Inika, serif',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Our Collaborations
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(94, 120, 90, 0.8)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover the amazing partnerships and projects we've worked on
          </p>
        </div>

        <div 
          id="photo-gallery"
          data-animate
          className={`photo-grid ${isVisible['photo-gallery'] ? 'animate-fadeInUp' : ''}`}
          style={{
            opacity: isVisible['photo-gallery'] ? 1 : 0
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
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                  {photo.alt}
                </h3>
                <p style={{ margin: 0, opacity: 0.9 }}>
                  Amazing collaboration project showcasing innovation and creativity.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function for shape positioning
const getShapeStyle = (num, screenWidth) => {
  const isMobile = screenWidth <= 768;
  const isTablet = screenWidth <= 992;
  
  const baseStyles = {
    1: { width: isMobile ? '200px' : '300px', height: isMobile ? '150px' : '200px', top: '60%', left: '10%' },
    2: { width: isMobile ? '200px' : '300px', height: isMobile ? '150px' : '200px', top: '65%', left: '20%' },
    3: { width: isMobile ? '150px' : '200px', height: isMobile ? '180px' : '250px', top: '30%', left: '5%' },
    4: { width: isMobile ? '150px' : '200px', height: isMobile ? '180px' : '250px', top: '25%', left: '0%' },
    5: { width: isMobile ? '150px' : '200px', height: isMobile ? '180px' : '250px', top: '35%', left: '70%' },
    6: { width: isMobile ? '150px' : '200px', height: isMobile ? '180px' : '250px', top: '30%', left: '65%' },
    7: { width: isMobile ? '200px' : '300px', height: isMobile ? '150px' : '200px', top: '5%', left: '40%' },
    8: { width: isMobile ? '200px' : '300px', height: isMobile ? '150px' : '200px', top: '0%', left: '35%' }
  };

  return baseStyles[num] || {};
};

export default Collab;