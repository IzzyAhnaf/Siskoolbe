
import IzinFormGuru from "../../components/guru/FormIzinGuru";
import CustomWidth from "../../CustomWidth";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/TestImageUp";
import { IoMdSettings } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";



const Izin_Guru = () => {
    const Wmobile = CustomWidth() <= 767;
    const navTo = useNavigate();
    return (
        <>
            {!Wmobile ? (
                <div className="flex w-full flex-col items-center rounded-3xl mx-4">
                    <div className="bg-blue-500 p-4 w-full" 
                    style={{borderRadius: '10px 10px 0 0'}}>
                        <span className="text-white font-semibold text-xl">Izin</span>
                    </div>
                    <div className="w-full h-full overflow-y-auto hide-scroll border border-1"
                    style={{borderRadius: '0 0 10px 10px'}}>
                        <IzinFormGuru />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center w-full">
                        <div className="bg-blue-500 p-4 w-full flex items-center"
                        style={{borderRadius: '10px 10px 0 0'}}>
                            <BiArrowBack className="w-6 h-6 mt-1 mr-2 text-white" onClick={() => navTo('/Siskoolbe/guru', { replace: true })} />
                            <span className="text-white font-semibold text-xl">Izin</span>
                        </div>
                        <div className="border border-1 w-full h-full mb-20 overflow-y-auto"
                        style={{borderRadius: '0 0 10px 10px'}}>
                            <IzinFormGuru />
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default Izin_Guru;