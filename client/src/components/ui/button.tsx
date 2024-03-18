import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const baseButton =
  "text-center w-full px-8 py-4 font-roboto font-bold uppercase cursor-pointer";

const buttonVariants = {
  primary:
    "bg-tree-poppy-500 text-alabaster-950 rounded-xl shadow-primary active:shadow-none active:translate-y-1 hover:brightness-90 disabled:cursor-not-allowed disabled:bg-alabaster-600 disabled:text-alabaster-300 disabled:shadow-none disabled:hover:brightness-100 disabled:active:translate-y-0",
  secondary:
    "bg-alabaster-950 text-alabaster-50 rounded-xl shadow-secondary border-3 border-alabaster-400 active:shadow-none active:translate-y-1 hover:brightness-90 disabled:cursor-not-allowed disabled:bg-alabaster-600 disabled:text-alabaster-300 disabled:shadow-none disabled:hover:brightness-100 disabled:active:translate-y-0",
  tertiary:
    "text-mandy-500 hover:text-mandy-600 disabled:cursor-not-allowed disabled:text-alabaster-300 disabled:hover:text-alabaster-300",
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
  disabled,
  ...props
}) => (
  <button
    className={button({ className, variant })}
    type={type}
    disabled={disabled}
    {...props}
  />
);
