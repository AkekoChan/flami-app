import { useState } from "react";
import StepFour from "./signup-steps/StepFour";
import StepOne from "./signup-steps/StepOne";
import StepThree from "./signup-steps/StepThree";
import StepTwo from "./signup-steps/StepTwo";

export interface UserSignupInterface {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
  age: string;
  metadata: {
    favorite_sport: string;
    origin: string;
    intent: string;
  };
}

const SignupForm = () => {
  const [data, setData] = useState<UserSignupInterface>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
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

  const sendRequest = (formData: UserSignupInterface) => {
    console.log("Form Submitted", formData);
  };

  const handleNextStep = (newData: UserSignupInterface, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    setAnimationDirection("next");

    if (final) {
      sendRequest(newData);
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData: UserSignupInterface) => {
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
