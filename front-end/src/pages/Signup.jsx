import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SignupForm from "../components/Signupform";
import { getCookiesAsJson } from "../utils/cookieHelper";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // New state for email
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user"); // Default role
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Code Quest | Signup Page";

        const cookies = getCookiesAsJson();
        if (cookies.token) {
            navigate("/profile");
        }
    }, []);

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = {
                userName: username,
                email,
                password,
                confirmPassword,
                role,
            };
        
            console.log("Sending data:", data);
        
            const response = await axios.post(
                "http://localhost:8080/user/register",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        
            console.log("Signup response:", response.data);
        
            if (response.status !== 200) {
                throw new Error(response.data.message || "Signup failed");
            }
        
            document.cookie = `token=${response.data.token}; path=/`;
            console.log("Signup successful:", response.data);
            navigate("/checkemail");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen mt-[10vh] justify-center bg-[var(--background)]">
                <SignupForm
                    username={username}
                    setUsername={setUsername}
                    email={email} // Pass email state
                    setEmail={setEmail} // Pass email setter
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    role={role}
                    setRole={setRole}
                    loading={loading}
                    error={error}
                    onLogin={onLogin}
                />
            </div>
        </>
    );
};

export default Signup;
