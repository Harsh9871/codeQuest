import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import { getCookiesAsJson } from '../utils/cookieHelper';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navbar = () => {
  const cookies = getCookiesAsJson() || {};
  const isLoggedIn = !!cookies.token; // Check if token exists in cookies
  const location = useLocation();
  const currentPath = location.pathname; // Get current URL path
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  // Navigate to specific routes
  const goToHome = () => navigate('/');
  const goToLogin = () => navigate('/login');

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
    <nav className="border-b shadow-lg bg-[hsl(var(--background))] text-[var(--foreground)]">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold cursor-pointer" onClick={goToHome}>
          Code Quest
        </div>

        {isLoggedIn ? (
          // Profile section when logged in
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src="http://localhost:5173/default.jpg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>More...</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/logout')}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={toggleTheme}
              className="p-4 transition-colors duration-300 bg-[var(--secondary)] text-[var(--secondary-foreground)]"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </div>
        ) : (
          // Login/Signup section when not logged in
          <div className="flex space-x-4">
            {currentPath !== '/login' && currentPath !== '/signup' && (
              <>
                <Button
                  onClick={goToLogin}
                  className="p-4 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="p-4 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Signup
                </Button>
              </>
            )}
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
