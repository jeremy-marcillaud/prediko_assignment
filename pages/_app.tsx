import "../styles/globals.css";
import type { AppProps } from "next/app";
import MenuLayout from "../components/menuLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <MenuLayout>
          <Component {...pageProps} />
        </MenuLayout>
      )}
    </>
  );
}
