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
          <li>
            <Link
              href="/about"
              className={pathname === "/about" ? "active" : ""}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>


      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 5px;
          color: rgb(0, 0, 0);
          font-family: "Inika", serif;
          opacity: 100;
          position: relative;
          z-index: 100;
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

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            background-color: white;
            position: absolute;
            top: 60px;
            left: 0;
            padding: 20px;
            border-radius: 10px;
            z-index: 99;
          }

          .navbar-links.open {
            display: flex;
          }

          .hamburger {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 24px;
            width: 30px;
            cursor: pointer;
          }

          .hamburger .bar {
            width: 100%;
            height: 4px;
            background-color: #000;
            border-radius: 5px;
          }

          .navbar-logo img {
            width: 129px;
            height: 110px;
          }
        }

        @media (min-width: 769px) {
          .navbar-links {
            display: flex;
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
