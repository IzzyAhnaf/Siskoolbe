import { Link, useNavigate, useLocation } from "react-router-dom"
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import CustomWidth from "../../CustomWidth";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { useEffect, useState } from "react";

const Mnvbar = () => {
    const [SelectNavbar, setNavbar] = useState(0);
    const WMobile = CustomWidth() <= 767;
    const location = useLocation();
    
    const SelectSidebars = (props) => {
        setNavbar(props);
    }

    useEffect(() => {
        const { pathname } = location;
        if (pathname.startsWith('/Siskoolbe/Siswa')) SelectSidebars(0);
        else if (pathname.startsWith('/Siskoolbe/Siswa/Profile')) SelectSidebars(1);
        else if (pathname.startsWith('/Siskoolbe/AboutUs')) SelectSidebars(1);
    }, [])

    return (
        <>
            {!WMobile ? (
                <div>

                </div>
            ) : (
                <>
                    <nav className="flex fixed items-center bottom-0 bg-[#000000] dark:bg-opacity-20 w-full ml-[-10px]">
                        <Link className={`flex flex-col w-full items-center px-2 py-2 text-black dark:bg-opacity-50 dark:text-black
                        ${SelectNavbar === 0 ? 'bg-[#1E6CB1] bg-opacity-50' : ''}`}
                            to="/Siskoolbe/Siswa"
                            onClick={() => SelectSidebars(0)}>
                            {SelectNavbar === 0 ? <AiFillHome className="w-5 h-5" /> : <AiOutlineHome className="w-5 h-5" />}
                            <span className="mx-4 font-normal font-inter ">Home</span>
                        </Link>

                        <Link className={`flex flex-col w-full items-center px-2 py-2 text-black dark:bg-opacity-50 dark:text-black
                        ${SelectNavbar === 1 ? 'bg-[#1E6CB1]' : ''}`}
                            to="/Siskoolbe/Siswa/Profile"
                            onClick={() => SelectSidebars(1)}>
                            <svg className="w-5 h-5 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="mx-4 font-normal font-inter">Profile</span>
                        </Link>
                    </nav>

                </>
            )}
        </>
    );
};
export default Mnvbar;