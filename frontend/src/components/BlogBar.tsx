type BlogBarProbs = {
  author: string;
  date: string;
};

export const BlogBar = ({ author, date }: BlogBarProbs) => {
  return (
    <div className="flex gap-2">
      <Avatar name={author} />
      <div className="flex font-light text-md justify-center items-center gap-2">
        {author}.
        <Dot/>
      </div>
      <div className="flex font-light text-xs text-slate-500 justify-center items-center">
        {date}
      </div>
    </div>
  );
};

function Avatar({ name }: {name : string}) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-600 rounded-full border-1 border-slate-300">
      <span className="font-light text-gray-100">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}

function Dot(){
    return (
        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
    )
}
