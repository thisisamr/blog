import Provider from "@/components/Provider";
import "../globals.css";
import type { AppProps } from "next/app";
import { Roboto_Flex, Roboto_Mono, Caveat } from "next/font/google";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
});
const caveat = Caveat({
  subsets: ["latin"],
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${robotoFlex.style.fontFamily};
        }
        .caveat-font {
          font-family: ${caveat.style.fontFamily};
        }
        .roboto-mono {
          font-family: ${robotoMono.style.fontFamily};
        }
      `}</style>
      <Provider>
        <Component {...pageProps} />;
      </Provider>
    </>
  );
}
