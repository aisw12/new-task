// pages/Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api'; // assumes you have this API call

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-20 p-4 shadow-md">
      <h2 className="text-xl mb-4 font-bold">Sign Up</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="block mb-3 border p-2 w-full" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="block mb-3 border p-2 w-full" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;
