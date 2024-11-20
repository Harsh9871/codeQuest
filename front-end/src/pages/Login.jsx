import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Loginfrom from '../components/Loginfrom';
import { getCookiesAsJson } from '../utils/cookieHelper';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Code Quest | Login Page';
    
    const cookoies = getCookiesAsJson();
    if (cookoies.token) {
      navigate('/profile');
    }
  }, [navigate]);

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      document.cookie = `token=${data.token}; path=/`;
      console.log('Login successful:', data);

      navigate('/profile');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen mt-[10vh] justify-center bg-[var(--background)]">
        <Loginfrom
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          loading={loading}
          error={error}
          onLogin={onLogin}
        />
      </div>
    </>
  );
};

export default Login;
