import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        {/* Replace with your actual logo image or text */}
        <span>JVS</span>
      </div>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}