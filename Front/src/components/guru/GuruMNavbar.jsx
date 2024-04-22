import { Link, matchPath, useLocation } from "react-router-dom"
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa6";
import CustomWidth from "../../CustomWidth";
import { IoHomeOutline, IoPerson, IoPersonOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { useEffect, useState } from "react";
import { PiScrollFill, PiScrollLight } from "react-icons/pi";

const GrMnvbar = () => {
    const [SelectNavbar, setNavbar] = useState(0);
    const WMobile = CustomWidth() <= 767;
    const location = useLocation();

    const SelectSidebars = (props) => {
        setNavbar(props);
    }

    useEffect(() => {
        const { pathname } = location;
        if (matchPath('/Siskoolbe/Guru', pathname)) SelectSidebars(0);
        else if (matchPath('/Siskoolbe/Guru/Profile', pathname)) SelectSidebars(1);
        else if (matchPath('/Siskoolbe/Guru/AbsensiMurid', pathname) || matchPath('/Siskoolbe/Guru/AbsensiMurid/:id', pathname)) SelectSidebars(2);
        else if (matchPath('/Siskoolbe/AboutUs', pathname)) {
            SelectSidebars(3)
        }
        else if (matchPath('/Siskoolbe/Guru/ProfSetGuru', pathname)) SelectSidebars(1);
    }, [location])
    return (
        <>
            {!WMobile ? (
                <div>

                </div>
            ) : (
                <>
                    <nav className="flex fixed bottom-0 left-0 w-full bg-[#D9D9D9] p-2"
                    style={{borderTop: '1px solid #000000'}}>
                        <Link className={`flex flex-col w-full items-center px-2 py-2 text-black dark:bg-opacity-50
                        ${SelectNavbar === 0 ? 'bg-blue-700 bg-opacity-50 text-white rounded-xl' : ''}
                        `}
                            to="/Siskoolbe/Guru"
                            onClick={() => SelectSidebars(0)}>
                            {SelectNavbar === 0 ? <AiFillHome className="w-5 h-5" /> : <AiOutlineHome className="w-5 h-5" />}
                            <span className={`mx-2 text-[12px] font-normal font-inter`}>Home</span>
                        </Link>

                        <Link className={`flex flex-col w-full items-center px-2 py-2 text-black dark:bg-opacity-50
                        ${SelectNavbar === 1 ? 'bg-blue-700 bg-opacity-50 text-white rounded-xl' : ''}
                        `}
                            to="/Siskoolbe/Guru/ProfileGuru"
                            onClick={() => SelectSidebars(1)}>
                            {SelectNavbar === 1 ? <IoPerson className="w-5 h-5" /> : <IoPersonOutline className="w-5 h-5" />}
                            <span className="mx-2 text-[12px] font-normal font-inter">Profile</span>
                        </Link>

                        <Link className={`flex flex-col w-full items-center px-2 py-2 text-black dark:bg-opacity-50
                        ${SelectNavbar === 2 ? 'bg-blue-700 bg-opacity-50 text-white rounded-xl' : ''}
                        `}
                            to="/Siskoolbe/Guru/AbsensiMurid"
                            onClick={() => SelectSidebars(2)}>
                            {SelectNavbar === 2 ? <PiScrollFill className="w-5 h-5 " /> : <PiScrollLight className="w-5 h-5" />}
                            <span className="mx-2 text-[12px] font-normal font-inter">Absensi</span>
                        </Link>
                        
                        <Link className={`flex flex-col w-full items-center px-2 py-2 text-black dark:bg-opacity-50
                        ${SelectNavbar === 3 ? 'bg-blue-700 bg-opacity-50 text-white rounded-xl' : ''}
                        `}
                            to="/Siskoolbe/AboutUs"
                            onClick={() => SelectSidebars(3)}>
                            {SelectNavbar === 3 ? <PiScrollFill className="w-5 h-5 " /> : <PiScrollLight className="w-5 h-5" />}
                            <span className="mx-2 text-[12px] font-normal font-inter">About Us</span>
                        </Link>
                        
                    </nav>

                </>
            )}
        </>
    );
};
export default GrMnvbar;