import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"

export const Blogs = () => {
    return (
        <div className="w-screen h-screen">
            <Appbar/>
            <div>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
            </div>
        </div>
    )
}