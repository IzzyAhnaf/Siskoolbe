
import IzinForm from "../components/FormSakit";
import CustomWidth from "../CustomWidth";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/TestImageUp";
import { IoMdSettings } from "react-icons/io";



const Izin_Sakit = () => {
    const Wmobile = CustomWidth() <= 767;
    const navTo = useNavigate();
    return (
        <>
            {!Wmobile ? (

                <div className="flex w-screen  flex-col justify-center items-center rounded-3xl bg-[#D9D9D9] mx-4 ">
                    <div className="flex ">
                        <IzinForm />
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <span className="font-semibold font-inter text-xl mt-6 mx-6">Ilham</span>
                                <span className="font-semibold font-inter text-lg mt-2 mx-6">Student</span>
                            </div>
                            <img className="w-20 h-20 mt-2 ml-36" src="https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" alt="" />
                            <IoMdSettings className="absolute ml-80 mt-2 w-6 h-6" onClick={() => navTo('/Siskoolbe/Profile')} />
                        </div>
                        <div className="flex w-[360px] h-[450px] rounded-3xl  bg-[#D9D9D9] mx-4 items-center mt-[20px] ">
                            <IzinForm />
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default Izin_Sakit;