import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { getCookiesAsJson } from '../utils/cookieHelper';
import { NavLink } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const loginVerify = () => {
    const cookies = getCookiesAsJson();
    if (cookies.token) {
      return true;
    } else {
      navigate('/login');
    }}
  return (
    <>
      <Navbar />
      <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen flex justify-center">
        {/* Sidebar */}
        <aside className="w-1/5 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] p-4 rounded-lg shadow mx-4 my-4">
          <h2 className="text-xl font-semibold">Sidebar</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            This is the sidebar content.
          </p>
        </aside>

        {/* Main Section */}
        <main className="w-3/5 p-4">
          {/* Part 1: Two Boxes */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] p-4 rounded-lg shadow">
              <h3 className="font-semibold">Box 1</h3>
              <p className="text-sm">Content goes here.</p>
            </div>
            <div className="flex-1 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] p-4 rounded-lg shadow">
              <h3 className="font-semibold">Box 2</h3>
              <p className="text-sm">Content goes here.</p>
            </div>
          </div>

          {/* Part 2: Empty */}
          <div className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] p-4 rounded-lg shadow mb-4">
            <h3 className="font-semibold">Part 2</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Nothing special here, just a placeholder.
            </p>
          </div>

          {/* Part 3: Empty */}
          <div className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] p-4 rounded-lg shadow">
            <h3 className="font-semibold">Part 3</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              Nothing special here, just a placeholder.
              {/* add navlink to userDetails */}
              <NavLink to="/userDetails">User Details</NavLink> 
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
