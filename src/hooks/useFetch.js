// React imports
import { useState, useEffect, useContext } from "react";

// Context imports
import { TriviaContext } from "../context/TriviaContext";

// Variable imports
import { ALERT_MESSAGES } from "../variables/alertMessage";

export default function useFetch() {
  const [trivia, setTrivia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);
  const [newGame, setNewGame] = useState(false);

  const { url } = useContext(TriviaContext);

  const shuffleArray = (array) => {
    const i = 0;
    let j = Math.ceil(Math.random() * 4);
    if (j === 4) {
      return array;
    } else {
      [array[i], array[j]] = [array[j], array[i]];
      return array;
    }
  };

  const handleNewGame = () => {
    setNewGame((prev) => !prev);
  };

  useEffect(() => {
    if (!url) return;
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const json = await response.json();
        const modifiedTrivia = [];
        json.results.forEach((question) => {
          const shuffledArr = shuffleArray([
            question.correct_answer,
            ...question.incorrect_answers,
          ]);
          question.choices = shuffledArr;
          modifiedTrivia.push(question);
        });
        setIsLoading(false);
        setTrivia(modifiedTrivia);
      } catch (error) {
        setErrMsg(error.message);
        alert(ALERT_MESSAGES.FAILED_TO_FETCH);
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, [url, newGame]);

  return { trivia, isLoading, errMsg, handleNewGame };
}
