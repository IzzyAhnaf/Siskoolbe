import { Link, matchPath } from "react-router-dom"
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import CustomWidth from "../../CustomWidth";
import { FaUserTie } from "react-icons/fa";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import { GiTrumpetFlag } from "react-icons/gi";
import { useEffect, useState } from "react";
import { PiScrollFill, PiScrollLight } from "react-icons/pi";

const AMNavbar = () => {
    const [SelectNavbar, setNavbar] = useState(0);
    const WMobile = CustomWidth() <= 767;

    const SelectSidebars = (props) => {
        setNavbar(props);
    }

    useEffect(() => {
        const { pathname } = location;
        if (matchPath("/Siskoolbe/Admin", pathname)) SelectSidebars(0);
        else if (matchPath("/Siskoolbe/Admin/Admin_Guru", pathname) || matchPath("Siskoolbe/Admin/TambahGuru", pathname) || matchPath("Siskoolbe/Admin/Edit_Guru/:id", pathname)) SelectSidebars(1);
        else if (matchPath("/Siskoolbe/Admin/Admin_Murid", pathname) || matchPath("Siskoolbe/Admin/TambahMurid", pathname) || matchPath("Siskoolbe/Admin/Edit_Murid/:id", pathname)) SelectSidebars(2);
        else if (matchPath("/Siskoolbe/Admin/Admin_Kelas", pathname)) SelectSidebars(3);
        else if (matchPath("/Siskoolbe/Admin/Admin_Jurusan", pathname) || matchPath("Siskoolbe/Admin/TambahJurusan", pathname)) SelectSidebars(3);
        else if (matchPath("/Siskoolbe/AboutUs", pathname)) SelectSidebars(4);

        const matchDetailKelas = matchPath("/Siskoolbe/Admin/Admin_DetailKelas/:id", pathname);

        const matchDetailJurusan = matchPath("/Siskoolbe/Admin/Admin_DetailJurusan/:id", pathname);

        if (matchDetailKelas || matchDetailJurusan) {
            SelectSidebars(3);
        }

    }, [location.pathname])

    
    return (
        <>
            {!WMobile ? (
                <div>

                </div>
            ) : (
                <>
                    <nav className="flex fixed bottom-0 left-0 w-full bg-[#D9D9D9] justify-between items-center p-2"
                    style={{borderTop: '1px solid #000000'}}>
                        <Link className={`flex flex-col w-[75px] items-center px-2 py-2 text-black dark:bg-opacity-50
                        ${SelectNavbar === 0 ? 'bg-blue-700 bg-opacity-50 text-white rounded-xl' : ''}
                        `}
                            to="/Siskoolbe/Admin"
                            onClick={() => setNavbar(0)}>
                            {SelectNavbar === 0 ? <AiFillHome className="w-5 h-5" /> : <AiOutlineHome className="w-5 h-5" />}
                            <span className="mx-2 font-normal text-[12px] font-inter ">Home</span>
                        </Link>

                        <Link className={`flex flex-col w-[75px] items-center px-2 py-2 text-black dark:bg-opacity-50
                        ${SelectNavbar === 1 ? 'bg-blue-700 bg-opacity-50 text-white rounded-xl' : ''}
                        `}
                            to="/Siskoolbe/Admin/Admin_Guru"
                            onClick={() => setNavbar(1)}>
                            <FaUserTie />
                            <span className="mx-2 font-normal text-[12px] font-inter">Guru</span>
                        </Link>

                        <Link className={`flex flex-col w-[75px] items-center px-2 py-2 text-black dark:bg-opacity-50
                        ${SelectNavbar === 2 ? 'bg-blue-700 bg-opacity-50 text-white rounded-xl' : ''}
                        `}                            
                            to="/Siskoolbe/Admin/Admin_Murid"
                            onClick={() => setNavbar(2)}>
                            {SelectNavbar === 2 ? <IoPerson className="w-5 h-5" /> : <IoPersonOutline className="w-5 h-5" />}
                            <span className="mx-6 font-normal text-[12px] text-center">Murid</span>
                        </Link>

                        <Link className={`flex flex-col w-[75px] items-center px-2 py-2 text-black dark:bg-opacity-50
                        ${SelectNavbar === 3 ? 'bg-blue-700 bg-opacity-50 text-white rounded-xl' : ''}
                        `}
                            to="/Siskoolbe/Admin/Admin_Jurusan"
                            onClick={() => setNavbar(3)}>
                            <GiTrumpetFlag />
                            <span className="font-normal text-[12px] text-center ">Jurusan</span>
                        </Link>

                        <Link className={`flex flex-col w-[75px] items-center px-2 py-2 text-black dark:bg-opacity-50
                        ${SelectNavbar === 4 ? 'bg-blue-700 bg-opacity-50 text-white rounded-xl' : ''}
                        `}
                            to="/Siskoolbe/AboutUs"
                            onClick={() => SelectSidebars(4)}>
                            {SelectNavbar === 4 ? <PiScrollFill className="w-5 h-5 " /> : <PiScrollLight className="w-5 h-5" />}
                            <span className="text-[12px] font-normal text-center font-inter">About Us</span>
                        </Link>
                        
                    </nav>

                </>
            )}
        </>
    );
};
export default AMNavbar;