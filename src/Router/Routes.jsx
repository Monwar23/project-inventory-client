import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/Category/Category";
import Product from "../pages/Product/Product";
import Customer from "../pages/customer/Customer";
import Supplier from "../pages/supplier/Supplier";
import Purchase from "../pages/purchase/Purchase";
import Sales from "../pages/sales/Sales";
import Report from "../pages/report/Report";
import UpdateProduct from "../pages/Product/UpdateProduct";
import UpdateSupplier from "../pages/supplier/UpdateSupplier";
import UpdatePurchase from "../pages/purchase/UpdatePurchase";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Dashboard></Dashboard>
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
            path:'/customer',
            element:<Customer></Customer>
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
            path:'/report',
            element:<Report></Report>
        },
      ]
    },
    
  ]);