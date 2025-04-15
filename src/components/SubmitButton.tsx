"use client";

import React from "react";
import { useState, useEffect } from "react";

interface SubmitButtonProps {
  onSubmit: () => void;
  className?: string;
}

const SubmitButton = ({ onSubmit }: SubmitButtonProps) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function submitHandler() {
    setIsSubmitted(true);
    onSubmit();
  }

  return (
    <button
      type="submit"
      disabled={isSubmitted}
      className={
        "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${className}"
      }
      onClick={submitHandler}
    >
      {isSubmitted ? "Loading..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
