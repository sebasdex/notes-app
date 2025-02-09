"use client";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function LoginWrapped() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  return (
    <>
      {isRegister ? (
        <RegisterForm setIsRegister={setIsRegister} />
      ) : (
        <LoginForm setIsRegister={setIsRegister} />
      )}
    </>
  );
}

export default LoginWrapped;
