import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export const ControlledUsage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  return (
    <form
      method="POST"
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let f = new FormData(e.currentTarget);
        f.append("content", value);
        try {
          console.log({title:f.get("title"),value,slug:f.get("slug")})
          const created_post = await fetch("/api/blog/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: f.get("title"),
              content: value,
              slug: f.get("slug"),
            }),
          });
          await fetch(`/api/revalidate?slug={${f.get('slug')}}`)
          console.log(created_post)
       router.push("/blog");
        } catch (e) {
          toast.error("error creating post", { closeButton: true });
        }
      }}
      className="flex flex-col items-center p-2"
    >
      <PostInputField input_name="title" />
      <PostInputField input_name="slug" />
      <div className="">
        <h1 className="p-2">Content</h1>
        <SimpleMDE value={value} onChange={onChange} />
      </div>
      <input type="submit" className="cursor-pointer border border-white p-2 rounded-md" />
    </form>
  );
};
export default ControlledUsage;

const PostInputField = ({ input_name }: { input_name: string }) => {
  return (
    <div className="mb-5 w-full max-w-96">
      <label
        htmlFor="base-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {input_name}
      </label>
      <input
        name={input_name}
        type="text"
        id="base-input"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-900/90 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  )
}
