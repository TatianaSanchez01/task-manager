"use client";
import { SignIn } from '@clerk/nextjs';
import React from 'react'

export default function Page() {
  return (
    <div className="flex items-center justify-center h-full">
      <SignIn path='sign-in'  afterSignOutUrl="sign-in"/>
    </div>
  );
}

