// React imports
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Component imports
import Stepper from "../Components/Stepper";
import Frame from "../Components/Frame";

// Context imports
import { TriviaContext } from "../context/TriviaContext";

// Custom hook imports
import useFetch from "../hooks/useFetch";

// Animation imports
import { motion, AnimatePresence } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

// Asset imports
import arrow from "../assets/arrow-clockwise.svg";
import escape from "../assets/escape.svg";

// Variable imports
import { ALERT_MESSAGES, ALERT_TYPE } from "../variables/alertMessage";

const QuizQuestions = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState({
    state: false,
    severity: "",
    message: "",
  });

  const navigate = useNavigate();
  const { setMetadataState } = useContext(TriviaContext);
  const { trivia, isLoading, errMsg, handleNewGame } = useFetch();

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleSelected = (choice) => {
    const temp = [...selected];
    temp[currentQuestionIndex] = choice;
    setSelected(temp);
  };

  const handleAlert = (msg, type) => {
    setAlert(() => ({
      state: true,
      message: msg,
      severity: type,
    }));
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, state: false }));
    }, 5000);
  };

  const handleCurrentScore = () => {
    if (trivia.length > 0) {
      if (
        selected[currentQuestionIndex] ===
        trivia[currentQuestionIndex].correct_answer
      ) {
        setCount((prev) => prev + 1);
      }
    }
  };

  const gradeMyWork = () => {
    if (selected.length === trivia.length) {
      setRevealAnswer(true);
      if (count === trivia.length) {
        handleAlert(ALERT_MESSAGES.SUCCESS_MESSAGE, ALERT_TYPE.SUCCESS_TYPE);
        setIsExploding((prev) => !prev);
        setTimeout(() => {
          setIsExploding((prev) => !prev);
        }, 5000);
      } else {
        let wrongAns = trivia.length - count;
        handleAlert(
          `${
            wrongAns === trivia.length
              ? `Oops! It looks like all of your answers are incorrect`
              : `Oops! It looks like ${wrongAns} of your answer${
                  wrongAns === 1 ? " is" : "s are"
                } incorrect`
          }`,
          ALERT_TYPE.ERROR_TYPE
        );
      }
    } else {
      handleAlert(ALERT_MESSAGES.WARNING_MESSAGE, ALERT_TYPE.WARNING_TYPE);
    }
  };

  const reloadGame = () => {
    setCurrentQuestionIndex(0);
    setCount(0);
    setRevealAnswer(false);
    setSelected([]);
  };

  const opacityVariants = {
    hidden: { opacity: 0, transition: { duration: 1 } },
    visible: { opacity: 1, transition: { duration: 1 } },
  };
  const alertVariants = {
    hidden: { y: 0, opacity: 0 },
    visible: {
      y: -40,
      opacity: [0, 1],
      transition: { duration: 1, type: "spring" },
    },
    exit: { y: -40, opacity: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    handleCurrentScore();
  }, [selected, currentQuestionIndex]);

  return (
    <div className="p-3 md:p-5 md:gap-3 lg:gap-5 flex-grow flex justify-center flex-col items-center gap-5 relative bg-image-2">
      <AnimatePresence>
        {isLoading ? (
          <Frame />
        ) : (
          <motion.div
            className="flex flex-col m-5 card rounded-lg p-2 bg-white items-center relative w-full md:w-3/4 lg:w-3/5"
            variants={opacityVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {alert.state && (
                <motion.div
                  className={
                    "absolute top-0 p-2 text-xs border rounded-lg before:content-[attr(before)] " +
                    (alert.severity === ALERT_TYPE.ERROR_TYPE
                      ? "bg-red-500"
                      : alert.severity === ALERT_TYPE.WARNING_TYPE
                      ? "bg-orange-500"
                      : alert.severity === ALERT_TYPE.SUCCESS_TYPE
                      ? "bg-green-500"
                      : "")
                  }
                  before={alert.message}
                  role="alert"
                  onClick={() =>
                    setAlert((prev) => ({ ...prev, state: !prev.state }))
                  }
                  variants={alertVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                ></motion.div>
              )}
            </AnimatePresence>
            {isExploding && (
              <ConfettiExplosion particleCount={200} duration={5000} />
            )}
            {trivia.length > 0 && (
              <div className="flex flex-col gap-5 py-2 w-full">
                <motion.p
                  className="font-light text-sm text-center text-slate-950"
                  variants={opacityVariants}
                  initial="hidden"
                  whileInView="visible"
                >
                  {trivia[currentQuestionIndex].question}
                </motion.p>
                <div className="w-full grid grid-cols-1 gap-3">
                  {trivia[currentQuestionIndex].choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (!revealAnswer) {
                          handleSelected(choice);
                        }
                      }}
                      className={
                        "bg-slate-none border rounded-md p-2 text-sm font-thin hover:border-blue-300 transition-colors duration-200 ease-in " +
                        (revealAnswer
                          ? selected[currentQuestionIndex] === choice
                            ? selected[currentQuestionIndex] ===
                              trivia[currentQuestionIndex].correct_answer
                              ? "bg-green-500"
                              : "bg-red-500"
                            : choice ===
                              trivia[currentQuestionIndex].correct_answer
                            ? "bg-green-500"
                            : ""
                          : selected[currentQuestionIndex] === choice
                          ? "bg-blue-300 "
                          : "")
                      }
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <Stepper
              currentQuestionIndex={currentQuestionIndex}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {isLoading ? null : revealAnswer ? (
        <div className="flex justify-center gap-5 w-full items-center">
          <motion.button
            title="Change Catagories"
            variants={opacityVariants}
            initial="hidden"
            animate="visible"
            className="rounded-full border w-fit h-fit p-2"
            whileTap={{ rotate: -360 }}
            onClick={() => {
              reloadGame();
              navigate("/categories");
              setMetadataState({ category: "", mode: "", count: 5 });
            }}
          >
            <img src={escape} alt="escape" className="w-6 aspect-square" />
          </motion.button>
          <motion.button
            variants={opacityVariants}
            initial="hidden"
            animate="visible"
            className="bg-slate-950 px-5 lg:px-16 py-2 lg:py-3 rounded-full capitalize text-slate-50 w-fit text-sm font-thin"
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              reloadGame();
              handleNewGame();
            }}
          >
            New Game
          </motion.button>
          <motion.button
            title="Reload Game"
            variants={opacityVariants}
            initial="hidden"
            animate="visible"
            className="rounded-full border w-fit h-fit p-2"
            whileTap={{ rotate: 360 }}
            onClick={() => {
              reloadGame();
            }}
          >
            <img
              to="/"
              src={arrow}
              alt="Clockwise arrow icon"
              className="w-6 aspect-square"
            />
          </motion.button>
        </div>
      ) : (
        <motion.button
          variants={opacityVariants}
          initial="hidden"
          animate="visible"
          className="bg-blue-800 px-5 lg:px-16 py-2 lg:py-3 rounded-full capitalize text-slate-50 w-fit text-sm font-thin"
          whileTap={{ scale: 0.85 }}
          onClick={gradeMyWork}
        >
          Grade My Work
        </motion.button>
      )}
    </div>
  );
};
export default QuizQuestions;
