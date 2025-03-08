import { Timestamp } from "firebase/firestore";

export const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>,setMonth:React.Dispatch<React.SetStateAction<Timestamp | undefined>>) => {
    const inputValue = e.target.value;  // 例: "2025-02-05"
    const [year, monthStr, dayStr] = inputValue.split('-');
    const monthNum = parseInt(monthStr, 10) - 1;  // 月は0から始まるので-1
    const dayNum = parseInt(dayStr, 10); // 日を取得
    const date = new Date(Number(year), monthNum, dayNum); // 新しいDateオブジェクトを作成
    const newTimestamp = Timestamp.fromDate(date);
    setMonth(newTimestamp); // DateオブジェクトをTimestampに変換してsetMonth
  };
  