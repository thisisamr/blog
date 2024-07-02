/* eslint-disable import/no-anonymous-default-export */

import { createCatchAllMeta } from "nextra/catch-all"
import  {getpaths} from '../../lib/getPaths'
export default async () => {
  const { paths } = await getpaths() as unknown as {
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
