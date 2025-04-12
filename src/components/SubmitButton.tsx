import React from "react";
import { useState } from "react";

const SubmitButton = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  function submitHandler() {
    setIsSubmitted(true);
  }

  return (
    <button
      type="submit"
      disabled={isSubmitted}
      className={
        "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
      }
      onClick={submitHandler}
    >
      {isSubmitted ? "Loading..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
