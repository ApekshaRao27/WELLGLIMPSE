import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "./firebase"; // adjust path as needed

export const fetchUserScores = async () => {
  try {
    const mongoId = localStorage.getItem("mongoId");

    if (!mongoId) {
      console.warn("❌ No MongoDB ID found — skipping fetch.");
      return [];
    }

    console.log("🆔 Using MongoDB ID:", mongoId);

    const q = query(
      collection(db, "questionnaireResponses"),
      where("uid", "==", mongoId),
      orderBy("timestamp", "desc"),
      limit(5)
    );

    const snapshot = await getDocs(q);

    const results = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        date: data.timestamp?.toDate().toLocaleDateString("en-IN"),
        score: data.riskScore,
      };
    }).reverse();

    console.log("📈 Results:", results);

    return results;
  } catch (error) {
    console.error("🔥 Error fetching user scores:", error);
    return [];
  }
};

