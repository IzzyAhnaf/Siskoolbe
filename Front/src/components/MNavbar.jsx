import { Link } from "react-router-dom"
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { CiCalendar } from "react-icons/ci";
import { FaCalendar } from "react-icons/fa";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import CustomWidth from "../CustomWidth";
import { useState } from "react";

const Mnvbar = () => {
    const [SelectNavbar, setSelectNavbar] = useState(0);
    const WMobile = CustomWidth() <= 767;
    const Homes = (props) => {

        const navTo = useNavigate();
    }
    return (
        <>
            {!WMobile ? (
                <div>

                </div>
            ) : (
                <>
                    <nav className={`flex absolute justify-center items-center bottom-0 bg-[#000000] dark: bg-opacity-20 w-screen`}>
                        <Link className={`flex flex-col items-center px-2 py-2 mt-3 text-black duration-300 transform rounded-lg dark:text-black hover:bg-[#1E6CB1] dark:hover:bg-[#1E6CB1] dark:hover:bg-opacity-50 hover:bg-opacity-50 dark:hover:text-[#1E6CB1] hover:text-[#1E6CB1] 
                        ${SelectNavbar === 0 ? 'bg-opacity- bg-[#1E6CB1]' : ''}`}
                            to="/Siskoolbe/"
                            onClick={() => setSelectNavbar(0)}>
                            {SelectNavbar === 0 ? <AiFillHome className="w-5 h-5" /> : <AiOutlineHome className="w-5 h-5" />}
                            <span className="mx-4  font-normal font-inter">Home</span>
                        </Link>

                        <Link className={`flex flex-col items-center px-2 py-2 mt-3 mx-4 text-black duration-300 transform rounded-lg dark:text-black hover:bg-[#1E6CB1] dark:hover:bg-[#1E6CB1] dark:hover:bg-opacity-50 hover:bg-opacity-50 dark:hover:text-[#1E6CB1] hover:text-[#1E6CB1] 
                        ${SelectNavbar === 1 ? 'bg-opacity- bg-[#1E6CB1]' : ''}`}
                            to="/Siskoolbe/Profile"
                            onClick={() => setSelectNavbar(1)}>
                            {SelectNavbar === 1 ? <IoPerson className="w-5 h-5" /> : <IoPersonOutline className="w-5 h-5" />}
                            <span className="mx-4 font-normal font-inter">Profile</span>
                        </Link>

                        <Link className={`flex flex-col items-center px-2 py-2 mt-3 text-black duration-300 transform rounded-lg dark:text-black hover:bg-[#1E6CB1] dark:hover:bg-[#1E6CB1] dark:hover:bg-opacity-50 hover:bg-opacity-50 dark:hover:text-[#1E6CB1] hover:text-[#1E6CB1] 
                        ${SelectNavbar === 2 ? 'bg-opacity- bg-[#1E6CB1]' : ''}`}
                            to="/Siskoolbe/Izin-Sakit"
                            onClick={() => setSelectNavbar(2)}>
                            {SelectNavbar === 2 ? <FaCalendar className="w-5 h-5" /> : <CiCalendar className="w-5 h-5" />}
                            <span className="mx-6 font-normal font-inter">Izin</span>
                        </Link>

                    </nav>

                </>
            )}
        </>
    );
};
export default Mnvbar;