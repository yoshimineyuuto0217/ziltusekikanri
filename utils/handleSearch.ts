import { db } from "@/lib/firebase";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";

//これだとデータ消した後にほかのデータが画面から見えなくなる
// export const handleSearch = async (name:string , setSearch:  React.Dispatch<React.SetStateAction<DocumentData[]>>) => {
//     try {
//       const searchQuery = query(
//         collection(db, "registr"),
//         where("name", "==", name)
//       );
//       const querySnapshot = await getDocs(searchQuery);
//       if (querySnapshot.empty) {
//         window.confirm(`${name}は存在しません`);
//         return;
//       }
//       const results = querySnapshot.docs.map((doc) => doc.data());
//       setSearch(results); // 結果を取得して状態にセット
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };
export const handleSearch = async (
  name: string,
  setSearch: React.Dispatch<React.SetStateAction<DocumentData[]>>
) => {
  try {
    let results = [];

    if (name.trim() === "") {
      // 入力が空なら全データを取得
      const querySnapshot = await getDocs(collection(db, "registr"));
      results = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
        uniqueKey: `${doc.data().name}-${doc.data().id}`, // 一意のキー
      }));
    } else {
      // 入力がある場合、name でフィルタリング
      const searchQuery = query(collection(db, "registr"), where("name", "==", name));
      const querySnapshot = await getDocs(searchQuery);

      if (querySnapshot.empty) {
        window.confirm(`${name} は存在しません`);
        return;
      }

      results = querySnapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
        uniqueKey: `${doc.data().name}-${doc.data().id}`,
      }));
    }

    setSearch(results);
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};