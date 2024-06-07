import Provider from "@/components/Provider";
import "../globals.css";
import type { AppProps } from "next/app";
import { Roboto_Flex, Roboto_Mono, Caveat,M_PLUS_Rounded_1c, Inter } from "next/font/google";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
});
const caveat = Caveat({
  subsets: ["latin"],
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});
const inter =Inter({subsets:["latin"],weight:"400"});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        .caveat-font {
          font-family: ${caveat.style.fontFamily};
        }
        .roboto-mono {
          font-family: ${robotoMono.style.fontFamily};
        }
        .inter{
          font-family:${inter.style.fontFamily}
        }
      `}</style>
      <Provider>
        <Component {...pageProps}/>
      </Provider>
    </>
  )
}
