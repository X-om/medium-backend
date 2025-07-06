export const Heading = ({ text } : {text : string}) => {
    return (
        <div className="text-2xl font-bold w-full text-center">
            {text}
        </div>
    )
}