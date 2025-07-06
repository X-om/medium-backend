import { BlogBar } from "./BlogBar";
import { BlogBottom } from "./BlogBottom";
import { BlogContext } from "./BlogContext";

export const BlogCard = () => {
  return (
    <>
      <div className="w-full flex flex-col gap-2 px-6 pt-2">
        <div className="border-b-1 borde-slate-100 pb-2">
          <div className="flex flex-col gap-1">
            <BlogBar author="om" date="July 8, 2025" />
            <div className="w-1/2">
              <div className="w-full border-b-1 border-slate-300"></div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <BlogContext
              title="The Rise of Zod for Schema Validation"
              content="Zod is gaining popularity in the TypeScript world for its developer-friendly API and tight integration with validation and form handling."
            />
            <BlogBottom content="Zod is gaining popularity in the TypeScript world for its developer-friendly API and tight integration with validation and form handling." />
          </div>
        </div>
      </div>
    </>
  );
};
