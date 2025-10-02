"use client";

import React from "react";
import Image from "next/image";

// Asset imports
const imgGraphic1 = "/08189da0b1f3ae6650df0a80180c894ff4ab9e79.png";
const imgGraphic = "/41642a946b697ad70b9a60f49850e2cb727f28ae.svg";
const imgCursourClick = "/8710af10014c079e4dda4f1c10af35a07d7b9a2d.svg";
const imgStar2 = "/d10cdd6e60590316af174515a385b5c975d2b6b5.svg";
const imgInnovation = "/aedaf1d2d2c054d643cabcbf13e9dd7a71aa0e5f.svg";
const imgLogo = "/d07e5102f6877288d61ea963179f3a5d4b095fb5.svg";

export default function Header2() {
  return (
    <div className="relative w-full h-[1010px] overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Background Graphics */}
      <div className="absolute h-[995px] top-[15px] left-1/2 -translate-x-1/2 w-[1409px]">
        <Image
          alt="Background Graphic"
          className="block max-w-none w-full h-full object-cover"
          src={imgGraphic}
          width={1409}
          height={995}
          priority
        />
      </div>

      {/* Background Image Overlay */}
      <div className="absolute h-[995px] left-[19px] opacity-60 top-[15px] w-[1406px]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Image
            alt="Background Pattern"
            className="absolute h-[205.5%] left-0 max-w-none top-[-52.75%] w-[132.43%]"
            src={imgGraphic1}
            width={1862}
            height={2045}
            priority
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bg-gradient-to-b from-transparent via-[#0451d3]/50 to-[#0451d3] h-[326px] left-[19px] rounded-bl-[20px] rounded-br-[20px] top-[684px] w-[1406px]" />

      {/* Navbar */}
      <nav className="absolute top-[40px] left-[80px] right-[80px] z-50">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-[21.619px]">
            <div className="h-[43.237px] w-[54.046px] relative">
              <Image
                alt="EduLearn Logo"
                className="block max-w-none w-full h-full"
                src={imgLogo}
                width={54}
                height={43}
              />
            </div>
            <p className="font-['Gabarito',sans-serif] font-bold text-[27.023px] leading-normal whitespace-nowrap">
              <span className="text-[#0451d3]">Edu</span>
              <span className="text-[#101012]">Learn</span>
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-[55px] font-['Geologica',sans-serif] font-normal text-[18px] text-[#101012]">
            <a href="#home" className="hover:text-[#0451d3] transition-colors whitespace-nowrap">
              Home
            </a>
            <a href="#about" className="opacity-50 hover:opacity-100 hover:text-[#0451d3] transition-all whitespace-nowrap">
              About Us
            </a>
            <a href="#courses" className="opacity-50 hover:opacity-100 hover:text-[#0451d3] transition-all whitespace-nowrap">
              Courses
            </a>
            <a href="#features" className="opacity-50 hover:opacity-100 hover:text-[#0451d3] transition-all whitespace-nowrap">
              Features
            </a>
            <a href="#testimonials" className="opacity-50 hover:opacity-100 hover:text-[#0451d3] transition-all whitespace-nowrap">
              Testimonials
            </a>
          </div>

          {/* Contact Button */}
          <button className="border-2 border-[#0451d3] px-[40px] py-[10px] rounded-[100px] font-['Gabarito',sans-serif] font-semibold text-[18px] text-[#0451d3] hover:bg-[#0451d3] hover:text-white transition-all duration-300 whitespace-nowrap">
            Contact
          </button>
        </div>
      </nav>

      {/* Flexible Online Learning Badge */}
      <div className="absolute top-[155px] left-1/2 -translate-x-1/2 z-40">
        <div className="backdrop-blur-[5px] bg-[rgba(4,81,211,0.05)] border-2 border-[#0451d3] px-[30px] py-[10px] rounded-[50px] flex items-center gap-[10px] shadow-[-6px_-5px_10px_0px_inset_rgba(255,255,255,0.33),0px_4px_4px_0px_inset_rgba(12,12,12,0.07)]">
          <div className="w-[22px] h-[22px] relative">
            <Image
              alt="Innovation Icon"
              className="block max-w-none w-full h-full"
              src={imgInnovation}
              width={22}
              height={22}
            />
          </div>
          <p className="font-['Geologica',sans-serif] font-normal text-[20px] text-[#0451d3] text-center whitespace-nowrap">
            Flexible Online Learning
          </p>
        </div>
      </div>

      {/* Main Heading */}
      <div className="absolute top-[222px] left-1/2 -translate-x-1/2 w-[1000px] z-30">
        <h1 className="font-['Geologica',sans-serif] font-light text-[70px] text-white text-center leading-normal">
          Empower Your Future with{" "}
          <span className="font-semibold">Quality Education</span>
        </h1>
      </div>

      {/* Decorative Star */}
      <div className="absolute left-[852px] top-[448px] z-20">
        <div className="rotate-[17.198deg]">
          <div className="w-[73.781px] h-[73.781px] relative">
            <Image
              alt="Star Decoration"
              className="block max-w-none w-full h-full"
              src={imgStar2}
              width={74}
              height={74}
            />
          </div>
        </div>
      </div>

      {/* Left Description */}
      <div className="absolute left-[108px] top-[529px] w-[195px] z-30">
        <p className="font-['Geologica',sans-serif] font-normal text-[20px] text-white leading-normal">
          Learn anytime, anywhere, with the best mentors and interactive courses.
        </p>
      </div>

      {/* Right Statistics */}
      <div className="absolute left-[1227px] top-[539px] w-[134px] z-30">
        <div className="flex flex-col gap-[10px]">
          <p className="font-['Geologica',sans-serif] font-semibold text-[20px] text-white">
            Trusted By
          </p>
          <p className="font-['Geologica',sans-serif] font-bold text-[40px] text-white">
            2.9M+
          </p>
          <p className="font-['Geologica',sans-serif] font-normal text-[15px] text-white">
            Active Users
          </p>
        </div>
      </div>

      {/* Email Input & CTA Section */}
      <div className="absolute top-[814px] left-1/2 -translate-x-1/2 w-[616.333px] h-[65px] z-40">
        {/* Input Field */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[616px] h-[65px]">
          <div className="backdrop-blur-[15px] bg-[rgba(255,255,255,0.05)] px-[46px] py-[15.333px] rounded-[76.667px] h-full flex items-center shadow-[0px_4px_15px_0px_inset_rgba(255,255,255,0.25)]">
            <input
              type="email"
              placeholder="Your email address ..."
              className="w-full bg-transparent font-['Geologica',sans-serif] font-normal text-[25px] text-white placeholder:text-[rgba(255,255,255,0.5)] outline-none"
            />
          </div>
        </div>

        {/* Get Started Button */}
        <div className="absolute left-[calc(50%+179px)] -translate-x-1/2 top-0">
          <button className="bg-[#0451d3] border-[3.067px] border-white px-[33px] py-[15.333px] rounded-[76.667px] h-[65px] flex items-center gap-[15.333px] hover:bg-[#0340a8] transition-all duration-300 group">
            <span className="font-['Geologica',sans-serif] font-semibold text-[25px] text-white whitespace-nowrap">
              Get Started
            </span>
            <div className="w-[32px] h-[32px] relative group-hover:translate-x-1 transition-transform duration-300">
              <Image
                alt="Cursor Click"
                className="block max-w-none w-full h-full"
                src={imgCursourClick}
                width={32}
                height={32}
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
