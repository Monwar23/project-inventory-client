import { BiSolidCategoryAlt, BiSolidPurchaseTag, BiSolidReport } from "react-icons/bi";
import { FaPeopleCarry, FaSignInAlt, FaUserEdit } from "react-icons/fa";
import { MdAddShoppingCart, MdDashboard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { NavLink } from "react-router-dom";


const SideBar = () => {


    return (

        <div className="p-3 space-y-2 dark:bg-gray-50 dark:text-gray-800">
            <div className="dark:divide-gray-300">
                <ul className="pt-2 pb-4 border-b space-y-1 text-sm">
                    <li className="dark:bg-gray-100 dark:text-gray-900">
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                            <MdDashboard className="text-violet-500 " />
                            <span><NavLink className={({ isActive }) =>
                                isActive ? 'text-violet-500 font-medium' : 'font-medium'
                            } to="/">Dashboard</NavLink></span>
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
                        <MdOutlineProductionQuantityLimits className="text-violet-500 "/>
                            <span><NavLink className={({ isActive }) =>
                                isActive ? 'text-violet-500  font-medium' : 'font-medium'
                            } to="/product">Product</NavLink></span>
                        </a>
                    </li>
                   
                    <li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <FaPeopleCarry className="text-violet-500 "/>
                            <span><NavLink className={({ isActive }) =>
                                isActive ? 'text-violet-500  font-medium' : 'font-medium'
                            } to="/supplier">Supplier</NavLink></span>
                        </a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <BiSolidPurchaseTag className="text-violet-500 "/>
                            <span><NavLink className={({ isActive }) =>
                                isActive ? 'text-violet-500 font-medium' : 'font-medium'
                            } to="/purchase">Purchase</NavLink></span>
                        </a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <MdAddShoppingCart className="text-violet-500 "/>
                            <span><NavLink className={({ isActive }) =>
                                isActive ? 'text-violet-500 font-medium' : 'font-medium'
                            } to="/sales">Sales</NavLink></span>
                        </a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <BiSolidReport className="text-violet-500 "/>
                            <span><NavLink className={({ isActive }) =>
                                isActive ? 'text-violet-500  font-medium' : 'font-medium'
                            } to="/report">Report</NavLink></span>
                        </a>
                    </li>
                </ul>
                <ul className="pt-4 pb-2 space-y-1 text-sm">
                    <li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <FaUserEdit className="text-violet-500 "/>
                            <span><NavLink className={({ isActive }) =>
                                isActive ? 'text-violet-500 font-medium' : 'font-medium'
                            } to="/userManage">User Manage</NavLink></span>
                        </a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                        <FaSignInAlt className="text-violet-500 "/>
                            <span><NavLink className={({ isActive }) =>
                                isActive ? 'text-violet-500  font-medium' : 'font-medium'
                            } to="/signIn">SignIn</NavLink></span>
                        </a>
                    </li>
                    <li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                <rect width="32" height="64" x="256" y="232"></rect>
                            </svg>
                            <span><NavLink className={({ isActive }) =>
                                isActive ? 'text-violet-500  font-medium' : 'font-medium'
                            } to="/signUp">SignUp</NavLink></span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default SideBar;