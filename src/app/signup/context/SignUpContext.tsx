"use client";

import { createContext, useContext, useState } from "react";

// Shape of Sign Up data
type SignUpData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  hashedPassword: string;
};

// Shape of Sign Up context
type SignUpContextType = {
  data: SignUpData;
  setData: (data: SignUpData) => void;
  clearData: () => void;
};

// Initial default values for Sign Up data
const defaultSignUpData = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  hashedPassword: "",
};

const SignUpContext = createContext<SignUpContextType>({
  data: defaultSignUpData,
  setData: () => {},
  clearData: () => {},
});

export const useSignUp = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUp must be used within a SignUpProvider");
  }
  return context;
};

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<SignUpData>(defaultSignUpData);

  const clearData = () => {
    setData(defaultSignUpData);
  };

  return (
    <SignUpContext.Provider value={{ data, setData, clearData }}>
      {children}
    </SignUpContext.Provider>
  );
};
