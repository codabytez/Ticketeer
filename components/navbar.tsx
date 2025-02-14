"use client";
import { useRouter, usePathname } from "next/navigation";
import { NextPage } from "next";
import React from "react";
import Button from "./button";
import Link from "next/link";
import Logo from "./logo";

const Navbar: NextPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const activePage = pathname;
  return (
    <nav>
      <Logo />
      <div className="md:flex items-center gap-4 hidden">
        <Link
          href={"/"}
          className={`flex p-2.5 justify-center items-center gap-2.5 hover:text-white ${
            activePage === "/" ? "text-white" : ""
          }`}
        >
          Events
        </Link>
        <Link
          href={"/my-tickets"}
          className={`flex p-2.5 justify-center items-center gap-2.5 hover:text-white ${
            activePage === "/my-tickets" ? "text-white" : ""
          }`}
        >
          My Tickets
        </Link>
        <Link
          href={"/about"}
          className={`flex p-2.5 justify-center items-center gap-2.5 hover:text-white ${
            activePage === "/" ? "text-white" : ""
          }`}
        >
          About Project
        </Link>
      </div>
      <Button
        variant="link"
        icon={icon}
        className="uppercase"
        onClick={() => {
          router.push("/my-tickets");
        }}
      >
        my tickets
      </Button>
    </nav>
  );
};

export default Navbar;

const icon = (
  <div className="flex justify-center items-center transition-all duration-300 group-hover:-rotate-45 bg-white text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="8"
      viewBox="0 0 18 8"
      fill="none"
    >
      <path
        d="M1 3.5C0.723858 3.5 0.5 3.72386 0.5 4C0.5 4.27614 0.723858 4.5 1 4.5V3.5ZM17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM1 4.5L17 4.5V3.5L1 3.5V4.5Z"
        fill="#0A0C11"
      />
    </svg>
  </div>
);
