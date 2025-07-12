'use client';
import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <img
          src="/leaf.png"
          alt="Left Leaf"
          className="leaf-left-circle"
        />
        <img
          src="/leaf.png"
          alt="Right Leaf"
          className="leaf-right-top"
        />
      </div>
      
      <div className="heading">
        <img src="/grid.png" alt="Grid" className="grid-image" />
        <h1>ABOUT US</h1>
        <img src="/star.png" alt="Star" className="star-left" />
        <img src="/star.png" alt="Star" className="star-right" />
      </div>
      
      <div className="circle-text-container">
        <div className="circle">
          <img src="/about.png" alt="" />
        </div>
      </div>
      
      <div className="text-right">
        <h2>OUR VISION</h2>
        <p>
          <h4>"Revolutionizing the world with bold ideas—welcome to SWAAS, the heartbeat of GTBIT!</h4>
          At SWAAS (Social Workers and Awakeners Society), we fuse technology with sustainability, turning bold ideas into reality since 2009. From DIY waste projects to partnerships like Bottles for Change with Bisleri Corp, we're driven by a promise to protect our planet and uplift communities.
          <br /> During the pandemic, our Covigo Project became a lifeline for many, reflecting our spirit of compassion and action. Through initiatives like Donate A Book and Save Soil, we create awareness and inspire change. <br /> SWAAS isn't just a society – it's a family of innovators, dreamers, and doers, daring to lead sustainability efforts with grit and heart. <br /> Join us and help shape a greener, brighter future – one idea, one action at a time!
        </p>
      </div>
      
      <div className="about-container1">
        <div className="design-left">
          <img
            src="/design.png"
            alt="Left design"
            className="design-left"
          />
        </div>
        <div className="design-right">
          <img
            src="/design.png"
            alt="Right design"
            className="design-right"
          />
        </div>
      </div>
      
      <style jsx>{``}</style>
    </>
  );
};

export default About;