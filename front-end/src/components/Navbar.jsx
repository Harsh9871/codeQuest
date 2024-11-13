import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useNavigate , useLocation} from 'react-router-dom';
import '../App.css';

const Navbar = ({ message }) => {
  const location = useLocation();

  // Current URL path
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  // Navigate to specific routes
  const goToHome = () => {
    navigate('/');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToLogin = () => {
    navigate('/login');
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

  // Destructure loggedIn from the message prop
  const { loggedIn } = message || {};

  return (
    <nav className="border-b shadow-lg bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold cursor-pointer" onClick={goToHome}>Code Quest</div>

        {loggedIn ? (
          // Profile Icon
          <div 
            className="flex items-center space-x-4 cursor-pointer" 
            onClick={goToProfile}
          >
            <img 
              src="https://via.placeholder.com/40" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border"
            />
            <span className="text-lg font-medium">Profile</span>
          </div>
        ) : (
          // Login/Signup Button
          <div className="flex space-x-4">
            {/* check if current location is /login or /signup then dont show buttons  */}
            {(currentPath == "/login" || currentPath == "/signup") ? (<></>) : (<>
              <Button 
              onClick={goToLogin} 
              className="p-4 transition-colors duration-300 bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md hover:shadow-lg"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/signup')} 
              className="p-4 transition-colors duration-300 bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md hover:shadow-lg"
            >
              Signup
            </Button>
            </>) }
            
            <Button 
            onClick={toggleTheme} 
            className="md:ml-8 p-4 transition-colors duration-300 bg-[var(--secondary)] text-[var(--secondary-foreground)]"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
