/* eslint-disable react/no-unescaped-entities */
"use client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../src/firebaseConfig";
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(app);
  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login logic here
    const auth = getAuth(app);

function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Signed in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
}
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/13468728/233847739-219cb494-c265-4554-820a-bd3424c59065.jpg')" }}>
      <form onSubmit={handleLogin} className="w-full max-w-sm p-8 bg-white/10 backdrop-blur-md border border-white/50 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Login</h1>
        
        <div className="relative mb-6">
          <ion-icon name="mail-outline" className="absolute right-3 top-3 text-white text-xl"></ion-icon>
          <input
            type="email"
            className="w-full h-12 px-4 bg-transparent border-b-2 border-white text-white placeholder-gray-400 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-6">
          <ion-icon name="lock-closed-outline" className="absolute right-3 top-3 text-white text-xl"></ion-icon>
          <input
            type="password"
            className="w-full h-12 px-4 bg-transparent border-b-2 border-white text-white placeholder-gray-400 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between items-center mb-6 text-sm text-white">
          <label>
            <input type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <a href="#" className="font-semibold hover:underline">Forget Password?</a>
        </div>

        <button className="w-full py-2 rounded-full bg-white text-black font-semibold hover:bg-opacity-80 transition-all">Log in</button>
        
        <div className="text-center mt-6 text-white">
          <p>Don't have an account? <Link href="/register" className="font-semibold hover:underline">Register</Link></p>
        </div>
      </form>
    </section>
  );
}
