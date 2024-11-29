import { db } from "@/firebase";
import { collection, getDoc, doc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { vendorId } = req.query;

      if (!vendorId) {
        return res.status(400).json({ message: "Vendor ID is required." });
      }

      const vendorRef = doc(db, "vendors", vendorId);
      const vendorSnapshot = await getDoc(vendorRef);

      if (!vendorSnapshot.exists()) {
        return res.status(404).json({ message: "Vendor not found." });
      }

      const vendorData = { id: vendorSnapshot.id, ...vendorSnapshot.data() };

      res.status(200).json(vendorData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
