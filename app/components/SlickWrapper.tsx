"use client";

import dynamic from "next/dynamic";
import { FC, ReactNode } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Slider with proper typings
const Slider = dynamic(() => import("react-slick"), { ssr: false }) as FC<SliderSettings>;

// Define types for the slider settings
interface SliderSettings {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
  children?: ReactNode; // Include children in the type definition
  [key: string]: any; // Allow additional props for Slider
}

interface SlickWrapperProps {
  settings: SliderSettings;
  children: ReactNode;
}

// Functional Component with Props
const SlickWrapper: FC<SlickWrapperProps> = ({ settings, children }) => {
  return <Slider {...settings}>{children}</Slider>;
};

export default SlickWrapper;
