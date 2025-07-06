import { memo, useState, type ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react"; 

type InputProps = {
  name : string,
  label: string;
  placeholder: string;
  type: string;
  onChange : (e : ChangeEvent<HTMLInputElement>) => void
};

export const Input = memo(({name ,label, placeholder, type, onChange }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  return (
    <div className="w-full flex flex-col gap-1">
      <label className="text-sm text-gray-800 font-semibold">{label}</label>

      <div className="relative">
        <input
          name={name}
          className="text-xs p-3 pr-10 w-full border border-slate-300 rounded-md focus:outline-none"
          placeholder={placeholder}
          type={isPasswordType && showPassword ? "text" : type}
          onChange={onChange}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
});
