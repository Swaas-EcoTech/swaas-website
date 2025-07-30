"use client"
import { useState } from "react"
import teamData from "./teamData.jsx"
import Navbar from "../components/Navbar.jsx"
import TeamHeader from "../components/grid.jsx"
import DecorativeLeaves from "../components/DecorativeLeaves.jsx"

const Team = () => {
  const [selectedTeam, setSelectedTeam] = useState("Core")

  return (
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
                className={`categoryButton ${selectedTeam === team ? "active" : ""}`}
                onClick={() => setSelectedTeam(team)}
              >
                {team}
              </button>
            ))}
          </nav>
          <section className={`teamGrid`}>
            {teamData[selectedTeam]?.map((member, index) => (
              <div key={`${member.name}-${index}`} className="teamCardContainer">
                <div className={`teamCardBackground`}></div>
                <div className={`flipCard`}>
                  <div className={`flipCardInner`}>
                    <div className={`flipCardFront`}>
                      <img src={member.img || "/placeholder.svg"} alt={member.name} className={`teamImage`} />
                    </div>
                    <div className={`flipCardBack`}>
                      <p className={`memberDescription`}>{member.description}</p>
                    </div>
                  </div>
                  <p className={`memberName`}>{member.name}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Team
