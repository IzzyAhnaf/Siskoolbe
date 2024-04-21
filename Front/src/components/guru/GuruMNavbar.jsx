import { Link, useLocation } from "react-router-dom"
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { FaUserTie } from "react-icons/fa6";
import CustomWidth from "../../CustomWidth";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { useEffect, useState } from "react";

const GrMnvbar = () => {
    const [SelectNavbar, setNavbar] = useState(0);
    const WMobile = CustomWidth() <= 767;
    const location = useLocation();

    const SelectSidebars = (props) => {
        setNavbar(props);
    }

    useEffect(() => {
        const { pathname } = location;
        if (pathname.startsWith('/Siskoolbe/Guru')) SelectSidebars(0);
        else if (pathname.startsWith('/Siskoolbe/Guru/ProfileGuru')) SelectSidebars(1);
        else if (pathname.startsWith('/Siskoolbe/AboutUs')) SelectSidebars(1);
        else if (pathname.startsWith('/Siskoolbe/Guru/ProfSetGuru')) SelectSidebars(1);
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
                            to="/Siskoolbe/Guru"
                            onClick={() => setNavbar(0)}>
                            {SelectNavbar === 0 ? <AiFillHome className="w-5 h-5" /> : <AiOutlineHome className="w-5 h-5" />}
                            <span className="mx-4 font-normal font-inter ">Home</span>
                        </Link>

                        <Link className={`flex flex-col w-full items-center px-2 py-2 text-black dark:bg-opacity-50 dark:text-black
                        ${SelectNavbar === 1 ? 'bg-[#1E6CB1] bg-opacity-50' : ''}`}
                            to="/Siskoolbe/Guru/ProfileGuru"
                            onClick={() => setNavbar(1)}>
                            <FaUserTie className="w-5 h-5" />
                            <span className="mx-4 font-normal font-inter">Profile</span>
                        </Link>

                    </nav>

                </>
            )}
        </>
    );
};
export default GrMnvbar;