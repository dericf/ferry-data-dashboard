import { useBasicAuth } from "../hooks/useBasicAuth";
import { useIsLoading } from "../hooks/useIsLoading";
import { LoginForm } from "./Auth/LoginForm";
import { MainTitle } from "./Headings/MainTitle";
import LoadingBackdrop from "./LoadingBackdrop";

export const Layout = ({ children }) => {
  const { isAuthenticated } = useBasicAuth();
  const { loadingState } = useIsLoading();
  return (
    <main className=" py-6 lg:px-3 mx-auto min-h-screen flex flex-col justify-center align-middle overflow-y-auto">
      <MainTitle />
      {children}
      {loadingState?.overlay && <LoadingBackdrop />}
    </main>
  );
};
