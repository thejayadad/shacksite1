'use client'

import React, { useState } from 'react'
import { registerUser } from '@/utils/userService'
import { ToastContainer, toast } from 'react-toastify'


const Register = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [registrationError, setRegistrationError] = useState(null);

  const handleRegister = async () => {
    try {
      const data = await registerUser(userData);
      toast.success("Successfully registered the user")
    } catch (error) {
      setRegistrationError(error.message);
    }
  };

  return (
    <section>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
      {registrationError && <p>Error: {registrationError}</p>}

      <ToastContainer />
    </section>
  );
};

export default Register;
