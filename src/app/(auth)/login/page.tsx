"use client";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";

function Page() {
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

export default Page;
