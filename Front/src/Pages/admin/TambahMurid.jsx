import IzinForm from "../../components/siswa/FormSakit";
import CustomWidth from "../../CustomWidth";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/TestImageUp";
import { IoMdSettings } from "react-icons/io";
import FormMurid from "../../components/admin/FormMurid";
import { FaBackspace, FaUserTie } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";



const TambahMurid = () => {
    const Wmobile = CustomWidth() <= 767;
    const navTo = useNavigate();
    const handleBack = () => {
        navTo('/Siskoolbe/Admin/Admin_Murid', { replace: true });
    };
    return (
        <>
            {!Wmobile ? (   
                <div className="flex flex-col rounded-xl mx-4 w-full">
                    <div className="bg-blue-500 p-4 w-full flex justify-between items-center"
                    style={{borderRadius: '10px 10px 0 0'}}>
                        <div className="flex space-x-2 items-center">
                            <FaUserTie className='text-white text-[24px] rounded-full' />
                            <span className="text-white font-semibold text-xl">Tambah Murid</span>
                        </div>
                        <div>
                            <FaBackspace className='text-white text-[24px] rounded-full' onClick={handleBack} />
                        </div>
                    </div>
                    <div className="w-full h-full overflow-y-auto hide-scroll border border-1">
                        <FormMurid />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center w-full">
                        <div className="bg-blue-500 p-4 w-full flex items-center"
                        style={{borderRadius: '10px 10px 0 0'}}>
                            <BiArrowBack className="w-6 h-6 mt-1 mr-2 text-white" onClick={() => navTo('/Siskoolbe/Siswa', { replace: true })} />
                            <span className="text-white font-semibold text-xl">Tambah Murid</span>
                        </div>
                        <div className="border border-1 w-full h-full mb-20 overflow-y-auto"
                        style={{borderRadius: '0 0 10px 10px'}}>
                            <FormMurid />
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default TambahMurid;