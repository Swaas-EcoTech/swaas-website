"use client";
import React from "react";
import Navbar from "./components/Navbar";
import DecorativeLeaves from "./components/DecorativeLeaves";
const Home = () => {
  return (
    <div className="">
      <DecorativeLeaves/>
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
              Eco-Technical Society of GTBIT, was established in 2009 to tackle
              pressing social and environmental issues through innovative use of
              technology and community-driven initiatives. The name SWAAS,
              meaning breath in Hindi, reflects its mission to breathe life
              into causes that matter, from environmental conservation to
              community empowerment. Since its formation, SWAAS has become a
              dynamic platform for passionate students and dedicated teachers
              working together to foster positive change. The society organizes
              impactful events involving a sense of responsibility toward the
              environment. One of SWAAS most notable contributions was the
              Covigo Web Project, developed during Indias second COVID-19 wave
              to provide critical resources like emergency clinic beds and
              oxygen chambers. This initiative underscored the societys
              commitment to leveraging technology for humanitarian needs. Beyond
              crisis response, SWAAS is dedicated to long-term growth and
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
            <p>Where ecology meets technology.</p>
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
      

      <style jsx>{``}</style>
      </div>
  );
};

export default Home;
