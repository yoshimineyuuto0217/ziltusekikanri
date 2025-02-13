import { db } from "@/lib/firebase";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";

export const handleDelete = async(id:number, name:string) => {
       try {
             const Ref = collection(db, "registr");
             const req = query(Ref, where("name", "==", name), where("id", "==", id));
             const snapshot = await getDocs(req);
             
             if (snapshot.empty) {
               window.confirm("その製品は存在しません")
               return;
             }
             // forEach ではなく for...of を使って非同期処理を待つ
             for (const doc of snapshot.docs) {
               await deleteDoc(doc.ref); // 各ドキュメントを削除
             }
             window.confirm(`製品：${name} ID: ${id} を削除しました`);
             
           } catch (error) {
             console.error("データ削除に失敗しました", error);
           }
      }
