// React imports
import React, { useState, useEffect, createContext } from "react";

// Data import
import data from "../data/data.json";

export const TriviaContext = createContext();

export default function TriviaContextProvider({ children }) {
  const [metadata, setMetadata] = useState({
    categoryName: "",
    category: "",
    mode: "",
    count: null,
  });
  const [categories, setCategories] = useState([]);
  const [score, setScore] = useState(5);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setCategories(data.categories);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setUrl(
      `https://opentdb.com/api.php?amount=${metadata.count}&category=${metadata.category}&difficulty=easy&type=multiple`
    );
  };

  const SetScoreState = (value) => {
    setScore(value);
  };
  const setMetadataState = (value) => {
    setMetadata(value);
  };

  const value = {
    categories,
    url,
    score,
    SetScoreState,
    metadata,
    setMetadataState,
    fetchData,
  };

  return (
    <TriviaContext.Provider value={value}>{children}</TriviaContext.Provider>
  );
}
