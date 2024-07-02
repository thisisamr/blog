import prisma from "@/prisma/prisma";

export const getpaths= async ()=> {
  //get all paths from the db
  const r = await prisma.post.findMany({select:{
    slug:true
  }})
 
  const paths=r.map(item=>{
    return {
      params:{slug:item.slug}
    }
  })
  
return {
fallback: "blocking",
paths,
};
}