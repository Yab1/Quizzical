import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { TriviaContext } from "../context/TriviaContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { setMetadataState } = useContext(TriviaContext);
  const navigate = useNavigate();

  const opacityVariants = {
    hidden: { opacity: 0, transition: { duration: 1 } },
    visible: { opacity: 1, transition: { duration: 2 } },
  };

  const buttonVariants = {
    visible: {
      scale: [1, 0.75],
      transition: {
        repeatType: "mirror",
        repeat: Infinity,
        ease: "easeInOut",
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      className="flex flex-col justify-center h-full items-center gap-14 bg-image-1"
      variants={opacityVariants}
      initial="hidden"
      animate="visible"
    >
      <img src={logo} alt="Quizzical logo" />
      <motion.button
        type="button"
        variants={buttonVariants}
        animate="visible"
        className="bg-blue-500 px-10 lg:px-16 py-2 lg:py-3 rounded-full capitalize text-slate-50 font-thin text-bold w-fit"
        whileTap={{ opacity: 0 }}
        onClick={() => {
          setMetadataState((prev) => ({
            ...prev,
            count: 5,
          }));
          navigate("/categories");
        }}
      >
        Play Trivia
      </motion.button>
    </motion.div>
  );
};

export default Homepage;
