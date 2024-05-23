import { Post } from "@prisma/client";
import { compileMDX } from "next-mdx-remote/rsc";

export default function fetcher<T, U>(url: T, data?: U) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(data),
  }).then((d) =>
    d.json().then((posts) => {
      let fm = posts.map((post: Post) => {
        let compiled = compileMDX({
          source: post.content,
          options: { parseFrontmatter: true },
        }).then(({ frontmatter }) => {
          return { frontmatter, slug: post.slug };
        });
        return compiled;
      });
      return Promise.all(fm).then((resolved) => {
        return resolved;
      });
    })
  );
}
