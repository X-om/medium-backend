type BlogContextProbs = {
    title : string,
    content : string
}

export const BlogContext = ({title , content} : BlogContextProbs) => {
    return (
        <div className="w-full flex flex-col gap-1">
            <div className="text-xl font-bold">
                {title}
            </div>
            <div className="text-sm text-slate-500 font-serif font-extralight">
                {content.length > 100 ? content.substring(0,100) + "..." : content}
            </div>
        </div>
    )
}