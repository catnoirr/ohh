"use client"
import { auth } from '@/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Redirect = () => {
    const router = useRouter(); 

  useEffect(() => {
    // Check if user is already logged in
    // signOut(auth)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is already logged in, redirect to dashboard
        // toast.success("Already logged in...");
        router.push("/sign-up"); // Adjust the route as per your application
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return (
    <></>
  )
}

export default Redirect
