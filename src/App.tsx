import { useConvexAuth } from "convex/react";
import { SignInForm } from "./SignInForm";
import { MainLayout } from "./components/layout/main-layout";

export default function App() {
  const { isAuthenticated } = useConvexAuth();

  if (!isAuthenticated) {
    return <SignInForm />;
  }

  return <MainLayout />;
}
