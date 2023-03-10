import "../styles/globals.css";
import MenuLayout from "../components/menuLayout";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: any) {
  return (
    <>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
        <MenuLayout>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Component {...pageProps} />
        </MenuLayout>
      )}
    </>
  );
}
