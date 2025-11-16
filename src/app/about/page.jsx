'use client';
import React from 'react';
import Navbar from '../components/Navbar';
import DecorativeLeaves from '../components/DecorativeLeaves';
import Header from '../components/grid'
const About = () => {
  return (
    <>
      <Navbar />
      <DecorativeLeaves />
      
      <div className="">
        {/* Heading Section */}
        <div className="about-heading-section">
      <div className="teamContainer">
                        <div className={`diamondDecoration diamond1`}></div>
        <div className={`diamondDecoration diamond2`}></div>
        <div className={`diamondDecoration diamond3`}></div>
        <div className={`diamondDecoration diamond4`}></div>
                <Header title={"ABOUT US"} />
              </div>
        </div>
        
        {/* Content Section: Circle Image and Text */}
        <div className="about-content-section">
          <div className="about-circle-container">
            <div className="about-circle">
              <img src="/about.png" alt="SWAAS Team" />
            </div>
          </div>
          <div className="about-text-content">
            <h2>OUR VISION</h2>
            <h4>
              "Revolutionizing the world with bold ideas—welcome to SWAAS, the heartbeat of GTBIT!"
            </h4>
            <p>
              At SWAAS (Social Workers and Awakeners Society), we fuse technology with sustainability, turning bold ideas into reality since 2005. From DIY waste projects to partnerships like Bottles for Change with Bisleri Corp, we're driven by a promise to protect our planet and uplift communities.
              <br /> During the pandemic, our Covigo Project became a lifeline for many, reflecting our spirit of compassion and action. Through initiatives like Donate A Book and Save Soil, we create awareness and inspire change. <br /> SWAAS isn't just a society – it's a family of innovators, dreamers, and doers, daring to lead sustainability efforts with grit and heart. <br /> Join us and help shape a greener, brighter future – one idea, one action at a time!
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-page-main {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative; 
          padding-top: 60px;
        }

        .about-heading-section {
          position: relative;
          text-align: center;
          top:70%;
          margin-bottom: 30px; 
        }

        .about-grid-image {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 600px;
          height: auto;
          z-index: 1;
          opacity: 0.5;
        }

        .about-title {
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
          margin: 0; /* Remove default margins */
        }

        .about-star-left {
          position: absolute;
          top: 50%;
          left: 15%; /* Adjusted positioning */
          width: 85px;
          height: auto;
          z-index: 3;
          transform: translateY(-50%) rotate(87deg);
        }

        .about-star-right {
          position: absolute;
          top: 50%;
          right: 15%; /* Adjusted positioning */
          width: 85px;
          height: auto;
          z-index: 3;
          transform: translateY(-50%) rotate(267deg);
        }

        .about-content-section {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 60px; /* Increased gap for better separation */
          padding: 20px 0;
        }

        .about-circle-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0; /* Prevent shrinking */
        }

        .about-circle {
          width: 450px; /* Slightly larger circle */
          height: 450px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 26px 28px 5px #5e785a;
        }

        .about-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-text-content {
          flex-grow: 1;
          max-width: 600px;
          padding: 5px;
          box-sizing: border-box;
        }

        .about-text-content h2 {
          font-size: 60px;
          color: #3b5837;
          margin-bottom: 10px;
          font-family: "Inika", serif;
          text-shadow: 0px 4px 0px rgba(0, 0, 0, 0.3);
        }

        .about-text-content h4 {
          font-size: 1.5rem;
          color: #555;
          margin-bottom: 20px;
          font-family: "Inika", serif;
          line-height: 1.4;
        }

        .about-text-content p {
          font-size: 16px;
          color: #333;
          line-height: 1.6;
          font-family: "Inika", serif;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .about-page-main {
            padding-top: 60px;
          }

          .about-heading-section {
            margin-bottom: 60px;
          }

          .about-title {
            font-size: 2.2rem;
            padding: 8px 30px;
          }

          .about-star-left, .about-star-right {
            width: 70px;
            left: 5%;
            right: 5%;
          }

          .about-content-section {
            flex-direction: column;
            gap: 40px;
          }

          .about-circle {
            width: 350px;
            height: 350px;
            box-shadow: 20px 20px 5px #5e785a;
          }

          .about-text-content {
            width: 90%;
            max-width: 100%;
            text-align: center;
          }

          .about-text-content h2 {
            font-size: 3.5rem;
          }

          .about-text-content h4 {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 768px) {
          .about-page-main {
            padding-top: 60px;
          }

          .about-heading-section {
            margin-bottom: 40px;
          }

          .about-title {
            font-size: 1.8rem;
            padding: 6px 25px;
          }

          .about-star-left, .about-star-right {
            width: 50px;
            left: 2%;
            right: 2%;
          }

          .about-content-section {
            gap: 30px;
          }

          .about-circle {
            width: 280px;
            height: 280px;
            box-shadow: 15px 15px 5px #5e785a;
          }

          .about-text-content h2 {
            font-size: 2.8rem;
          }

          .about-text-content h4 {
            font-size: 1.1rem;
          }

          .about-text-content p {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .about-page-main {
            padding: 10px;
            padding-top: 55px;
          }

          .about-heading-section {
            margin-bottom: 30px;
          }

          .about-grid-image {
            max-width: 300px;
          }

          .about-title {
            font-size: clamp(1.2rem, 6vw, 1.6rem);
            padding: 5px 20px;
            white-space: normal; /* Allow wrapping */
          }

          .about-star-left, .about-star-right {
            width: clamp(30px, 8vw, 40px);
            left: -5%;
            right: -5%;
          }

          .about-content-section {
            gap: 20px;
          }

          .about-circle {
            width: clamp(200px, 70vw, 250px);
            height: clamp(200px, 70vw, 250px);
            box-shadow: 10px 10px 5px #5e785a;
          }

          .about-text-content h2 {
            font-size: clamp(1.8rem, 8vw, 2.5rem);
          }

          .about-text-content h4 {
            font-size: clamp(1rem, 4vw, 1.2rem);
          }

          .about-text-content p {
            font-size: clamp(13px, 3.5vw, 15px);
          }
        }

        /* Unused classes removed:
        .about-container1
        .leaf-right-top
        .leaf-left-circle
        .design-left
        .design-right
        */
      `}</style>
    </>
  );
};

export default About;
