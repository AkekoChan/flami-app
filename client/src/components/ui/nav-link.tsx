import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Link } from "react-router-dom";

const baseNavLink =
  "p-2 hover:bg-alabaster-300/20 rounded-xl ease-out duration-100";

const navLink = cva(baseNavLink);

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLink> {
  to: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  className,
  to,
  ...props
}) => <Link className={navLink({ className })} to={to} {...props} />;
