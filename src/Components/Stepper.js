import { useContext } from "react";
import { TriviaContext } from "../context/TriviaContext";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";

export default function Stepper({
  currentQuestionIndex,
  handleNext,
  handleBack,
}) {
  const { metadata } = useContext(TriviaContext);
  return (
    <MobileStepper
      variant="dots"
      steps={metadata.count}
      position="static"
      activeStep={currentQuestionIndex}
      sx={{ maxWidth: "100%", flexGrow: 1 }}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={currentQuestionIndex === metadata.count - 1}
        >
          Next
        </Button>
      }
      backButton={
        <Button
          size="small"
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </Button>
      }
    />
  );
}
