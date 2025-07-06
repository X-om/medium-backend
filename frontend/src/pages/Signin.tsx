import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export default function Signin() {
    return (
        <div className="flex flex-row bg-white w-full h-screen justify-center items-center">
            <Auth type="signin"/>
            <Quote/>
        </div>
    )
}