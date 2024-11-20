import React from "react";
const Checkemail = () => {
  
  return (
  <>
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
      }}
    >
      <div
        className="p-8 rounded-lg shadow-lg max-w-md text-center"
        style={{
          backgroundColor: "hsl(var(--card))",
          color: "hsl(var(--card-foreground))",
          border: "1px solid hsl(var(--border))",
        }}
      >
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-16 h-16 mx-auto"
            style={{ color: "hsl(var(--primary))" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3.5L7.5 12.5M3 12V21h9M21 3v9h-9"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4">
          Check Your Email
        </h1>
        <p className="mb-6 text-sm">
          We've sent a verification email to your email address. Please check
          your inbox and follow the instructions to verify your email address.
        </p>
        
      </div>
    </div>
    </>
  );
};

export default Checkemail;
