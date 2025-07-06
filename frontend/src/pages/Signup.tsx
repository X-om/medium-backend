import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export default function Signup() {
    return (
        <div className="flex flex-row justify-center items-center w-full">
            <Auth type="signup"/>
            <Quote/>
        </div>
    )
}