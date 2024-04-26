import { useState } from "react";
import { SignupBody } from "../../../interfaces/api-body/signup-body";
import StepFour from "./signup-steps/StepFour";
import StepOne from "./signup-steps/StepOne";
import StepThree from "./signup-steps/StepThree";
import StepTwo from "./signup-steps/StepTwo";

const SignupForm = () => {
  const [data, setData] = useState<SignupBody>({
    email: "",
    name: "",
    password: "",
    age: "",
    metadata: {
      favorite_sport: "",
      origin: "",
      intent: "",
    },
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [animationDirection, setAnimationDirection] = useState<"next" | "prev">(
    "next"
  );

  const handleNextStep = (newData: SignupBody, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    setAnimationDirection("next");

    if (final) {
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData: SignupBody) => {
    setData((prev) => ({ ...prev, ...newData }));
    setAnimationDirection("prev");
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne
      nextStep={handleNextStep}
      data={data}
      animDir={animationDirection}
    />,
    <StepTwo
      nextStep={handleNextStep}
      prevStep={handlePrevStep}
      data={data}
      animDir={animationDirection}
    />,
    <StepThree
      nextStep={handleNextStep}
      prevStep={handlePrevStep}
      data={data}
      animDir={animationDirection}
    />,
    <StepFour
      nextStep={handleNextStep}
      prevStep={handlePrevStep}
      data={data}
      animDir={animationDirection}
    />,
  ];

  return steps[currentStep];
};
export default SignupForm;
