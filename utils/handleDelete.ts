import { db } from "@/lib/firebase";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";

export const handleDelete = async (docId: string , name: string , id: number ) => {
  try {
    // 削除前の確認ダイアログ
    const confirmDelete = window.confirm(`本当に製品「${name}」(ID: ${id}) を削除しますか？`);
    
    if (!confirmDelete) {
      return; // ユーザーがキャンセルした場合は削除しない
    }

    const Ref = collection(db, "registr");
    const req = query(Ref, where("name", "==", name));
    const snapshot = await getDocs(req);
    

    if (snapshot.empty) {
      window.alert("その製品は存在しません");
      return;
    }

    // 非同期処理を待ちながら削除
    for (const doc of snapshot.docs) {
      if( docId === docId ) {
      await deleteDoc(doc.ref);
      window.alert(`製品「${name}」(ID: ${id})を削除しました`);
      return;
      }
    }

  } catch (error) {
    console.error("データ削除に失敗しました", error);
    window.alert("データ削除に失敗しました");
  }
};
