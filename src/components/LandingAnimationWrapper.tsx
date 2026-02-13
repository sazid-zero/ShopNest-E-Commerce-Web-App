"use client";

import { motion } from "framer-motion";
import React from "react";

interface LandingAnimationWrapperProps {
  children: React.ReactNode;
}

export default function LandingAnimationWrapper({ children }: LandingAnimationWrapperProps) {
  return (
    <motion.div>
      {children}
    </motion.div>
  );
}