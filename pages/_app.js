import "../styles/globals.css";
import "../styles/tables.css";
import "../styles/buttons.css";
import "../styles/modals.css";
import "../styles/typography.css";
import "../styles/alerts.css";
import "../styles/forms.css";
import "../styles/layout.css";
import "../styles/utility.css";
import AlertProvider from "../hooks/useAlert";
import BasicAuthProvider, { useBasicAuth } from "../hooks/useBasicAuth";
import LoadingProvider, { useIsLoading } from "../hooks/useIsLoading";
import DataProvider from "../hooks/useData";
import { ToastProvider, useToasts } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <main className="container text-white flex flex-col align-items-center">
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
    </main>
  );
}

export default MyApp;
