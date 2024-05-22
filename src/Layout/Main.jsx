import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Main = () => {
    return (
        <div>

            <div className="flex">
                <div className="w-52 min-h-screen shadow-xl py-4">
                    <SideBar></SideBar>
                </div>
                <div className="flex-1 p-2">
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;