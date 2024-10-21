import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category/Category";
import Product from "../pages/Product/Product";
import Supplier from "../pages/supplier/Supplier";
import Purchase from "../pages/purchase/Purchase";
import Sales from "../pages/sales/Sales";
import Report from "../pages/report/Report";
import UpdateProduct from "../pages/Product/UpdateProduct";
import UpdateSupplier from "../pages/supplier/UpdateSupplier";
import UpdatePurchase from "../pages/purchase/UpdatePurchase";
import UpdateSales from "../pages/sales/UpdateSales";
import SignIn from "../pages/Signin/SignIn";
import Register from "../pages/Signin/Register";
import ManageUser from "../pages/users/ManageUser";
import UpdateRoles from "../pages/users/UpdateRoles";
import Just from "../pages/Signin/Just";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<SignIn></SignIn>
        },
        {
            path:'/category',
            element:<Category></Category>
        },
        {
            path:'/product',
            element:<Product></Product>
        },
        {
            path:'/updateProduct/:id',
            element:<UpdateProduct></UpdateProduct>,
            loader:({params})=>fetch(`http://localhost:8000/product/${params.id}`)
        },
       
        {
            path:'/supplier',
            element:<Supplier></Supplier>
        },
        {
            path:'/updateSupplier/:id',
            element:<UpdateSupplier></UpdateSupplier>,
            loader:({params})=>fetch(`http://localhost:8000/supplier/${params.id}`)
        },
        {
            path:'/purchase',
            element:<Purchase></Purchase>
        },
        {
            path:'/updatePurchase/:id',
            element:<UpdatePurchase></UpdatePurchase>,
            loader:({params})=>fetch(`http://localhost:8000/purchase/${params.id}`)
        },
        {
            path:'/sales',
            element:<Sales></Sales>
        },
        {
            path:'/updateSales/:id',
            element:<UpdateSales></UpdateSales>,
            loader:({params})=>fetch(`http://localhost:8000/sales/${params.id}`)
        },
        {
            path:'/report',
            element:<Report></Report>
        },
        {
            path:'/dashboard',
            element:<Dashboard></Dashboard>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/userManage',
            element:<ManageUser></ManageUser>
        },
        {
            path: '/updateUsers/:id',
            element: <UpdateRoles />,
            loader: ({ params }) => fetch(`http://localhost:8000/users/${params.id}`)
        },
        {
            path:'/just',
            element:<Just></Just>
        },
      ]
    },
    
  ]);