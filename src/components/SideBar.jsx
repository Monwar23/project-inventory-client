import { BiSolidCategoryAlt, BiSolidPurchaseTag, BiSolidReport } from "react-icons/bi";
import { FaPeopleCarry, FaSignInAlt, FaUserEdit } from "react-icons/fa";
import { MdAddShoppingCart, MdDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import useAdmin from "../hooks/useAdmin";


const SideBar = () => {

    const { user, logOut } = UseAuth();
    const [role] = useAdmin();
    console.log(role);

    const handleSignOut = () => {
        logOut();
    }

    return (

        <div className="p-3 space-y-2 dark:bg-gray-50 dark:text-gray-800">
            <div className="dark:divide-gray-300">
                {role === 'admin' &&
                    <>
                        <ul className="pt-2 pb-4 border-b space-y-1 text-sm">

                            <li className="dark:bg-gray-100 dark:text-gray-900">
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <MdDashboard className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500 font-medium' : 'font-medium'
                                    } to="/dashboard">Dashboard</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <BiSolidCategoryAlt className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500 font-medium' : 'font-medium'
                                    } to="/category">Category</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <MdOutlineProductionQuantityLimits className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500  font-medium' : 'font-medium'
                                    } to="/product">Product</NavLink></span>
                                </a>
                            </li>

                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <FaPeopleCarry className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500  font-medium' : 'font-medium'
                                    } to="/supplier">Supplier</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <BiSolidPurchaseTag className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500 font-medium' : 'font-medium'
                                    } to="/purchase">Purchase</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <MdAddShoppingCart className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500 font-medium' : 'font-medium'
                                    } to="/sales">Sales</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <BiSolidReport className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500  font-medium' : 'font-medium'
                                    } to="/report">Report</NavLink></span>
                                </a>
                            </li>
                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm">
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <FaUserEdit className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500 font-medium' : 'font-medium'
                                    } to="/userManage">User Manage</NavLink></span>
                                </a>
                            </li>
                            {user ?
                                <li>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md font-medium hover:text-violet-500 text-black">
                                        <FaSignInAlt className="text-violet-500" />
                                        <span><Link onClick={handleSignOut} >LogOut</Link></span>
                                    </a>
                                </li> :
                                <div>
                                    <li>
                                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <FaSignInAlt className="text-violet-500 " />
                                            <span><NavLink className={({ isActive }) =>
                                                isActive ? 'text-violet-500  font-medium' : 'font-medium'
                                            } to="/">SignIn / Register</NavLink></span>
                                        </a>
                                    </li>


                                </div>

                            }


                        </ul>
                    </>
                }
                {role === 'editor' &&
                    <>
                        <ul className="pt-2 pb-4 border-b space-y-1 text-sm">

                            <li className="dark:bg-gray-100 dark:text-gray-900">
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <MdDashboard className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500 font-medium' : 'font-medium'
                                    } to="/dashboard">Dashboard</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <BiSolidCategoryAlt className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500 font-medium' : 'font-medium'
                                    } to="/category">Category</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <MdOutlineProductionQuantityLimits className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500  font-medium' : 'font-medium'
                                    } to="/product">Product</NavLink></span>
                                </a>
                            </li>

                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <FaPeopleCarry className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500  font-medium' : 'font-medium'
                                    } to="/supplier">Supplier</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <BiSolidPurchaseTag className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500 font-medium' : 'font-medium'
                                    } to="/purchase">Purchase</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <MdAddShoppingCart className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500 font-medium' : 'font-medium'
                                    } to="/sales">Sales</NavLink></span>
                                </a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <BiSolidReport className="text-violet-500 " />
                                    <span><NavLink className={({ isActive }) =>
                                        isActive ? 'text-violet-500  font-medium' : 'font-medium'
                                    } to="/report">Report</NavLink></span>
                                </a>
                            </li>
                        </ul>
                        <ul className="pt-4 pb-2 space-y-1 text-sm">

                            {user ?
                                <li>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md font-medium hover:text-violet-500 text-black">
                                        <FaSignInAlt className="text-violet-500" />
                                        <span><Link onClick={handleSignOut} >LogOut</Link></span>
                                    </a>
                                </li> :
                                <div>
                                    <li>
                                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                            <FaSignInAlt className="text-violet-500 " />
                                            <span><NavLink className={({ isActive }) =>
                                                isActive ? 'text-violet-500  font-medium' : 'font-medium'
                                            } to="/">SignIn / Register</NavLink></span>
                                        </a>
                                    </li>

                                </div>

                            }


                        </ul>
                    </>

                }
                {role === 'user' &&
                    <>
                        <ul className="pt-2 pb-4 border-b space-y-1 text-sm">

                           
                                <li>
                                    <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md font-medium hover:text-violet-500 text-black">
                                        <FaSignInAlt className="text-violet-500" />
                                        <span><Link onClick={handleSignOut} >LogOut</Link></span>
                                    </a>
                                </li> 


                

                        </ul>


                    </>

                }

            </div>
        </div>

    );
};

export default SideBar;