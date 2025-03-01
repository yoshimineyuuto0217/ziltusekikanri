import { db } from "@/lib/firebase";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";

export const handleSearch = async (setSearch:  React.Dispatch<React.SetStateAction<DocumentData[]>>) => {
    try {
      const searchQuery = query(
        collection(db, "registr"),
        where("name", "==", name)
      );
      const querySnapshot = await getDocs(searchQuery);
      if (querySnapshot.empty) {
        window.confirm(`${name}は存在しません`);
        return;
      }
      const results = querySnapshot.docs.map((doc) => doc.data());
      setSearch(results); // 結果を取得して状態にセット
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };