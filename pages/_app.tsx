import "../styles/globals.css";
import type { AppProps } from "next/app";
import MenuLayout from "../components/menuLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MenuLayout>
      <Component {...pageProps} />
    </MenuLayout>
  );
}
