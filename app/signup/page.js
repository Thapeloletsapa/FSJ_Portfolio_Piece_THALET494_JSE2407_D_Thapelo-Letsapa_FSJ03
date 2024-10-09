// app/signup/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // For navigation
import { signUp } from '../lib/useAuth';
import BackToProductButton from '@/components/BackToProductButton';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // For navigation

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert('User created successfully!');
      router.push('/products'); // Navigate to products after successful sign-up
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirect to login page
  };

  const handleBackToProducts = () => {
    router.push('/products'); // Redirect back to products page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/your-background-image.jpg")' }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-30 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-30 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-6 flex justify-between space-x-4">
          <button
            onClick={handleLoginRedirect}
            className="w-full py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition duration-300"
          >
            Log In
          </button>
          <BackToProductButton />
        </div>
      </div>
    </div>
  );
}
