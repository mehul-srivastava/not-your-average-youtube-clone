"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return <Toaster position="top-center" reverseOrder={false} />;
};

export default ToastProvider;
