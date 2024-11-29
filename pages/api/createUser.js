import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    // Validate input data
    if (!email || !password || !name) {
      return res.status(400).json({
        message:
          "Please provide all necessary fields: email, password, name.",
      });
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userId = `US${Date.now()}`;
      await setDoc(doc(db, "users", userId), {
        email,
        name,
        role: "user",
        createdAt: new Date(),
        userId,
        uid: user.uid,
        status: "unblocked",
      });

      res.status(200).json({ message: "User created successfully." });
    } catch (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        res.status(400).json({ message: "Email already in use." });
      }
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
