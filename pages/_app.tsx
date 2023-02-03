import "../styles/globals.css";
import type { AppProps } from "next/app";
import MenuLayout from "../components/menuLayout";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <MenuLayout>
          {/* <ToastContainer /> */}
          <Component {...pageProps} />
        </MenuLayout>
      )}
    </>
  );
}
