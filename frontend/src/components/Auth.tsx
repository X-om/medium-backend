import { Button } from "./Button";
import { Input } from "./Input";
import React, { useState } from "react";
import type { signupInputType } from "@om-argade/common";
import { AuthHeader } from "./AuthHeader";
import { useSignupHandler } from "../hooks/useSignupHandlers";
import { useAuth } from "../hooks/useAuth";

const authType = {
  signup: "signup",
  signin: "signin",
} as const;

type auth = keyof typeof authType;

export const Auth = ({ type }: { type: auth }) => {
  const [signupInput, setSignupInput] = useState<signupInputType>({
    name: "",
    email: "",
    password: "",
  });

  const { signup, signin, loading, error } = useAuth();

  const { handleNameChange, handleEmailChange, handlePasswordChange } =
    useSignupHandler(setSignupInput);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (type == "signin") {
      await signin(signupInput);
    } else {
      await signup(signupInput);
    }
  };
  if (loading) {
    return (
      <div className="w-full flex gap-2 justify-center items-center">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div>Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full flex justify-center items-center text-2xl text-red-500 font-light">
        {error}
      </div>
    );
  }
  return (
    <div className="flex flex-row w-full h-screen justify-center items-center px-5">
      <div className="flex flex-col h-4/5 py-10 gap-10 justify-center w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 max-w-md mx-auto">
        <AuthHeader type={type} />

        <div className="flex flex-col gap-3">
          {type == "signup" ? (
            <Input
              name="name"
              label="Username"
              placeholder="Enter your username"
              type="text"
              onChange={handleNameChange}
            />
          ) : (
            <></>
          )}

          <Input
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            onChange={handleEmailChange}
          />

          <Input
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={handlePasswordChange}
          />
        </div>
        <div className="w-full bg-amber-200">
          <Button
            mode="default"
            text={type == "signup" ? "Sign up" : "Log in"}
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};
