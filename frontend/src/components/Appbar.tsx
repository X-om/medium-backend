import { Menu, UserRound } from "lucide-react";

export const Appbar = () => {
  return (
    <>
      <div className="w-full h-1/14 border-b-1 border-slate-300 flex justify-between items-center px-2 md:h-1/20">
        <div>
          <Menu />
        </div>
        <div className="rounded-full border justify-center items-center border-slate-300 w-fit p-1">
          <UserRound size={30} color=" rgb(41 37 36)" />
        </div>
      </div>
    </>
  );
};
