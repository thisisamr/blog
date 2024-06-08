/* eslint-disable import/no-anonymous-default-export */

import { createCatchAllMeta } from "nextra/catch-all"
import  {getStaticPaths} from './[slug].mdx'
export default async () => {
  const { paths } = await getStaticPaths() as unknown as {
    paths: { params: { slug: string } }[]
  }
  const options = {

     display: "hidden",
         theme:{sidebar:true,
                layout: "default",
                   timestamp: true,
         }
    
  }

  return createCatchAllMeta(
    paths.map(p => "/" + p.params.slug),
    Object.fromEntries(paths.map(p => [p.params.slug, options])),
  )
}
