import { Link } from "react-router-dom"
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa6";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import CustomWidth from "../CustomWidth";
import { PiScrollLight, PiScrollFill } from "react-icons/pi";
import { GiTrumpetFlag } from "react-icons/gi";




const SidebarAdmin = () => {
    const [SelectSidebar, setSelectSidebar] = useState(sessionStorage.getItem("sidebar") || 0);
    const WMobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;
    const Homes = (props) => {

        const navTo = useNavigate();
    }

    const SelectSidebars = (props) => {
        sessionStorage.setItem("sidebar", props);
        setSelectSidebar(props);
    }
    return (
        <aside className={`flex flex-col px-4 py-8  rounded-xl ${DekstopLow ? 'h-[625px]' : 'h-[935px]'} bg-sky-700`}>
            <a href="#" className="mx-auto"></a>
            <div className="flex flex-col items-center mt-6 mx-2">
                <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                <h4 className="mx-2 mt-2 font-medium text-gray-100 dark:text-gray-200">John Doe</h4>
                <p className="mx-2 mt-1 text-sm font-medium text-gray-100 dark:text-gray-400">Student</p>
            </div>
            <div className="flex space-y-2 justify-center mt-[8px] overflow-y-scroll hide-scroll">
                <nav className="space-y-2">
                    <Link className={`flex flex-col items-center space-y-2 px-4 py-2 mt-5 text-gray-100  
                                ${SelectSidebar === 0 ? 'bg-opacity-50 bg-gray-100 rounded-none' : ''}
                                rounded-lg dark:text-gray-100 hover:bg-gray-300 hover:bg-opacity-50 hover:text-gray-100`}
                        to="/Siskoolbe/Admin"
                        onClick={() => SelectSidebars(0)}>
                        {SelectSidebar === 0 ? <AiFillHome className="w-5 h-5" /> : <AiOutlineHome className="w-5 h-5" />}
                        <span className="mx-4 font-medium font-inter">Home</span>
                    </Link>

                    <Link className={`flex flex-col items-center space-y-2 px-4 py-2 mt-2 text-gray-100 rounded-lg

                    ${SelectSidebar === 1 ? 'bg-gray-100 bg-opacity-50' : ''} 
                    dark:text-gray-200 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100`}
                        to="/Siskoolbe/Admin/Admin_Guru"
                        onClick={() => SelectSidebars(1)}>
                        <FaUserTie className="w-5 h-5" />
                        <span className="mx-4 font-medium font-inter">Guru</span>
                    </Link>

                    <Link className={`flex flex-col items-center space-y-2 px-4 py-2 mt-2 text-gray-100
                    rounded-lg dark:text-gray-100 
                    ${SelectSidebar === 2 ? 'bg-gray-100 bg-opacity-50' : ''}
                    hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100`}
                        to="/Siskoolbe/Admin/Admin_Murid"
                        onClick={() => SelectSidebars(2)}>
                        {SelectSidebar === 3 ? <IoPerson className="w-5 h-5" /> : <IoPersonOutline className="w-5 h-5" />}
                        <span className="mx-4 font-medium text-center font-inter">Murid</span>
                    </Link>

                    <Link className={`flex flex-col items-center space-y-2 px-4 py-2 mt-2 text-gray-100
                    rounded-lg dark:text-gray-100 
                    ${SelectSidebar === 3 ? 'bg-gray-100 bg-opacity-50' : ''}
                    hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100`}
                        to="/Siskoolbe/Admin/Admin_Jurusan"
                        onClick={() => SelectSidebars(3)}>
                        {SelectSidebar === 3 ? <GiTrumpetFlag className="w-5 h-5 " /> : <GiTrumpetFlag className="w-5 h-5" />}
                        <span className="mx-4 font-small text-center font-inter">Jurusan</span>
                    </Link>

                    <Link className={`flex flex-col items-center space-y-2 px-4 py-2 mt-2 text-gray-100
                    rounded-lg dark:text-gray-100 
                    ${SelectSidebar === 4 ? 'bg-gray-100 bg-opacity-50' : ''}
                    hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100`}
                        to=""
                        onClick={() => SelectSidebars(4)}>
                        {SelectSidebar === 4 ? <PiScrollLight className="w-5 h-5 " /> : <PiScrollFill className="w-5 h-5" />}
                        <span className="mx-4 font-small text-center font-inter">About Us</span>
                    </Link>

                </nav>
            </div>
        </aside>
    )
}

export default SidebarAdmin;