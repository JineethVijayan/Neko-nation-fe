import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";


const ProtectedRoute = ({ role }) => {
  const { currentUser, loading } = useUser();


  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div> // Prevents redirecting too soon
    )
  }

  if (!currentUser) {
    return <Navigate to="/user/signin" replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />; // Redirect if role doesn't match
  }

  return <Outlet />;
};

export default ProtectedRoute;
