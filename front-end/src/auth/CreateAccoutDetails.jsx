import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CreateAccountDetails = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/user/verifyEmail/${token}`);
                if (response.status === 200) {
                    // Set the token in cookies with expiry of 365 days
                    Cookies.set('token', response.data.responseToken, { expires: 365 });
                    setRole(response.data.role);
                }
            } catch (err) {
                setError(err.message || "Failed to verify email.");
            }
        };

        if (token) verifyEmail();
    }, [token]);

    if (error) {
        return <h1>Error: {error}</h1>;
    }

    if (role === null) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            {role === "user" ? navigate('/userDetails') : navigate('/teacherDetails')}
        </>
    );
};

export default CreateAccountDetails;