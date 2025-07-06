import type { signupInputType } from "@om-argade/common";
import type React from "react";
import { useCallback, type ChangeEvent } from "react";

export const useSignupHandler = (
  setSignupInput: React.Dispatch<React.SetStateAction<signupInputType>>
) => {
    const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSignupInput((prev) => ({
          ...prev,
          name: e.target.value,
        }));
      }, []);
    
      const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSignupInput((prev) => ({
          ...prev,
          email: e.target.value,
        }));
      }, []);
       const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSignupInput((prev) => ({
          ...prev,
          password: e.target.value,
        }));
      }, []);

      return {
        handleNameChange,
        handleEmailChange,
        handlePasswordChange
      };
};
