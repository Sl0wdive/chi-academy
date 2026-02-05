import { Navigate } from "react-router-dom";

interface Props {
  children: React.JSX.Element;
  isAllowed: boolean;
}

const ProtectedRoute = ({ children, isAllowed }: Props) => {
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
