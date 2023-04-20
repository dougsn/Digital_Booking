import React from "react";
import { Outlet } from "react-router-dom";
import {
  FacebookLogo,
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

export function Footer() {
  return (
    <>
      <Outlet />

      <footer className="bg-green text-white font-bold py-2 w-full">
        <div className="container grid grid-cols-2 mx-auto items-center">
          <div>
            <span>©2023 Digital Booking</span>
          </div>

          <div className="ml-auto hidden md:flex items-center justify-center">
            <FacebookLogo size={32} weight="bold" className="mx-3" />
            <LinkedinLogo size={32} weight="bold" className="mx-3" />
            <TwitterLogo size={32} weight="bold" className="mx-3" />
            <InstagramLogo size={32} weight="bold" className="mx-3" />
          </div>
        </div>
      </footer>
    </>
  );
}
