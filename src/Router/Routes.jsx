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
            path:'/customer',
            element:<Customer></Customer>
        },
        {
            path:'/supplier',
            element:<Supplier></Supplier>
        },
        {
            path:'/purchase',
            element:<Purchase></Purchase>
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