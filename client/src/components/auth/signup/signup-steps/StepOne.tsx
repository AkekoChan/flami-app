import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "react-line-awesome";
import { useNavigate } from "react-router";
import { Button, Reveal } from "../../../ui";
import { SignupBody } from "../../../../interfaces/api-body/signup-body";

const choices = {
  fav_sport: [
    "Sport de combat",
    "Sport de course",
    "Sport aquatique",
    "Sport collectif",
    "Sport de plage",
    "Sport de force",
  ],
  origin: ["Internet", "Famille/amis", "Autre"],
  intent: ["Participer", "Me divertir", "Apprendre", "Autre"],
};

const StepOne = ({
  nextStep,
  data,
  animDir,
}: {
  nextStep: (newData: SignupBody) => void;
  data: SignupBody;
  animDir: "next" | "prev";
}) => {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const navigate = useNavigate();

  const handleChoiceClick = (index: number) => {
    setClickedIndex(index);
  };

  const handlePrevPage = () => {
    navigate("/", { replace: true });
  };

  const handleSubmit = () => {
    if (clickedIndex !== null) {
      const selectedSport = choices.fav_sport[clickedIndex];
      nextStep({
        ...data,
        metadata: { ...data.metadata, favorite_sport: selectedSport },
      });
    }
  };

  useEffect(() => {
    if (data.metadata.favorite_sport) {
      setClickedIndex(choices.fav_sport.indexOf(data.metadata.favorite_sport));
    }
  }, [data.metadata.favorite_sport]);

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <ArrowLeftIcon
            className="text-3xl text-alabaster-50 cursor-pointer px-2 py-1 hover:bg-alabaster-300/20 rounded-xl ease-out duration-100"
            component="span"
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter") {
                handlePrevPage();
              }
            }}
            aria-label="Retour"
            aria-hidden="false"
            onClick={handlePrevPage}
          />
          <div className="w-100 bg-alabaster-300 rounded-xl h-4">
            <motion.div
              initial={{ width: animDir === "next" ? "0%" : "50%" }}
              animate={{ width: animDir === "next" ? "25%" : "25%" }}
              className="bg-tree-poppy-500 h-4 rounded-xl relative"
            >
              <div className="h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400 "></div>
            </motion.div>
          </div>
        </div>
        <Reveal className="flex flex-col gap-8">
          <h1 className="text-2xl font-bold text-center">
            Quel est ton sport préféré ?
          </h1>
          <div className="flex flex-col gap-6">
            <ul className="grid grid-cols-2 gap-x-2 gap-y-4">
              {choices.fav_sport.map((choice, index) => (
                <li key={index}>
                  <div
                    onClick={() => handleChoiceClick(index)}
                    role="button"
                    tabIndex={0}
                    aria-selected={clickedIndex === index ? "true" : "false"}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter") {
                        handleChoiceClick(index);
                      }
                    }}
                    className={`flex gap-2 items-center flex-col py-6 px-4 border-3 rounded-xl border-alabaster-400 cursor-pointer hover:brightness-90 active:translate-y-1 active:shadow-tree-poppy-500-press active:border-tree-poppy-500 text-center ${
                      index === clickedIndex ? "border-tree-poppy-500" : ""
                    } ${
                      index === clickedIndex
                        ? "shadow-tree-poppy-500"
                        : "shadow-secondary"
                    }`}
                  >
                    {choice}
                  </div>
                </li>
              ))}
            </ul>
            <Button
              variant={"primary"}
              type="submit"
              disabled={clickedIndex === -1}
            >
              Continuer
            </Button>
          </div>
        </Reveal>
      </Form>
    </Formik>
  );
};

export default StepOne;
