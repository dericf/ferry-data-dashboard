import "../styles/globals.css";
import "../styles/tables.css";

import AlertProvider from "../hooks/useAlert";
import BasicAuthProvider, { useBasicAuth } from "../hooks/useBasicAuth";
import LoadingProvider, { useIsLoading } from "../hooks/useIsLoading";
import DataProvider from "../hooks/useData";
import { ToastProvider, useToasts } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider>
      <AlertProvider>
        <LoadingProvider>
          <BasicAuthProvider>
            <DataProvider>
              <Component {...pageProps} />
            </DataProvider>
          </BasicAuthProvider>
        </LoadingProvider>
      </AlertProvider>
    </ToastProvider>
  );
}

export default MyApp;
