import { Link, matchPath, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import CustomWidth from "../../CustomWidth";
import { PiScrollLight, PiScrollFill } from "react-icons/pi";
import { ImExit } from "react-icons/im";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa6";
import { removeCookies } from "../../setCookies";

const SidebarGuru = ({nama, gambar_profil}) => {
    const [SelectSidebar, setSelectSidebar] = useState(0);
    const WMobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;
    const location = useLocation();

    const SelectSidebars = (props) => {
        setSelectSidebar(props);
    }
    
    const Logout = () => {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        removeCookies("token");
        navTo("/Siskoolbe/login", { replace: true });
    }

    useEffect(() => {
        const { pathname } = location;
        if (matchPath("/Siskoolbe/Guru", pathname)) SelectSidebars(0);
        else if (matchPath("/Siskoolbe/Guru/Profile", pathname)) SelectSidebars(1);
        else if (matchPath("/Siskoolbe/AboutUs", pathname)) SelectSidebars(2);
    }, [])

    return (
        <aside className={`flex flex-col px-4 py-8 rounded-xl bg-sky-700`}>
            <div className="flex flex-col items-center mt-6 mx-2 cursor-default">
                <img className="object-cover w-24 h-24 mx-2 rounded-full" alt="avatar" 
                src={gambar_profil}
                onError={(e) => e.currentTarget.src = "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"}/>
                <h4 className="mx-2 mt-2 font-medium text-gray-100 dark:text-gray-200">{nama}</h4>
                <p className="mx-2 mt-1 text-sm font-medium text-gray-100 dark:text-gray-400">Guru</p>
            </div>
            <div className="flex space-y-2 mt-[8px] h-full">
                <nav className="space-y-2 h-full relative">
                    <Link className={`flex flex-col items-center space-y-2 px-4 py-2 mt-5 text-gray-100  
                        ${SelectSidebar === 0 ? 'bg-opacity-50 bg-gray-100' : ''}
                        rounded-lg dark:text-gray-100 hover:bg-gray-300 hover:bg-opacity-50 hover:text-gray-100`}
                        to="/Siskoolbe/Guru"
                        onClick={() => setSelectSidebar(0)}>
                        {SelectSidebar === 0 ? <AiFillHome className="w-5 h-5" /> : <AiOutlineHome className="w-5 h-5" />}
                        <span className="mx-4 font-medium font-inter">Home</span>
                    </Link>

                    <Link className={`flex flex-col items-center space-y-2 px-4 py-2 mt-2 text-gray-100 rounded-lg

                    ${SelectSidebar === 1 ? 'bg-gray-100 bg-opacity-50' : ''} 
                    dark:text-gray-200 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100`}
                        to="/Siskoolbe/Guru/ProfileGuru"
                        onClick={() => setSelectSidebar(1)}>
                        <FaUserTie className="w-5 h-5" />
                        <span className="mx-4 font-medium font-inter">Profile</span>
                    </Link>

                    <Link className={`flex flex-col items-center space-y-2 px-1 py-2 mt-2 text-gray-100
                    rounded-lg dark:text-gray-100 
                    ${SelectSidebar === 2 ? 'bg-gray-100 bg-opacity-50' : ''}
                    hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100`}
                        to="/Siskoolbe/AboutUs"
                        onClick={() => setSelectSidebar(2)}>
                        {SelectSidebar === 3 ? <PiScrollFill className="w-5 h-5 " /> : <PiScrollLight className="w-5 h-5" />}
                        <span className="mx-4 font-small text-center font-inter">About Us</span>
                    </Link>

                    <Link className={`flex flex-col items-center space-y-2 px-4 py-2 mt-2 text-gray-100
                    rounded-lg dark:text-gray-100 
                   hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100`} 
                        style={!DekstopLow ? { position: 'absolute', bottom: 10 } : {}}
                        onClick={() => {Logout()}}>
                        {SelectSidebar === 3 ? <ImExit className=" w-5 h-5 " /> : <ImExit className="w-5 h-5" />}
                        <span className="mx-2 font-small text-center font-inter">Log Out</span>
                    </Link>
                    
                </nav>
            </div>
        </aside>
    )
}

export default SidebarGuru;