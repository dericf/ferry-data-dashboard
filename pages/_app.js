import "../styles/globals.css";
import "../styles/utility.css";
import "../styles/tables.css";
import "../styles/buttons.css";
import "../styles/modals.css";
import "../styles/typography.css";
import "../styles/alerts.css";
import "../styles/forms.css";
import "../styles/layout.css";
import AlertProvider from "../hooks/useAlert";
import BasicAuthProvider from "../hooks/useBasicAuth";

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider>
      <BasicAuthProvider>
        <Component {...pageProps} />
      </BasicAuthProvider>
    </AlertProvider>
  );
}

export default MyApp;
