import { db } from "@/firebase";
import { collection, query, limit, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { count } = req.query;
      const blogsCollection = collection(db, "blogs");
      const blogsQuery = query(blogsCollection, limit(parseInt(count, 10)));
      const snapshot = await getDocs(blogsQuery);

      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
