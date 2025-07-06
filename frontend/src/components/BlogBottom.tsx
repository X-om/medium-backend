import { CircleMinus, Ellipsis, SquarePlus } from "lucide-react";

export const BlogBottom = ({ content }: { content: string }) => {
  return (
    <div className="w-ful flex justify-between">
      <div className="flex gap-1 items-center text-xs font-light text-slate-500">
        {Math.floor(content.length / 100) + " min read"}
      </div>
      <div className="flex gap-3">
        <SquarePlus color="gray" className="w-5 h-5"/>
        <CircleMinus color="gray" className="w-5 h-5"/>
        <Ellipsis color="gray" className="w-5 h-5"/>
      </div>
    </div>
  );
};
