import IzinForm from "../../components/siswa/FormSakit";
import CustomWidth from "../../CustomWidth";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/TestImageUp";
import { IoMdSettings } from "react-icons/io";
import FormGuru from "../../components/admin/FormGuru";
import { FaBackspace, FaUserTie } from "react-icons/fa";



const TambahGuru = () => {
    const Wmobile = CustomWidth() <= 767;
    const navTo = useNavigate();
    const handleBack = () => {
        navTo('/Siskoolbe/Admin/Admin_Guru', { replace: true });
    };

    return (
        <>
            {!Wmobile ? (
                <div className="flex flex-col rounded-xl mx-4 w-full">
                    <div className="bg-blue-500 p-4 w-full flex justify-between items-center"
                    style={{borderRadius: '10px 10px 0 0'}}>
                        <div className="flex space-x-2 items-center">
                            <FaUserTie className='text-white text-[24px] rounded-full' />
                            <span className="text-white font-semibold text-xl">Tambah Guru</span>
                        </div>
                        <div>
                            <FaBackspace className='text-white text-[24px] rounded-full' onClick={handleBack} />
                        </div>
                    </div>
                    <div className="w-full h-full overflow-y-auto hide-scroll border border-1">
                        <FormGuru />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <span className="font-semibold font-inter text-xl mt-6 mx-6">Ilham</span>
                                <span className="font-semibold font-inter text-lg mt-2 mx-6">Student</span>
                            </div>
                            <img className="w-20 h-20 mt-2 ml-36" src="https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" alt="" />
                            <IoMdSettings className="absolute ml-80 mt-2 w-6 h-6" onClick={() => navTo('/Siskoolbe/Profile')} />
                        </div>
                        <div className="flex w-[360px] h-[450px] rounded-3xl  bg-[#D9D9D9] mx-[5px] items-center mt-[10px] ">
                            <FormMurid />
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default TambahGuru;