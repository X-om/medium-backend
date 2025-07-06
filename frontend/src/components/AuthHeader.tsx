import { memo } from "react";
import { Heading } from "./Heading";
import { Subheading } from "./Subheading";
import { Link } from "react-router-dom";

export const AuthHeader = memo(({ type }: { type: "signup" | "signin" }) => {
  return type === "signup" ? (
    <div className="flex flex-col gap-2">
      <Heading text="Create new account" />
      <div className="flex justify-center text-sm text-slate-400 gap-2">
        <Subheading text="Already have an account" />
        <Link className=" underline" to={"/signin"}>
          Login
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-2">
      <Heading text="Log into account" />
      <div className="flex justify-center text-sm text-slate-400 gap-2">
        <Subheading text="Don't have an account" />
        <Link className=" underline" to={"/signup"}>
          Signup
        </Link>
      </div>
    </div>
  );
});
