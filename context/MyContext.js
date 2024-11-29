"use client";
import React, { createContext, useState } from "react";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (!user) {
        router.push("/sign-up"); // Adjust the route as per your application
      } else {
        setUid(user.uid);
        fetchUserr(user.uid);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchUserr = async (uid) => {
    try {
      const res = await fetch(`/api/getUsers`);

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const userData = await res.json();
      const data = userData.find((user) => user.uid === uid);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/getUsers`);

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const userData = await res.json();
      const data = userData.find((user) => user.uid === uid);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchVendors = async () => {
    try {
      const vendorsRef = collection(db, "vendors"); // Get a reference to the 'vendors' collection
      const vendorsSnapshot = await getDocs(vendorsRef); // Fetch all documents in the collection
      const data = vendorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Vendors fetched successfully:", data);
      setVendors(data); // Update state or handle data as needed
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };

  return (
    <MyContext.Provider
      value={{ isOpen, setIsOpen, user, setUser, fetchUser, vendors }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
