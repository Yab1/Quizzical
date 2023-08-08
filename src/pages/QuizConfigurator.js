// React imports
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

// Material-UI imports
import { Typography, Box, Slider } from "@mui/material";

// Context imports
import { TriviaContext } from "../context/TriviaContext";

// Animation imports
import { motion } from "framer-motion";

// Asset imports
import snap from "../assets/snap.png";
import medium from "../assets/medium.png";
import hard from "../assets/hard-work.png";

const QuizConfigurator = () => {
  const { metadata, setMetadataState, fetchData } = useContext(TriviaContext);

  const navigate = useNavigate();

  const letsBegin = () => {
    if (metadata.category === "") {
      return navigate("/categories");
    } else if (metadata.mode === "") {
      return;
    } else if (metadata.category !== "" && metadata.mode !== "") {
      fetchData();
      navigate("/quizzical");
    }
  };

  const valuetext = (value) => {
    return `${value}°C`;
  };

  const handleSliderChange = (value) => {
    setMetadataState((prev) => ({ ...prev, count: value }));
  };

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };
  const leftVariants = {
    hidden: { x: -200, opacity: 0 },
    visible: {
      x: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", duration: 1, damping: 20, weight: 8 },
    },
  };
  const rightVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", duration: 1, damping: 20, weight: 8 },
    },
  };

  return (
    <div className="p-3 md:p-5 md:gap-3 lg:gap-5 flex-grow flex justify-center flex-col items-center gap-5">
      <div className="grid gap-2">
        <Typography variant="h6" component="h2" className="text-center">
          Set the Challenge!
        </Typography>
        <Typography variant="caption" className="text-center text-slate-500">
          Ready to quiz in{" "}
          <Link
            to={"/categories"}
            className="text-rose-600 capitalize animate-pulse"
          >
            {metadata.categoryName}
          </Link>
          <span className="text-rose-600">! </span>
          Pick difficulty & questions. 🚀🎯 Show us what you've got! Have a
          blast! 💫🌟
        </Typography>
      </div>
      <div className="grid grid-cols-3 w-full gap-2 lg:w-3/4">
        <motion.div
          id="easy"
          className={
            "border border-gray-400 flex flex-col items-center rounded-2xl gap-2 p-5 off " +
            (metadata.mode === "easy" ? "on" : "")
          }
          onClick={(e) =>
            setMetadataState((prev) => ({ ...prev, mode: e.target.id }))
          }
          variants={leftVariants}
          initial="hidden"
          animate="visible"
          whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
        >
          <p
            className={
              "text-lg text-gray-500 font-bold pointer-events-none " +
              (metadata.mode === "easy" ? "text-green-400" : "")
            }
          >
            Easy
          </p>
          <img
            src={snap}
            alt="easy mode icon"
            className="w-16 aspect-square p-2 rounded-full bg-slate-200 pointer-events-none"
          />
          <p
            className={
              "text-gray-500 text-xs mt-5 text-center pointer-events-none hidden sm:block " +
              (metadata.mode === "easy" ? "text-gray-500" : "")
            }
          >
            Kick back and take it easy! This mode is perfect for a relaxed quiz
            experience. Enjoy simple questions and breeze through the challenge.
          </p>
        </motion.div>
        <motion.div
          id="medium"
          className={
            "border border-gray-400 flex flex-col items-center rounded-2xl gap-2 p-5 off " +
            (metadata.mode === "medium" ? "on" : "")
          }
          onClick={(e) =>
            setMetadataState((prev) => ({ ...prev, mode: e.target.id }))
          }
          variants={opacityVariants}
          initial="hidden"
          animate="visible"
          whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
        >
          <p
            className={
              "text-lg text-gray-500 font-bold pointer-events-none " +
              (metadata.mode === "medium" ? "text-green-400" : "")
            }
          >
            Medium
          </p>
          <img
            src={medium}
            alt="easy mode icon"
            className="w-16 aspect-square p-2 rounded-full bg-slate-200 pointer-events-none"
          />
          <p
            className={
              "text-gray-500 text-xs mt-5 text-center pointer-events-none hidden sm:block " +
              (metadata.mode === "medium" ? "text-gray-500" : "")
            }
          >
            Ready for a moderate challenge? Medium mode strikes the right
            balance between ease and difficulty. Test your knowledge and see how
            well you fare!
          </p>
        </motion.div>
        <motion.div
          id="hard"
          className={
            "border border-gray-400 flex flex-col items-center rounded-2xl gap-2 p-5 off " +
            (metadata.mode === "hard" ? "on" : "")
          }
          onClick={(e) =>
            setMetadataState((prev) => ({ ...prev, mode: e.target.id }))
          }
          variants={rightVariants}
          initial="hidden"
          animate="visible"
          whileTap={{ scale: 0.95, transition: { duration: 0.3 } }}
        >
          <p
            className={
              "text-lg text-gray-500 font-bold pointer-events-none " +
              (metadata.mode === "hard" ? "text-green-400" : "")
            }
          >
            Hard
          </p>
          <img
            src={hard}
            alt="easy mode icon"
            className="w-16 aspect-square p-2 rounded-full bg-slate-200 pointer-events-none"
          />
          <p
            className={
              "text-gray-500 text-xs mt-5 text-center pointer-events-none hidden sm:block " +
              (metadata.mode === "hard" ? "text-gray-500" : "")
            }
          >
            Prepare for the ultimate test of your expertise! Hard mode is not
            for the faint-hearted. Sharpen your wits and brace yourself for a
            thrilling quiz adventure!
          </p>
        </motion.div>
      </div>
      <Box sx={{ width: { xs: 200, sm: 200, md: 300, xl: 400 } }}>
        <Slider
          aria-label="Temperature"
          defaultValue={5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          onChange={(e) => handleSliderChange(e.target.value)}
          sx={{ color: "#1e3a8a" }}
          step={1}
          marks
          min={5}
          max={20}
        />
      </Box>
      <motion.button
        type="button"
        variants={opacityVariants}
        initial="hidden"
        animate="visible"
        className={
          "bg-none px-10 lg:px-16 py-2 lg:py-3 rounded-full capitalize text-gray-400 font-thin text-bold w-fit border-2 mx-auto " +
          (metadata.mode
            ? "bg-green-400 pointer-events-auto cursor-pointer text-slate-50 transition-colors ease-in duration-200"
            : "")
        }
        whileTap={{ scale: 0.85 }}
        onClick={() => {
          letsBegin();
        }}
      >
        Lets Begin
      </motion.button>
    </div>
  );
};

export default QuizConfigurator;
