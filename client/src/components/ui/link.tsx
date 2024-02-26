import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Link } from "react-router-dom";

const baseLink =
  "text-center w-full px-8 py-4 font-roboto font-bold uppercase w-full inline-block";

const linksVariants = {
  primary:
    "bg-tree-poppy-500 text-alabaster-950 rounded-xl shadow-primary active:shadow-none active:translate-y-1 hover:brightness-90",
  secondary:
    "bg-alabaster-950 text-alabaster-50 rounded-xl shadow-secondary border-3 border-alabaster-400 active:shadow-none active:translate-y-1 hover:brightness-90",
  tertiary: "text-mandy-500 hover:text-mandy-600",
};

const link = cva(baseLink, {
  variants: {
    variant: linksVariants,
  },
});

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof link> {
  to: string;
}

export const LinkComponent: React.FC<LinkProps> = ({
  className,
  variant,
  to,
  ...props
}) => <Link className={link({ className, variant })} to={to} {...props} />;
