import "../styles/globals.css";
import "../styles/tables.css";

import BasicAuthProvider, { useBasicAuth } from "../hooks/useBasicAuth";
import LoadingProvider, { useIsLoading } from "../hooks/useIsLoading";
import DataProvider from "../hooks/useData";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <LoadingProvider>
        <BasicAuthProvider>
          <DataProvider>
            <Component {...pageProps} />
          </DataProvider>
        </BasicAuthProvider>
      </LoadingProvider>
    </ToastProvider>
  );
}

export default MyApp;
