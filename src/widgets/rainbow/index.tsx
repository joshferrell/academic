"use client";

import { useEffect, useRef } from "react";
// @ts-ignore
import { Gradient } from "stripe-gradient";

import "./style.css";

const Background = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");

    return () => {
      gradient.disconnect();
    };
  }, [ref]);

  return <canvas id="gradient-canvas" ref={ref} data-transition-in />;
};

export default Background;
