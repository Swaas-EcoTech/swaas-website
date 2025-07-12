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
      
      <style jsx>{`@import url("https://fonts.googleapis.com/css2?family=Inika:wght@400;700&display=swap");

.about-container {
  position: relative;
  width: 100%;
  height: 610px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  background: none;
}
.about-container1 {
  position: relative;
  width: 100%;
  height: 165px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  background: none;
}

.heading {
  position: relative;
  text-align: center;
  width: 100%;
  margin: 0 auto;

  /* padding: 20px 0;  */
}

.grid-image {
  position: absolute;
  top: -590px;
  left: 50.8%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: auto;
  z-index: 1;
  opacity: 0.5;
}

/* Heading Text */
.heading h1 {
  position: relative;
  font-size: 2.5rem;
  font-weight: 700;
  color: #000;
  z-index: 2;
  background: white;
  border: 1px solid #000;
  padding: 10px 30px;
  border-radius: 30px;
  display: inline-block;
  top: -585px;
  right: -9px;
  font-family: "Inika", serif;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
}

/* Left Star */
.star-left {
  position: absolute;
  top: -414%;
  left: 29.5%;
  width: 85px;
  height: auto;
  z-index: 3;
  transform: rotate(87deg);
}

/* Right Star */
.star-right {
  position: absolute;
  top: -457%;
  right: 28%;
  width: 85px;
  height: auto;
  z-index: 3;
  transform: rotate(267deg);
}


.leaf-right-top {
  position: absolute;
  top: 2%;                      /* Adjust for exact positioning */
  right: -20px;
  width: 120px;
  height: auto;
  z-index: 1;
  transform: rotate(-14.85deg); /* Slight tilt */
}

.circle-text-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -490px;
  /* margin-left: -1110px; */
  margin-right: 400px;
  background: none;
}

.circle {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border-color: #5e785a;
  overflow: hidden; /* Ensures the image stays within the circle */
  box-shadow: 26px 28px 5px #5e785a;
  margin-right: 180px;
  margin-top: -60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle img {
  width: 100%;
  height: 100%;
  border-color: 10px #5e785a;
  object-fit: cover; /* Ensures the image fills the circle properly */
}

.text-right {
  width: 560px;
  height: 490px;
  float: right;
  border: none;
  padding: 5px;
  box-sizing: border-box;
  /* overflow: hidden; */
  top: 200px;
  margin-top: -465px;
}

.text-right h2 {
  font-size: 60px;
  color: #3b5837;
  margin-bottom: -18px;
  font-family: "Inika", serif;
  text-shadow: 0px 4px 0px rgba(0, 0, 0, 0.3);
}

.text-right p {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  font-family: "Inika", serif;
}

.leaf-left-circle {
  position: absolute;
  top: 48%;
  left: -43px;
  transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
  width: 150px;
  height: auto;
  z-index: 2;
}

.design-left {
  position: absolute;
  bottom: -20px;
  left: -214px;
  width: 334.04px;
  height: 282.14px;
  z-index: 1;
  transform: translateY(-50%) rotate(-153deg);
}

.design-right {
  position: absolute;
  bottom: -42px;
  right: -43px;
  width: 333.29px;
  height: 282.14px;
  z-index: 1;
  transform: rotate(5deg);
}

@media (max-width: 1024px) {
  .about-container {
    position: relative;
    width: 100%;
    height: 610px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    background: none;
  }
  .about-container1 {
    position: relative;
    width: 100%;
    height: 165px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0;
    background: none;
  }

  .heading {
    position: relative;
    text-align: center;
    width: 100%;
    margin: 0 auto;

   
  }

  .grid-image {
    position: absolute;
    top: -590px;
    left: 50.8%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 600px;
    height: auto;
    z-index: 1;
    opacity: 0.5;
  }

  /* Heading Text */
  .heading h1 {
    position: relative;
    font-size: 2.5rem;
    font-weight: 700;
    color: #000;
    z-index: 2;
    background: white;
    border: 1px solid #000;
    padding: 10px 30px;
    border-radius: 30px;
    display: inline-block;
    top: -585px;
    right: -9px;
    font-family: "Inika", serif;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
  }

  /* Left Star */
  .star-left {
    position: absolute;
    top: -414%;
    left: 29.5%;
    width: 85px;
    height: auto;
    z-index: 3;
    transform: rotate(87deg);
  }

  /* Right Star */
  .star-right {
    position: absolute;
    top: -457%;
    right: 28%;
    width: 85px;
    height: auto;
    z-index: 3;
    transform: rotate(267deg);
  }

  /* Right-side Leaf (near navbar) */
  .leaf-right-top {
    position: absolute;
    top: 2%; /* Adjust for exact positioning */
    right: -20px;
    width: 120px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg); /* Slight tilt */
  }

  .circle-text-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -490px;
    /* margin-left: -1110px; */
    margin-right: 400px;
    background: none;
  }

  .circle {
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border-color: #5e785a;
    overflow: hidden; /* Ensures the image stays within the circle */
    box-shadow: 26px 28px 5px #5e785a;
    margin-right: 180px;
    margin-top: -60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle img {
    width: 100%;
    height: 100%;
    border-color: 10px #5e785a;
    object-fit: cover; 
  }

  .text-right {
    width: 560px;
    height: 490px;
    float: right;
    border: none;
    padding: 5px;
    box-sizing: border-box;
    /* overflow: hidden; */
    top: 200px;
    margin-top: -465px;
  }

  .text-right h2 {
    font-size: 60px;
    color: #3b5837;
    margin-bottom: -18px;
    font-family: "Inika", serif;
    text-shadow: 0px 4px 0px rgba(0, 0, 0, 0.3);
  }

  .text-right p {
    font-size: 16px;
    color: #333;
    line-height: 1.6;
    font-family: "Inika", serif;
  }

  .leaf-left-circle {
    position: absolute;
    top: 48%;
    left: -43px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 150px;
    height: auto;
    z-index: 2;
  }

  .design-left {
    position: absolute;
    bottom: -20px;
    left: -214px;
    width: 334.04px;
    height: 282.14px;
    z-index: 1;
    transform: translateY(-50%) rotate(-153deg);
  }

  .design-right {
    position: absolute;
    bottom: -42px;
    right: -43px;
    width: 333.29px;
    height: 282.14px;
    z-index: 1;
    transform: rotate(5deg);
  }
}

@media (max-width: 820px) {
  .heading h1 {
    font-size: 2.5rem;
    top: -585px;
  }
  .circle-text-container {
    margin-top: -476px;
    margin-right: -210px;
  }
  .star-right {
    position: absolute;
    top: -460%;
    right: 18%;
    width: 100px;
    height: auto;
    z-index: 3;
  }

  .star-left {
    position: absolute;
    top: -420%;
    left: 21.5%;
    width: 100px;
    height: auto;
    z-index: 3;
  }

  .text-right {
    width: 100%;
    margin-top: 50px;
    text-align: center;
    height: 320px;
  }
  .text-right h2 {
    font-size: 2rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 16px;
    font-family: "Inika", serif;
  }
  .leaf-right-top {
    position: absolute;
    top: 25%;
    right: -20px;
    width: 120px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg); /* Slight tilt */
  }
  .leaf-left-circle {
    position: absolute;
    top: 70%;
    left: -43px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 150px;
    height: auto;
    z-index: 2;
  }
}

@media (max-width: 768px) {
  .heading h1 {
    font-size: 2.5rem;
    top: -585px;
  }
  .circle-text-container {
    margin-top: -476px;
    margin-right: -210px;
  }
  .star-right {
    position: absolute;
    top: -460%;
    right: 18%;
    width: 100px;
    height: auto;
    z-index: 3;
  }

  .star-left {
    position: absolute;
    top: -420%;
    left: 21.5%;
    width: 100px;
    height: auto;
    z-index: 3;
  }

  .text-right {
    width: 100%;
    margin-top: 50px;
    text-align: center;
    height: 325px;
  }
  .text-right h2 {
    font-size: 2rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 16px;
    font-family: "Inika", serif;
  }
  .leaf-right-top {
    position: absolute;
    top: 25%;
    right: -20px;
    width: 120px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg);
  }
  .leaf-left-circle {
    position: absolute;
    top: 70%;
    left: -43px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 150px;
    height: auto;
    z-index: 2;
  }
}

@media (max-width: 720px) {
  .heading h1 {
    font-size: 2.5rem;
    top: -585px;
  }
  .circle-text-container {
    margin-top: -476px;
    margin-right: -210px;
  }
  .star-right {
    position: absolute;
    top: -460%;
    right: 18%;
    width: 100px;
    height: auto;
    z-index: 3;
  }

  .star-left {
    position: absolute;
    top: -420%;
    left: 19.5%;
    width: 100px;
    height: auto;
    z-index: 3;
  }

  .text-right {
    width: 100%;
    margin-top: 50px;
    text-align: center;
    height: 380px;
  }
  .text-right h2 {
    font-size: 2rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 16px;
    font-family: "Inika", serif;
  }
  .leaf-right-top {
    position: absolute;
    top: 25%;
    right: -20px;
    width: 120px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg); /* Slight tilt */
  }
  .leaf-left-circle {
    position: absolute;
    top: 70%;
    left: -43px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 150px;
    height: auto;
    z-index: 2;
  }
}

@media (max-width: 480px) {
  .heading h1 {
    font-size: 14px;
    top: -582px;
    left: 4px;
  }
  .grid-image {
    width: 70%;
  }
  .star-left {
    width: 70px;
    top: -565px;
  }
  .star-right {
    width: 70px;
    top: -591px;
  }
  .circle-text-container {
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    width: 250px;
    height: 250px;
    margin-top: -995px;
    margin-right: 210px;
  }
  .text-right {
    width: 90%;
    padding: 10px;
    margin-top: -343px;
    height: 420px;
  }
  .text-right h2 {
    font-size: 1.8rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 13px;
    font-family: "Inika", serif;
  }

  .leaf-right-top {
    position: absolute;
    top: 16%;
    right: -20px;
    width: 100px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg);
  }
  .leaf-left-circle {
    position: absolute;
    top: 51%;
    left: -43px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 110px;
    height: auto;
    z-index: 2;
  }
}

@media (max-width: 410px) {
  .heading h1 {
    font-size: 10px;
    top: -586.5px;
    left: 4px;
  }
  .grid-image {
    width: 60%;
  }
  .star-left {
    width: 50px;
    top: -571px;
    left: 89px;
  }
  .star-right {
    width: 50px;
    top: -591px;
    right: 83px;
  }
  .circle-text-container {
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    width: 250px;
    height: 250px;
    box-shadow: 20px 20px 5px #5e785a;
    margin-top: -1010px;
    margin-right: 225px;
  }
  .text-right {
    width: 90%;
    padding: 10px;
    margin-top: -322px;
    height: 430px;
    text-align: center;
  }
  .text-right h2 {
    font-size: 1.8rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 12px;
    font-family: "Inika", serif;
  }

  .leaf-right-top {
    position: absolute;
    top: 16%;
    right: -20px;
    width: 100px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg);
  }
  .leaf-left-circle {
    position: absolute;
    top: 51%;
    left: -43px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 110px;
    height: auto;
    z-index: 2;
  }
}

@media (max-width: 360px) {
  .heading h1 {
    font-size: 10px;
    top: -590.3px;
    left: 4px;
  }
  .grid-image {
    width: 60%;
  }
  .star-left {
    width: 40px;
    top: -572px;
    left: 75px;
  }
  .star-right {
    width: 40px;
    top: -590px;
    right: 70px;
  }
  .circle-text-container {
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    width: 200px;
    height: 200px;
    box-shadow: 18px 18px 5px #5e785a;
    margin-top: -1120px;
    margin-right: 225px;
  }
  .text-right {
    width: 90%;
    padding: 10px;
    margin-top: -420px;
    height: 420px;
    text-align: center;
  }
  .text-right h2 {
    font-size: 1.8rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 12px;
    font-family: "Inika", serif;
  }

  .leaf-right-top {
    position: absolute;
    top: 16%;
    right: -20px;
    width: 90px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg);
  }
  .leaf-left-circle {
    position: absolute;
    top: 51%;
    left: -30px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 90px;
    height: auto;
    z-index: 2;
  }
}
@media (max-width: 344px) {
  .heading h1 {
    font-size: 8px;
    top: -589.3px;
    left: 4px;
  }
  .grid-image {
    width: 60%;
  }
  .star-left {
    width: 35px;
    top: -570px;
    left: 75px;
  }
  .star-right {
    width: 35px;
    top: -589px;
    right: 70px;
  }
  .circle-text-container {
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    width: 200px;
    height: 200px;
    margin-top: -1120px;
    margin-right: 225px;
    box-shadow: 18px 18px 5px #5e785a;
  }
  .text-right {
    width: 90%;
    padding: 10px;
    margin-top: -425px;
    height: 425px;
    text-align: center;
  }
  .text-right h2 {
    font-size: 1.8rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 12px;
    font-family: "Inika", serif;
  }

  .leaf-right-top {
    position: absolute;
    top: 16%;
    right: -20px;
    width: 80px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg);
  }
  .leaf-left-circle {
    position: absolute;
    top: 51%;
    left: -30px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 80px;
    height: auto;
    z-index: 2;
  }
}

@media (max-width: 320px) {
  .heading h1 {
    font-size: 10px;
    top: -590.3px;
    left: 4px;
  }
  .grid-image {
    width: 60%;
  }
  .star-left {
    width: 35px;
    top: -572px;
    left: 65px;
  }
  .star-right {
    width: 35px;
    top: -590px;
    right: 60px;
  }
  .circle-text-container {
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    width: 200px;
    height: 200px;
    margin-top: -1120px;
    margin-right: 225px;
    box-shadow: 18px 18px 5px #5e785a;
  }
  .text-right {
    width: 90%;
    padding: 10px;
    margin-top: -420px;
    height: 460px;
    text-align: center;
  }
  .text-right h2 {
    font-size: 1.8rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 12px;
    font-family: "Inika", serif;
  }

  .leaf-right-top {
    position: absolute;
    top: 16%;
    right: -20px;
    width: 75px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg);
  }
  .leaf-left-circle {
    position: absolute;
    top: 51%;
    left: -30px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 75px;
    height: auto;
    z-index: 2;
  }
}

@media (max-width: 280px) {
  .heading h1 {
    font-size: 8px;
    top: -590.3px;
    left: 4px;
  }
  .grid-image {
    width: 70%;
  }
  .star-left {
    width: 35px;
    top: -574px;
    left: 53px;
  }
  .star-right {
    width: 35px;
    top: -590px;
    right: 45px;
  }
  .circle-text-container {
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    width: 180px;
    height: 180px;
    margin-top: -1120px;
    margin-right: 225px;
    box-shadow: 16px 16px 5px #5e785a;
  }
  .text-right {
    width: 90%;
    padding: 10px;
    margin-top: -420px;
    height: 490px;
    text-align: center;
  }
  .text-right h2 {
    font-size: 1.8rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 12px;
    font-family: "Inika", serif;
  }

  .leaf-right-top {
    position: absolute;
    top: 16%;
    right: -20px;
    width: 60px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg);
  }
  .leaf-left-circle {
    position: absolute;
    top: 51%;
    left: -30px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 60px;
    height: auto;
    z-index: 2;
  }
  .design-left {
    position: absolute;
    bottom: -20px;
    left: -214px;
    width: 250.29px;
    height: 250.14px;
    z-index: 1;
    transform: translateY(-50%) rotate(-153deg);
  }

  .design-right {
    position: absolute;
    bottom: -42px;
    right: -43px;
    width: 250.29px;
    height: 250.14px;
    z-index: 1;
    transform: rotate(5deg);
  }
}

@media (max-width: 240px) {
  .heading h1 {
    font-size: 8px;
    top: -591.3px;
    left: 4px;
  }
  .grid-image {
    width: 80%;
  }
  .star-left {
    width: 30px;
    top: -570px;
    left: 43px;
  }
  .star-right {
    width: 30px;
    top: -590px;
    right: 35px;
  }
  .circle-text-container {
    margin-top: 100px;
    flex-direction: column;
    align-items: center;
  }
  .circle {
    width: 160px;
    height: 160px;
    margin-top: -1175px;
    margin-right: 225px;
    box-shadow: 14px 17px 5px #5e785a;

  }
  .text-right {
    width: 90%;
    padding: 10px;
    margin-top: -500px;
    height: 300px;
    text-align: center;
  }
  .text-right h2 {
    font-size: 1.8rem;
    font-family: "Inika", serif;
  }
  .text-right p {
    font-size: 10px;
    font-family: "Inika", serif;
  }

  .leaf-right-top {
    position: absolute;
    top: 16%;
    right: -20px;
    width: 50px;
    height: auto;
    z-index: 1;
    transform: rotate(-14.85deg);
  }
  .leaf-left-circle {
    position: absolute;
    top: 51%;
    left: -20px;
    transform: translateY(-10%) rotatex(-366deg) rotatey(532deg) rotate(-24deg);
    width: 50px;
    height: auto;
    z-index: 2;
  }
  .design-left {
    position: absolute;
    bottom: -20px;
    left: -214px;
    width: 250.29px;
    height: 250.14px;
    z-index: 1;
    transform: translateY(-50%) rotate(-153deg);
  }

  .design-right {
    position: absolute;
    bottom: -42px;
    right: -43px;
    width: 250.29px;
    height: 250.14px;
    z-index: 1;
    transform: rotate(5deg);
  }

}
`}</style>
    </>
  );
};

export default About;