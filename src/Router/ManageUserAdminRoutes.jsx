import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useAdmin from "../hooks/useAdmin";


const ManageUserAdminRoutes = ({children}) => {

     const [role, isLoading] = useAdmin()

  if (isLoading) return <LoadingSpinner />
  if (role === 'admin') return children
  return <Navigate to='/dashboard' />

};

export default ManageUserAdminRoutes;