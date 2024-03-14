import { Link } from "react-router-dom"
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import CustomWidth from "../CustomWidth";

const Sidebar = () => {
    const [SelectSidebar, setSelectSidebar] = useState(0);
    const WMobile = CustomWidth() <= 767;
    const Homes = (props) => {

        const navTo = useNavigate();
    }
    return (
        <aside className={`flex flex-col min-h-screen px-4 py-8 overflow-y-auto rounded-xl bg-sky-700`}>
            <a href="#" className="mx-auto"></a>
            <div className="flex flex-col items-center mt-6 mx-2">
                <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                <h4 className="mx-2 mt-2 font-medium text-gray-100 dark:text-gray-200">John Doe</h4>
                <p className="mx-2 mt-1 text-sm font-medium text-gray-100 dark:text-gray-400">Student</p>
            </div>
            <div className="flex justify-center mt-6">
                <nav>
                    <Link className={`flex flex-col items-center px-4 py-2 mt-5 text-gray-100  
                                ${SelectSidebar === 0 ? 'bg-opacity-50 bg-gray-100' : ''}
                                rounded-lg dark:text-gray-100 hover:bg-gray-300 hover:bg-opacity-50 hover:text-gray-100`}
                        to="/Siskoolbe/"
                        onClick={() => setSelectSidebar(0)}>
                        {SelectSidebar === 0 ? <AiFillHome className="w-5 h-5" /> : <AiOutlineHome className="w-5 h-5" />}
                        <span className="font-medium font-inter">Home</span>
                    </Link>

                    <Link className={`flex flex-col items-center px-4 py-2 mt-2 text-gray-100 rounded-lg
                                ${SelectSidebar === 1 ? 'bg-gray-100 bg-opacity-50' : ''} 
                              dark:text-gray-200 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100`}
                        to="/Siskoolbe/Profile"
                        onClick={() => setSelectSidebar(1)}>
                        {SelectSidebar === 1 ? <IoPerson className="w-5 h-5" /> : <IoPersonOutline className="w-5 h-5" />}
                        <span className="mx-4 font-medium font-inter">Profile</span>
                    </Link>

                    <Link className={`flex flex-col items-center px-4 py-2 mt-2 text-gray-100
                                rounded-lg dark:text-gray-100 
                                ${SelectSidebar === 2 ? 'bg-gray-100 bg-opacity-50' : ''}
                              hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100`}
                        to="/Siskoolbe/Izin-Sakit"
                        onClick={() => setSelectSidebar(2)}>
                        <TbCalendarTime />
                        <span className="mx-4 font-medium text-center font-inter">Izin</span>
                    </Link>
                </nav>
            </div>
        </aside>


    );
};
export default Sidebar;