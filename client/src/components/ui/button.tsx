import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const baseButton =
  "text-center w-full px-8 py-4 font-roboto font-bold uppercase w-full";

const buttonVariants = {
  primary:
    "bg-tree-poppy-500 text-alabaster-950 rounded-xl shadow-primary active:shadow-none active:translate-y-1 hover:brightness-90",
  secondary:
    "bg-alabaster-950 text-alabaster-50 rounded-xl shadow-secondary border-3 border-alabaster-400 active:shadow-none active:translate-y-1 hover:brightness-90",
  tertiary: "text-mandy-500 hover:text-mandy-600",
};

const button = cva(baseButton, {
  variants: {
    variant: buttonVariants,
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  type,
  ...props
}) => (
  <button className={button({ className, variant })} type={type} {...props} />
);
