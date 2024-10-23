import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category/Category";
import Product from "../pages/Product/Product";
import Supplier from "../pages/supplier/Supplier";
import Purchase from "../pages/purchase/Purchase";
import Sales from "../pages/sales/Sales";
import UpdateProduct from "../pages/Product/UpdateProduct";
import UpdateSupplier from "../pages/supplier/UpdateSupplier";
import UpdatePurchase from "../pages/purchase/UpdatePurchase";
import UpdateSales from "../pages/sales/UpdateSales";
import SignIn from "../pages/Signin/SignIn";
import Register from "../pages/Signin/Register";
import ManageUser from "../pages/users/ManageUser";
import UpdateRoles from "../pages/users/UpdateRoles";
import Just from "../pages/Signin/Just";
import ErrorPage from "../pages/ErrorPage";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivatesRoutes";
import ManageUserAdminRoutes from "./ManageUserAdminRoutes";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<SignIn></SignIn>
        },
        {
            path:'/category',
            element:<PrivateRoutes><AdminRoutes><Category></Category></AdminRoutes></PrivateRoutes>
        },
        {
            path:'/product',
            element:<PrivateRoutes><AdminRoutes><Product></Product></AdminRoutes></PrivateRoutes>
        },
        {
            path:'/updateProduct/:id',
            element:<PrivateRoutes><AdminRoutes><UpdateProduct></UpdateProduct></AdminRoutes></PrivateRoutes>,
            loader:({params})=>fetch(`http://localhost:8000/product/${params.id}`)
        },
       
        {
            path:'/supplier',
            element:<PrivateRoutes><AdminRoutes><Supplier></Supplier></AdminRoutes></PrivateRoutes>
        },
        {
            path:'/updateSupplier/:id',
            element:<PrivateRoutes><AdminRoutes><UpdateSupplier></UpdateSupplier></AdminRoutes></PrivateRoutes>,
            loader:({params})=>fetch(`http://localhost:8000/supplier/${params.id}`)
        },
        {
            path:'/purchase',
            element:<PrivateRoutes><AdminRoutes><Purchase></Purchase></AdminRoutes></PrivateRoutes>
        },
        {
            path:'/updatePurchase/:id',
            element:<PrivateRoutes><AdminRoutes><UpdatePurchase></UpdatePurchase></AdminRoutes></PrivateRoutes>,
            loader:({params})=>fetch(`http://localhost:8000/purchase/${params.id}`)
        },
        {
            path:'/sales',
            element:<PrivateRoutes><AdminRoutes><Sales></Sales></AdminRoutes></PrivateRoutes>
        },
        {
            path:'/updateSales/:id',
            element:<PrivateRoutes><AdminRoutes><UpdateSales></UpdateSales></AdminRoutes></PrivateRoutes>,
            loader:({params})=>fetch(`http://localhost:8000/sales/${params.id}`)
        },
       
        {
            path:'/dashboard',
            element:<PrivateRoutes><AdminRoutes><Dashboard></Dashboard></AdminRoutes></PrivateRoutes>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/userManage',
            element:<PrivateRoutes><ManageUserAdminRoutes><ManageUser></ManageUser></ManageUserAdminRoutes> </PrivateRoutes>
        },
        {
            path: '/updateUsers/:id',
            element: <PrivateRoutes><ManageUserAdminRoutes><UpdateRoles /></ManageUserAdminRoutes></PrivateRoutes>,
            loader: ({ params }) => fetch(`http://localhost:8000/users/${params.id}`)
        },
        {
            path:'/just',
            element:<PrivateRoutes><Just></Just></PrivateRoutes>
        },
      ]
    },
    
  ]);