// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Navbar = ({ message }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  // Navigate to home without refreshing the page
  const goToHome = () => {
    navigate('/');
  };

  // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  // Load saved theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  return (
    <nav className="border-b shadow-lg bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold cursor-pointer" onClick={goToHome}>Code Quest</div>
        {message === "Graph" && (
          <div className="text-2xl font-bold cursor-pointer" onClick={goToHome}>
            Home  
          </div>
        )}
        
        {/* Theme Toggle Button */}
        <Button onClick={toggleTheme} className="md:ml-8 p-4 transition-colors duration-300 bg-[var(--secondary)] text-[var(--secondary-foreground)]">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
