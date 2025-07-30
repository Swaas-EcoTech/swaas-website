"use client";
import { useState } from "react";
import teamData from "./teamData.jsx";
import Navbar from "../components/Navbar.jsx";
import TeamHeader from "../components/grid.jsx";
import DecorativeLeaves from "../components/DecorativeLeaves.jsx";

const Team = () => {
  const [selectedTeam, setSelectedTeam] = useState("Core");

  return (
    <>
      <div>
        <Navbar />
        <DecorativeLeaves />
        <div className="pageBackground">
          <div className="teamContainer">
            <div className={`diamondDecoration diamond1`}></div>
            <div className={`diamondDecoration diamond2`}></div>
            <div className={`diamondDecoration diamond3`}></div>
            <div className={`diamondDecoration diamond4`}></div>
            <div>
              <TeamHeader title="MEET OUR TEAM" />
            </div>
            <nav className={`categoryNav`}>
              {Object.keys(teamData).map((team) => (
                <button
                  key={team}
                  className={`categoryButton ${
                    selectedTeam === team ? "active" : ""
                  }`}
                  onClick={() => setSelectedTeam(team)}
                >
                  {team}
                </button>
              ))}
            </nav>
            <section
              className={`team-grid ${
                selectedTeam === "Core" ? "core-layout" : ""
              }`}
            >
              {teamData[selectedTeam]?.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="team-cardContainer"
                >
                  <div className={`team-cardBackground`}></div>
                  <div className={`team-flipCard`}>
                    <div className={`team-flipCardInner`}>
                      <div className={`team-flipCardFront`}>
                        <img
                          src={member.img || "/placeholder.svg"}
                          alt={member.name}
                          className={`team-image`}
                        />
                      </div>
                      <div className={`team-flipCardBack`}>
                        <p className={`team-memberDescription`}>
                          {member.description}
                        </p>
                      </div>
                    </div>
                    <p className={`team-memberName`}>{member.name}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* --- DESKTOP FIRST: Default single-row scrolling layout for ALL teams --- */
        .team-grid {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 280px; 
          gap: 4rem;
          width: 80%;
          margin: 0 auto;
          overflow-x: auto;
          padding: 2rem;
          padding-bottom: 3rem; 
          justify-content: center;

          scrollbar-width: thin;
          scrollbar-color: #84aa80 #f0f0f0;
        }

        .team-grid::-webkit-scrollbar {
          height: 10px;
        }
        .team-grid::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 10px;
        }
        .team-grid::-webkit-scrollbar-thumb {
          background-color: #84aa80;
          border-radius: 10px;
          border: 2px solid #f0f0f0;
        }
        .team-grid::-webkit-scrollbar-thumb:hover {
          background-color: #73956f;
        }

        /* --- STYLES FOR MOBILE / TABLET --- */
        @media (max-width: 768px) {
          /* Default mobile layout for other teams (scrolling row) */
          .team-grid {
             grid-auto-columns: 240px;
             gap: 2rem;
          }

          /* SPECIAL OVERRIDE: Revert to wrapping grid for Core team on mobile */
          .team-grid.core-layout {
            display: grid;
            grid-auto-flow: row;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 3.5rem;
          }
        }

        @media (max-width: 480px) {
          /* Default mobile layout for other teams (scrolling row) */
          .team-grid {
             grid-auto-columns: 220px;
             gap: 1.5rem;
          }

          /* SPECIAL OVERRIDE: Revert to stacked layout for Core team on small mobile */
          .team-grid.core-layout {
             grid-template-columns: 1fr;
             /* The 'max-width' property was removed from here to fix the spacing */
             gap: 4rem;
          }
        }

        /* --- CARD STYLES (Unchanged) --- */
        .team-cardContainer {
          position: relative;
          height: 400px;
        }
        
        @media (max-width: 768px) {
          .team-cardContainer {
            height: 320px;
          }
        }

        @media (max-width: 480px) {
           .team-cardContainer {
            height: 350px;
          }
        }

        .team-cardBackground {
          position: absolute;
          top: 20px;
          left: 18px;
          width: 100%;
          height: 100%;
          background-color: #73956f;
          border-radius: 10px;
          z-index: -1;
        }

        .team-flipCard {
          width: 100%;
          height: 100%;
          perspective: 1000px;
        }

        .team-flipCardInner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .team-flipCard:hover .team-flipCardInner {
          transform: rotateY(180deg);
        }

        .team-flipCardFront,
        .team-flipCardBack {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 7px;
          overflow: hidden;
        }

        .team-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .team-flipCardBack {
          background-color: #84aa80;
          color: white;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-sizing: border-box;
        }

        .team-memberName {
          position: absolute;
          bottom: -40px;
          left: 0;
          right: 0;
          background-color: #b4c79d;
          padding: 0.75rem;
          font-family: "Inika", serif;
          text-align: center;
          border-radius: 9px;
          font-weight: 600;
          width: 100%;
          box-sizing: border-box;
        }

        .team-memberDescription {
          font-size: 0.9rem;
          font-family: "Inika", serif;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Team;