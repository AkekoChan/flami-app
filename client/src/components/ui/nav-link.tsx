import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Link } from "react-router-dom";

const baseNavLink =
  "text-center w-full px-8 py-4 font-roboto font-bold uppercase w-full inline-block";

// const NavLinksVariants = {
//   primary:
//     "bg-tree-poppy-500 text-alabaster-950 rounded-xl shadow-primary active:shadow-none active:translate-y-1 hover:brightness-90",
//   secondary:
//     "bg-alabaster-950 text-alabaster-50 rounded-xl shadow-secondary border-3 border-alabaster-400 active:shadow-none active:translate-y-1 hover:brightness-90",
//   tertiary: "text-mandy-500 hover:text-mandy-600",
// };

const navLink = cva(
  baseNavLink
  //   {
  //   variants: {
  //     variant: NavLinksVariants,
  //   },
  // }
);

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLink> {
  to: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  className,
  // variant,
  to,
  ...props
}) => <Link className={navLink({ className })} to={to} {...props} />;
