export const Quote = () => {
  return (
    <div className="hidden lg:bg-slate-200 lg:flex flex-row w-full h-screen justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="w-1/2 flex flex-col gap-5">
          <div className="text-2xl text-slate-800 font-bold ">
            "The customer serviece i received was exceptional. The support team
            went above and beyond to address my concern"
          </div>
          <div>
            <div className="text-xl font-semibold text-slate-800">
              Jules Winnfield
            </div>
            <div className="text-sm font-light text-slate-600">CEO, Acme Inc</div>
          </div>
        </div>
      </div>
    </div>
  );
};
