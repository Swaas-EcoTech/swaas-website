"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { Shadow } from "ogl";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const backgroundColor = pathname === "/" ? "#778B63" : "#ffffff";
  return (
    <>
      {/* <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inika:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head> */}

      <nav className="navbar" style={{ backgroundColor }}>
        <div className="navbar-logo">
          <img
            src={pathname === "/" ? "/logoHome.png" : "/logo-swaas.jpg"}
            alt="Logo"
          />
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/community"
              className={pathname === "/community" ? "active" : ""}
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              href="/events"
              className={pathname === "/events" ? "active" : ""}
            >
              Events
            </Link>
          </li>
          <li className="dropdown">
            <Link href="/Team" className={pathname === "/Team" ? "active" : ""}>
              Team
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              className={pathname === "/gallery" ? "active" : ""}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href="/collabs"
              className={pathname === "/collabs" ? "active" : ""}
            >
              Collabs
            </Link>
          </li>
          <li>
            <Link
              href="/Alumni"
              className={pathname === "/Alumni" ? "active" : ""}
            >
              Alumni
            </Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        /* Base Navbar Styles */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 15px; /* Added horizontal padding for mobile */
          color: rgb(0, 0, 0);
          font-family: "Inika", serif;
          opacity: 100;
          position: relative;
          z-index: 100;
          width: 100%; /* Ensure full width */
          box-sizing: border-box; /* Include padding in width calculation */
        }

        .navbar-logo img {
          width: 92px;
          height: 92px;
          position: relative;
          top: 10px;
          border-radius: 50%;
          opacity: 100%;
        }

        .navbar-links {
          list-style-type: none;
          display: flex;
          gap: 5px;
          margin-left: auto;
          opacity: 100;
          padding: 0;
          margin: 0; /* Reset margin */
        }

        .navbar-links li {
          display: inline;
        }

        .navbar-links a {
          text-decoration: none;
          color: rgb(0, 0, 0);
          font-size: 24px;
          transition: all 0.3s ease;
          font-weight: 400;
          opacity: 100;
          padding: 10px 20px;
          border-radius: 18px;
        }

        .navbar-links a.active {
          background-color: #b4c79d;
          color: rgb(0, 0, 0);
          justify-content: center;
          align-item: center;
          border-radius: 50px;
        }

        .navbar-links a:hover {
          background-color: #b4c79d;
          border-radius: 50px;
        }

        .dropdown {
          position: relative;
          display: inline-block;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          z-index: 1;
          width: fit-content;
          top: 120%;
        }

        .dropdown-content a {
          width: max-content;
          color: black;
          text-decoration: none;
          display: block;
        }

        .dropdown-content a:hover {
          background-color: #f0f0f0;
        }

        .dropdown:hover .dropdown-content {
          display: block;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .navbar {
            padding: 10px 15px; /* Consistent padding */
            flex-wrap: nowrap; /* Prevent wrapping */
          }

          .navbar-logo img {
            width: 60px; /* Smaller logo for mobile */
            height: 60px;
            top: 5px;
          }
          .navbar-links {
            display: none;
            flex-direction: column;
            gap: 0;
            width: calc(100vw - 30px);
            background-color: white;
            position: absolute;
            top: 80px;
            left: 15px;
            right: 15px;
            padding: 7px 14px;
            border-radius: 15px;
            z-index: 99;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: calc(100% - 30px);
            box-sizing: border-box;
          }

          .navbar-links.open {
            display: flex;
          }

          .navbar-links li {
            width: 100%;
            border-bottom: 1px solid #f0f0f0;
          }

          .navbar-links li:last-child {
            border-bottom: none;
          }

          .navbar-links a {
            width: 100%;
            justify-content: center;
            padding: 30px 20px;
            font-size: 18px; /* Smaller font for mobile */
            border-radius: 100; /* Remove border radius for mobile */
            display: block;
            text-align: center;
            box-sizing: border-box;
          }

          .navbar-links a:hover,
          .navbar-links a.active {
            background-color: #b4c79d;
            justify-content: center;
          }

          .hamburger {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 20px; /* Slightly smaller */
            width: 25px;
            cursor: pointer;
            flex-shrink: 0; /* Prevent shrinking */
          }

          .hamburger .bar {
            width: 100%;
            height: 3px; /* Slightly thinner */
            background-color: #000;
            border-radius: 2px;
            transition: all 0.3s ease;
          }

          /* Hamburger animation */
          .hamburger.open .bar:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }

          .hamburger.open .bar:nth-child(2) {
            opacity: 0;
          }

          .hamburger.open .bar:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          .navbar {
            padding: 8px 12px;
          }

          .navbar-logo img {
            width: 50px;
            height: 50px;
          }

          .navbar-links {
            left: 12px;
            right: 12px;
            width: calc(100vw - 24px);
            max-width: calc(100% - 24px);
            top: 70px;
          }

          .navbar-links a {
            font-size: 16px;
            padding: 12px 15px;
          }

          .hamburger {
            height: 18px;
            width: 22px;
          }
        }

        /* Desktop Styles */
        @media (min-width: 769px) {
          .navbar {
            padding: 5px 20px;
          }

          .navbar-links {
            display: flex !important;
            position: static;
            width: auto;
            background-color: transparent;
            box-shadow: none;
            gap: 5px;
          }

          .navbar-links li {
            border-bottom: none;
          }

          .navbar-links a {
            padding: 10px 20px;
            font-size: 24px;
            border-radius: 18px;
          }

          .hamburger {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
