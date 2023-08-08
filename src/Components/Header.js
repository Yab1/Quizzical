import { useContext, useEffect } from "react";
import { TriviaContext } from "../context/TriviaContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const { metadata, setIsLoadingState } = useContext(TriviaContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      metadata.category === "" &&
      metadata.mode === "" &&
      metadata.count === null
    ) {
      navigate("/");
    }
  }, []);

  const headerVariants = {
    hidden: { y: -200, opacity: 0 },
    visible: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", duration: 1, damping: 20, weight: 8 },
    },
    hidden: {
      y: -200,
      opacity: 0,
      transition: { type: "spring", duration: 1, damping: 20, weight: 8 },
    },
  };
  return (
    <>
      <AnimatePresence>
        {location.pathname !== "/" ? (
          <motion.header
            className={
              "p-3 md:p-5 relative w-full " +
              (location.pathname === "/quizzical" ? "bg-image-2" : "")
            }
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Link
              to="/"
              onClick={setIsLoadingState}
              className="font-body font-bold text-2xl text-blue-700 cursor-pointer"
            >
              Quizzical
            </Link>
          </motion.header>
        ) : null}
      </AnimatePresence>
    </>
  );
}
