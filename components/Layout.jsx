import { useBasicAuth } from "../hooks/useBasicAuth";
import { useIsLoading } from "../hooks/useIsLoading";
import { LoginForm } from "./Auth/LoginForm";
import { MainTitle } from "./Headings/MainTitle";
import LoadingBackdrop from "./LoadingBackdrop";

export const Layout = ({children}) => {
	const { isAuthenticated } = useBasicAuth();
  const { loadingState } = useIsLoading();
	return (
		<div className="flex flex-col align-center">
		<MainTitle />

		{isAuthenticated === false ? <LoginForm /> : children }
		{loadingState?.overlay && <LoadingBackdrop />}
		</div>
	)
}
