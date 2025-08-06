"use client";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DecorativeLeaves from "./components/DecorativeLeaves";
import AQIDashboard from "./components/AQIDashboard";

const Home = () => {
  const [showRominderInfo, setShowRominderInfo] = useState(false);

  return (
    <div className="">
      <DecorativeLeaves />
      <Navbar />
      <div className="Home">
        <div className="home-heading">
          <br />
          <h1>SWAAS</h1>
          <h2>The Eco tech society of GTBIT</h2>
        </div>
        <div className="image-text-wrapper">
          <div className="home-image">
            <div className="graybox">
              <img src="/Front-img.jpeg" alt="HomeImage" />
            </div>
          </div>
          <div className="home-text">
            <p>
              The Social Workers and Awakeners Society (SWAAS), the
              Eco-Technical Society of GTBIT, was established in 2005 to tackle
              pressing social and environmental issues through innovative use of
              technology and community-driven initiatives. Guided by the
              visionary leadership of{" "}
              <span
                className="rominder-name"
                onMouseEnter={() => setShowRominderInfo(true)}
                onMouseLeave={() => setShowRominderInfo(false)}
              >
                Dr. Rominder Kaur Randhawa
                {showRominderInfo && (
                  <div className="rominder-info-card-wrapper">
                    <div className="rominder-info-card">
                      <img
                        src="/director.jpg"
                        alt="Dr. Rominder Kaur Randhawa"
                        className="rominder-photo"
                      />
                      <div className="rominder-text-content">
                        <strong>Dr. Rominder Kaur Randhawa</strong>
                        <br />
                        Director, GTBIT
                        <p>
                          Dr. Rominder Kaur is the visionary leader of GTBIT,
                          driving growth through innovation and education. Under
                          her leadership, the institute has expanded industry
                          collaborations and modernized programs, preparing
                          students for future challenges.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </span>
              , Director of GTBIT, and under the convenership of Dr. Manpreet
              Kaur Bagga, the institution has continually supported such student-led
              efforts that drive real-world impact and foster responsible
              citizenship. The name SWAAS, meaning breath in Hindi, reflects its
              mission to breathe life into causes that matter, from
              environmental conservation to community empowerment. Since its
              formation, SWAAS has become a dynamic platform for passionate
              students and dedicated teachers working together to foster
              positive change. The society organizes impactful events involving
              a sense of responsibility toward the environment.
              One of SWAAS&rsquo; most notable contributions was the Covigo Web
              Project, developed during India&rsquo;s second COVID-19 wave to
              provide critical resources like emergency clinic beds and oxygen
              chambers. This initiative underscored the society&rsquo;s
              commitment to leveraging technology for humanitarian needs.
              Beyond crisis response, SWAAS is dedicated to long-term growth and
              community development. Through donation drives, wellness programs
              like FlowYoga, and skill-building workshops, the society nurtures
              physical, mental, and social well-being. As it continues to grow,
              SWAAS remains a symbol of hope, collaboration, and innovation,
              inviting everyone to join its mission to build a sustainable and
              empowered future.
            </p>
          </div>
        </div>
        <br />
        <div className="bottom-home">
          <div className="homeimage1">
            <img src="/homeimage1.png" alt="Home Image 1" />
          </div>
          <div className="hometext1">
            <AQIDashboard />
          </div>
          <div className="homeimage2">
            <img src="/homeimage2.png" alt="Home Image 2" />
          </div>
          <div className="logos">
            <br />
            <br />
            <p>Follow us on</p>
            <div className="logo-container">
              <a href="https://www.instagram.com/swaas.gtbit/">
                <img src="/instalogo.png" alt="Instagram" />
              </a>
              <a href="https://www.linkedin.com/company/swaas-gtbit/posts/?feedView=all">
                <img src="/linkedinlogo.png" alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hometext1 {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25%;
          height: 190px;
          padding: 0.5rem;
          box-sizing: border-box;
        }

        .rominder-name {
          position: relative;
          text-decoration: underline;
          color: "black";
          cursor: pointer;
          font-weight: 600;
          white-space: nowrap;
          display: inline-block;
        }

        .rominder-name:hover {
          color: rgba(119, 139, 99, 1);
        }

        .rominder-info-card-wrapper {
          position: absolute;
          top: calc(100% + 5px);
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          justify-content: center;
          padding: 0 10px;
          box-sizing: border-box;
          max-width: 100vw;
        }

        .rominder-info-card {
          background-color: #E5FFDA;
          border: 1px solid #e0e0e0;
          padding: 15px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 15px;
          width: 100%;
          min-width: 400px;
          border-radius: 10px;
          font-family: Arial, sans-serif;
          color: #333;
          text-align: left;
          box-sizing: border-box;
        }

        .rominder-info-card::before {
          content: "";
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 8px;
          border-style: solid;
          border-color: transparent transparent #e0e0e0 transparent;
          filter: drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.05));
        }

        .rominder-info-card::after {
          content: "";
          position: absolute;
          bottom: calc(100% - 1px);
          left: 50%;
          transform: translateX(-50%);
          border-width: 7px;
          border-style: solid;
          border-color: transparent transparent #ffffff transparent;
        }

        .rominder-photo {
          min-width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 50%;
          border: 2px solid #f0f0f0;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .rominder-text-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          overflow-wrap: break-word;
          word-wrap: break-word;
          hyphens: auto;
        }

        .rominder-text-content strong {
          font-size: 1.1em;
          color: #000;
          margin-bottom: 5px;
          white-space: normal;
        }

        .rominder-text-content br {
          display: none;
        }

        .rominder-text-content p {
          margin: 0;
          font-size: 0.85em;
          line-height: 1.4;
          color: #555;
          margin-top: 5px;
          white-space: normal;
        }

        /* Responsive adjustments for smaller screens */
        @media (max-width: 768px) {
          .rominder-info-card-wrapper {
            left: 0;
            right: 0;
            transform: none;
            padding: 0 10px;
          }

          .rominder-info-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 10px;
            gap: 10px;
            max-width: 300px;
            min-width: unset;
          }

          .rominder-photo {
            margin-bottom: 5px;
          }

          .rominder-text-content {
            align-items: center;
            text-align: center;
          }

          .rominder-text-content strong {
            font-size: 1em;
          }

          .rominder-text-content p {
            font-size: 0.8em;
          }

          .rominder-info-card::before,
          .rominder-info-card::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        /* Even smaller screens (e.g., very narrow phones) */
        @media (max-width: 480px) {
          .rominder-photo {
            width: 70px;
            height: 70px;
            min-width: 70px;
          }

          .rominder-text-content strong {
            font-size: 0.9em;
          }

          .rominder-text-content p {
            font-size: 0.75em;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
