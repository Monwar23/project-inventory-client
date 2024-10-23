import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminRoutes = ({children}) => {

     const [role, isLoading] = useAdmin()

  if (isLoading) return <LoadingSpinner />
  if (role === 'admin' || role === 'editor') return children
  return <Navigate to='/dashboard' />

};

export default AdminRoutes;