// Burger.js
import React, { useState } from 'react';
import styles from "./burger.module.css";



export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="relative w-8 h-8 flex flex-col justify-between items-center cursor-pointer group"
    >
      {/* Top line */}
      <span
        className={`block h-1 w-8 bg-stone-200 rounded transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-3" : ""
        }`}
      ></span>

      {/* Middle line */}
      <span
        className={`block h-1 w-8 bg-stone-200 rounded transition-all duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      ></span>

      {/* Bottom line */}
      <span
        className={`block h-1 w-8 bg-stone-200 rounded transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-3" : ""
        }`}
      ></span>
    </button>
  );
}









