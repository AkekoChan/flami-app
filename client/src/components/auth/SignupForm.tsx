import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from "react-line-awesome";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { Button } from "../ui";

interface User {
  email: string;
  name: string;
  password: string;
  age: number;
  metadata: {
    favorite_sport: string;
    origin: string;
    intent: string;
  };
}

interface FormValues extends User {
  confirmPassword: string;
}

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

const lastStepValidationSchema = Yup.object().shape({
  name: Yup.string().required("Le nom est obligatoire.").trim(),
  email: Yup.string()
    .email("Le format de l'e-mail est incorrect.")
    .required("L'e-mail est obligatoire.")
    .trim(),
  password: Yup.string()
    .required("Le mot de passe est obligatoire.")
    .min(8, "Le mot de passe doit contenir 8 caractères minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère special."
    )
    .trim(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas.")
    .required("La confirmation du mot de passe est obligatoire.")
    .trim(),
  age: Yup.number()
    .moreThan(12, "L'âge requis pour s'inscrire est 13 ans.")
    .required("L'âge est obligatoire.")
    .truncate(),
});

const StepOne = ({
  nextStep,
  data,
}: {
  nextStep: (newData: User) => void;
  data: User;
}) => {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const navigate = useNavigate();

  const handleChoiceClick = (index: number) => {
    setClickedIndex(index);
  };

  const handlePrevPage = () => {
    navigate("/");
  };

  const handleSubmit = () => {
    if (clickedIndex !== null) {
      const selectedSport = choices.fav_sport[clickedIndex];
      console.log(selectedSport);
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
            onClick={handlePrevPage}
          />
          <div className="w-100 bg-alabaster-300 rounded-xl h-4">
            <div
              className="bg-tree-poppy-500 h-4 rounded-xl relative"
              style={{ width: "25%" }}
            >
              <div className="bg-alabaster-300 h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400 "></div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center">
          Quel est ton sport préféré ?
        </h1>
        <div className="flex flex-col gap-6">
          <ul className="grid grid-cols-2 gap-x-2 gap-y-4">
            {choices.fav_sport.map((choice, index) => (
              <li key={index}>
                <div
                  onClick={() => handleChoiceClick(index)}
                  className={`flex gap-2 items-center flex-col p-6 border-3 rounded-xl border-alabaster-400 cursor-pointer hover:brightness-90 active:translate-y-1 active:shadow-tree-poppy-500-press ${
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
      </Form>
    </Formik>
  );
};

const StepTwo = ({
  nextStep,
  prevStep,
  data,
}: {
  nextStep: (newData: User) => void;
  prevStep: (newData: User) => void;
  data: User;
}) => {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const handleChoiceClick = (index: number) => {
    setClickedIndex(index);
  };

  const handleSubmit = () => {
    if (clickedIndex !== null) {
      const selectedOrigin = choices.origin[clickedIndex];
      console.log(selectedOrigin);
      nextStep({
        ...data,
        metadata: { ...data.metadata, origin: selectedOrigin },
      });
    }
  };

  useEffect(() => {
    if (data.metadata.origin) {
      setClickedIndex(choices.origin.indexOf(data.metadata.origin));
    }
  }, [data.metadata.origin]);

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <ArrowLeftIcon
            className="text-3xl text-alabaster-50 cursor-pointer px-2 py-1 hover:bg-alabaster-300/20 rounded-xl ease-out duration-100"
            component="span"
            onClick={() => prevStep(data)}
          />
          <div className="w-100 bg-alabaster-300 rounded-xl h-4">
            <div
              className="bg-tree-poppy-500 h-4 rounded-xl relative"
              style={{ width: "50%" }}
            >
              <div className="bg-alabaster-300 h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400 "></div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center">
          Quel est ton sport préféré ?
        </h1>
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {choices.origin.map((choice, index) => (
              <li key={index}>
                <div
                  onClick={() => handleChoiceClick(index)}
                  className={`flex gap-2 items-center flex-col p-6 border-3 rounded-xl border-alabaster-400 cursor-pointer hover:brightness-90 active:translate-y-1 active:shadow-tree-poppy-500-press font-bold uppercase ${
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
      </Form>
    </Formik>
  );
};

const StepThree = ({
  nextStep,
  prevStep,
  data,
}: {
  nextStep: (newData: User, final?: boolean) => void;
  prevStep: (newData: User) => void;
  data: User;
}) => {
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  const handleChoiceClick = (index: number) => {
    setClickedIndex(index);
  };

  const handleSubmit = () => {
    if (clickedIndex !== null) {
      const selectedIntent = choices.intent[clickedIndex];
      console.log(selectedIntent);
      nextStep({
        ...data,
        metadata: { ...data.metadata, intent: selectedIntent },
      });
    }
  };

  useEffect(() => {
    if (data.metadata.intent) {
      setClickedIndex(choices.intent.indexOf(data.metadata.intent));
    }
  }, [data.metadata.intent]);

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <ArrowLeftIcon
            className="text-3xl text-alabaster-50 cursor-pointer px-2 py-1 hover:bg-alabaster-300/20 rounded-xl ease-out duration-100"
            component="span"
            onClick={() => prevStep(data)}
          />
          <div className="w-100 bg-alabaster-300 rounded-xl h-4">
            <div
              className="bg-tree-poppy-500 h-4 rounded-xl relative"
              style={{ width: "75%" }}
            >
              <div className="bg-alabaster-300 h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400 "></div>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center">
          Que veux-tu faire sur l'application ?
        </h1>
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col gap-4">
            {choices.intent.map((choice, index) => (
              <li key={index}>
                <div
                  onClick={() => handleChoiceClick(index)}
                  className={`flex gap-2 items-center flex-col p-6 border-3 rounded-xl border-alabaster-400 cursor-pointer hover:brightness-90 active:translate-y-1 active:shadow-tree-poppy-500-press font-bold uppercase ${
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
      </Form>
    </Formik>
  );
};

const StepFour = ({
  nextStep,
  prevStep,
  data,
}: {
  nextStep: (newData: User, final?: boolean) => void;
  prevStep: (newData: User) => void;
  data: User;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleSubmit = (values: FormValues) => {
    const { confirmPassword, ...userData } = values;

    nextStep(userData, true);
  };

  return (
    <Formik
      initialValues={{ ...data, confirmPassword: "" }}
      validationSchema={lastStepValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <ArrowLeftIcon
              className="text-3xl text-alabaster-50 cursor-pointer px-2 py-1 hover:bg-alabaster-300/20 rounded-xl ease-out duration-100"
              component="span"
              onClick={() => prevStep(data)}
            />
            <div className="w-100 bg-alabaster-300 rounded-xl h-4">
              <div
                className="bg-tree-poppy-500 h-4 rounded-xl relative"
                style={{ width: "100%" }}
              >
                <div className="bg-alabaster-300 h-1.5 rounded-xl w-90 absolute top-1 left-1/2 -translate-x-1/2 bg-tree-poppy-400 "></div>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center">
            Finalise ton inscription pour commencer à utiliser l'application !
          </h1>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Field
                  type="text"
                  name="name"
                  placeholder="Nom d'utilisateur"
                  className={`w-full bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                    errors.name && touched.name
                      ? "border-mandy-500"
                      : "border-alabaster-400"
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-mandy-500 font-bold text-sm">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className={`w-full bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                    errors.email && touched.email
                      ? "border-mandy-500"
                      : "border-alabaster-400"
                  }`}
                />
                {errors.email && touched.email && (
                  <p className="text-mandy-500 font-bold text-sm">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Field
                  type="number"
                  name="age"
                  placeholder="Age"
                  className={`w-full bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                    errors.age && touched.age
                      ? "border-mandy-500"
                      : "border-alabaster-400"
                  }`}
                />
                {errors.age && touched.age && (
                  <p className="text-mandy-500 font-bold text-sm">
                    {errors.age}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mot de passe"
                    className={`w-100 bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                      errors.password && touched.password
                        ? "border-mandy-500"
                        : "border-alabaster-400"
                    }`}
                  />
                  {!showPassword ? (
                    <EyeSlashIcon
                      onClick={() => setShowPassword(true)}
                      className="absolute right-4 top-1/3 -translate-y-1/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                      component="span"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowPassword(false)}
                      className="absolute right-4 top-1/3 -translate-y-1/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                      component="span"
                    />
                  )}
                </div>
                {errors.password && touched.password && (
                  <p className="text-mandy-500 font-bold text-sm">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirmation mot de passe"
                    className={`w-100 bg-alabaster-600 border-3 rounded-xl p-4 placeholder:text-alabaster-50 focus:border-tree-poppy-500 outline-none ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-mandy-500"
                        : "border-alabaster-400"
                    }`}
                  />
                  {!showConfirmPassword ? (
                    <EyeSlashIcon
                      onClick={() => setShowConfirmPassword(true)}
                      className="absolute right-4 top-2/4 -translate-y-2/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                      component="span"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowConfirmPassword(false)}
                      className="absolute right-4 top-2/4 -translate-y-2/4 inline-block text-2xl text-alabaster-400 cursor-pointer"
                      component="span"
                    />
                  )}
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-mandy-500 font-bold text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Button variant={"primary"} type="submit">
                Continuer
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const SignupForm = () => {
  const [data, setData] = useState<User>({
    email: "",
    name: "",
    password: "",
    age: 0,
    metadata: {
      favorite_sport: "",
      origin: "",
      intent: "",
    },
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const sendRequest = (formData: User) => {
    console.log("Form Submitted", formData);
  };

  const handleNextStep = (newData: User, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      sendRequest(newData);
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData: User) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne nextStep={handleNextStep} data={data} />,
    <StepTwo nextStep={handleNextStep} prevStep={handlePrevStep} data={data} />,
    <StepThree
      nextStep={handleNextStep}
      prevStep={handlePrevStep}
      data={data}
    />,
    <StepFour
      nextStep={handleNextStep}
      prevStep={handlePrevStep}
      data={data}
    />,
  ];

  console.log(data);

  return steps[currentStep];
};
export default SignupForm;
