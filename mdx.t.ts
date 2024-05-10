   // typings/mdx.d.ts
   declare module '*.mdx' {
       export const getStaticPaths: () => Promise<any>;
       // Add other exports here as needed
   }