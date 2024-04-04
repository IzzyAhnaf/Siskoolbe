import { Link } from "react-router-dom"
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import CustomWidth from "../../CustomWidth";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { useState } from "react";

const Mnvbar = () => {
    const [SelectSidebar, setSelectSidebar] = useState(0);
    const [SelectNavbar, setNavbar] = useState(0);
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
                    <nav className="flex flex-row fixed items-center justify-between bottom-0 bg-[#000000] dark: bg-opacity-20 w-full ml-[-10px]">

                        <Link className={`flex flex-col items-center px-2 py-2 mx-4 text-black rounded-lg dark:bg-[#1E6CB1]  dark:bg-opacity-50 dark:text-black mt-3 ${SelectNavbar === 0 ? 'bg-[#1E6CB1] bg-opacity-50' : ''}`}
                            to="/Siskoolbe/"
                            onClick={() => setNavbar(0)}>
                            {SelectNavbar === 0 ? <AiFillHome className="w-5 h-5" /> : <AiOutlineHome className="w-5 h-5" />}
                            <span className="mx-4 font-normal font-inter ">Home</span>
                        </Link>

                        <Link className={`flex flex-col items-center px-2 py-2 mx-4  text-black rounded-lg dark:bg-[#1E6CB1]  dark:bg-opacity-50 dark:text-black mt-3 ${SelectNavbar === 1 ? 'bg-[#1E6CB1]' : ''}`}
                            to="/Siskoolbe/Profile"
                            onClick={() => setNavbar(1)}>
                            <svg className="w-5 h-5 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="mx-4 font-normal font-inter">Profile</span>
                        </Link>

                        <Link className={`flex flex-col items-center px-2 py-2 mx-4  text-black rounded-lg dark:bg-[#1E6CB1]  dark:bg-opacity-50 dark:text-black mt-3 ${SelectNavbar === 2 ? 'bg-[#1E6CB1]' : ''}`}
                            to="/Siskoolbe/Izin-Sakit"
                            onClick={() => setNavbar(2)}>
                            <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1792 993q60 41 107 93t81 114t50 131t18 141q0 119-45 224t-124 183t-183 123t-224 46q-91 0-176-27t-156-78t-126-122t-85-157H128V128h256V0h128v128h896V0h128v128h256zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256zm643 1280q-3-31-3-64q0-119 45-224t124-183t183-123t224-46q100 0 192 33V640H256v896zm573 384q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36m64-512h192v128h-320v-384h128z"></path></svg>
                            <span className="mx-6 font-normal text-center ">Izin</span>
                        </Link>
                    </nav>

                </>
            )}
        </>
    );
};
export default Mnvbar;