import { NextPage } from "next";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "tertiary" | "link";
  icon?: React.ReactNode;
  className: string;
}

const Button: NextPage<ButtonProps> = ({
  children,
  variant,
  icon,
  className,
  ...props
}) => {
  let buttonStyle = `flex group transition-all duration-300 py-3 px-4 text-sm sm:py-4 sm:px-6 sm:text-base
       justify-center items-center gap-2 rounded-xl`;
  if (variant === "primary") {
    buttonStyle += " bg-[#24A0B5] text-white hover:bg-[#24A0B5]/50";
  } else if (variant === "secondary") {
    buttonStyle +=
      " bg-transparent border border-[#24A0B5] text-[#24A0B5] hover:bg-[#D5EA001A] hover:text-[#D9D9D9]";
  } else if (variant === "tertiary") {
    buttonStyle += " bg-[#475569] text-white";
  } else if (variant === "link") {
    buttonStyle +=
      " border border-[#D5EA001A] hover:border-[#D9D9D9] bg-white hover:bg-[#24A0B5] hover:text-[#D9D9D9]";
  }

  return (
    <button className={buttonStyle + " " + className} {...props}>
      {children}
      {icon}
    </button>
  );
};

export default Button;
