import { LoginForm } from "../components/Auth/LoginForm";
import DashBoard from "../components/DashBoard/DashBoard";
import { Layout } from "../components/Layout";
import { useBasicAuth } from "../hooks/useBasicAuth";
export default function DashboardPage() {
  const { isAuthenticated } = useBasicAuth();

  return (
    <Layout>{isAuthenticated === false ? <LoginForm /> : <DashBoard />}</Layout>
  );
}
