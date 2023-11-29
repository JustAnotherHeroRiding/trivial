"use client";
import React, { useState } from "react";
import { Button } from "../_components/@/components/ui/button";

interface SignUpProps {
  signUserUp: (name: string, email: string, password: string) => Promise<void>;
}

export default function SignUp({ signUserUp }: SignUpProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-gradient-to-t from-blue-100 via-blue-300 to-blue-500 font-sans">
      <div className="container flex flex-grow flex-col items-center justify-center gap-12 px-4 py-16 ">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => signUserUp(name, email, password)} className="">
          Create account
        </Button>
      </div>
    </main>
  );
}
