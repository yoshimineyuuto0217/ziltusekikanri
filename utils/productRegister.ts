import { useState } from "react";
import { Timestamp } from "firebase/firestore";

export const useProductRegister = () => {
  const [productName, setProductName] = useState("");
  const [production, setProduction] = useState<number | null>(null);
  const [month, setMonth] = useState<Timestamp | undefined>(undefined);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [comment, setComment] = useState("");
  const [temperature, setTemperature] = useState<number | null>(null);

  const resetFields = () => {
    setProductName("");
    setProduction(null);
    setMonth(undefined);
    setWeight("");
    setHeight("");
    setComment("");
    setTemperature(null);
  };

  return {
    productName, setProductName,
    production, setProduction,
    month, setMonth,
    weight, setWeight,
    height, setHeight,
    comment, setComment,
    temperature, setTemperature,
    resetFields,
  };
};