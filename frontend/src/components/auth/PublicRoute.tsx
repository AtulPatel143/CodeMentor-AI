import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type PublicRouteProps = {
  children: ReactNode;
};

function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/workspace" replace />;
  }

  return <>{children}</>;
}

export default PublicRoute;
