'use client';
import React, { useState } from "react";
import teamData from "./teamData.jsx";
import Navbar from "../components/Navbar.jsx";
import TeamHeader from "../components/grid.jsx";

const Team = () => {
  const [selectedTeam, setSelectedTeam] = useState("Core");

  return (
    <div>
        <Navbar />
    <div className="pageBackground">
      <div className="teamContainer">
        <img
          src={'/image-5.png'}
          alt="Decorative Leaf"
          className={`leafDecoration leafTopRight`}
        />
        <img
          src={'/image-5.png'}
          alt="Decorative Leaf"
          className={`leafDecoration leafBottomLeft`}
        />

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
                selectedTeam === team ? 'active' : ''
              }`}
              onClick={() => setSelectedTeam(team)}
            >
              {team}
            </button>
          ))}
          <div className="wavyLine">
            <img src={'/img1.png'} alt="Wavy line decoration" />
          </div>
        </nav>

        <section className={`teamGrid`}>
          {teamData[selectedTeam]?.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className='teamCardContainer'
            >
              <div className={`teamCardBackground`}></div>
              <div className={`flipCard`}>
                <div className={`flipCardInner`}>
                  <div className={`flipCardFront`}>
                    <img
                      src={member.img}
                      alt={member.name}
                      className={`teamImage`}
                    />
                  </div>
                  <div className={`flipCardBack`}>
                    <p className={`memberDescription`}>
                      {member.description}
                    </p>
                  </div>
                </div>
                <p className={`memberName`}>{member.name}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <img
        src={'/image-14.png'}
        alt="Bottom Left Decoration"
        className={`bottomLeftImage`}
      />
      <img
        src={'/image-10.png'}
        alt="Bottom Right Decoration"
        className={`bottomRightImage`}
      />
    </div>
    </div>
  );
};

export default Team;
