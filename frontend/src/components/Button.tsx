import { memo, type MouseEventHandler } from "react";

const modeType = {
  success: "bg-green-600",
  danger: "bg-red-600",
  default: "bg-black",
} as const;

const hoverMode = {
  success: "hover:bg-green-500",
  danger: "hover:bg-red-500",
  default: "hover:bg-gray-900",
} as const;

type ModeType = keyof typeof modeType;

type ButtonProps = {
  mode: ModeType;
  text: string;
  onClick : MouseEventHandler<HTMLButtonElement>;
  disabled : boolean
};

export const Button = memo(({ mode, text, onClick, disabled }: ButtonProps) => {
  const modeClass = modeType[mode];
  const hoverClass = hoverMode[mode];

  return (
    <button
      className={`${modeClass} ${hoverClass} text-white px-4 py-2 rounded-md w-full font-semibold cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {text}
      
    </button>
  );
});