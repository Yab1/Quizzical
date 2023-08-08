// React imports
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Material-UI imports
import { Typography } from "@mui/material";

// Context imports
import { TriviaContext } from "../context/TriviaContext";

// Animation imports
import { motion } from "framer-motion";

const CategorySelection = () => {
  const { categories, metadata, setMetadataState } = useContext(TriviaContext);
  const [active, setActive] = useState("");

  const navigate = useNavigate();

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const handleNext = () => {
    if (metadata.category) {
      navigate("/personalize");
    }
  };

  return (
    <div className="md:p-5 md:gap-3 lg:gap-16 flex-grow flex flex-col justify-center gap-5 relative">
      <div className="grid gap-2">
        <Typography variant="h6" component="h2" className="text-center">
          Select a Category for the Quiz
        </Typography>
        <Typography variant="caption" className="text-center text-slate-500">
          Choose a category from the options below to start the quiz. Test your
          knowledge and have fun!
        </Typography>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {categories.map((category) => (
          <motion.div
            variants={opacityVariants}
            initial="hidden"
            animate="visible"
            key={category.id}
            className={
              "rounded-xl lg:p-2" +
              " " +
              (category.id === active
                ? "text-slate-100 font-black lg:p-0 active"
                : "shadow text-slate-900") +
              " " +
              (category.number % 2 === 0
                ? "rounded-r-none md:rounded-r-xl"
                : "rounded-l-none md:rounded-l-xl")
            }
            style={{
              backgroundColor: `${category.bgColor}`,
            }}
            onClick={() => {
              setActive((prev) => (prev = category.id));
              setMetadataState((prev) => ({
                ...prev,
                categoryName: category.name,
                category: category.id,
              }));
            }}
            whileTap={{ scale: 0.95 }}
          >
            <p
              className={"capitalize text-left p-2 pointer-events-none text-sm"}
            >
              {category.name}
            </p>
          </motion.div>
        ))}
      </div>
      <motion.button
        type="button"
        disabled={!metadata.category}
        variants={opacityVariants}
        initial="hidden"
        animate="visible"
        className={
          "bg-none px-10 lg:px-16 py-2 lg:py-3 rounded-full capitalize text-gray-400 font-thin text-bold w-fit border-2 mx-auto mt-5 pointer-events-none " +
          (metadata.category
            ? "bg-green-400 pointer-events-auto cursor-pointer text-slate-50 transition-colors ease-in duration-200"
            : "")
        }
        whileTap={{ scale: 0.85 }}
        onClick={handleNext}
      >
        Next
      </motion.button>
    </div>
  );
};

export default CategorySelection;
