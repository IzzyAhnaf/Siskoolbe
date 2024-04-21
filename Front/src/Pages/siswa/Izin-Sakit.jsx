
import IzinForm from "../../components/siswa/FormSakit";
import CustomWidth from "../../CustomWidth";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/TestImageUp";
import { IoMdSettings } from "react-icons/io";
import api from '../../api';
import _debounce from 'lodash/debounce';
import { useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";


const Izin_Sakit = () => {
    const Wmobile = CustomWidth() <= 767;
    const navTo = useNavigate();

    
    const check = _debounce(async () => {
        try{
            const check = await api.get('/CheckIzinSiswa', {
                headers: {
                    Authorization: `${sessionStorage.getItem('token')}`
                }
            })

            if(check.status === 200){
                
            }else{
                navTo('/Siskoolbe/Siswa', { replace: true });
            }
        }catch(err){
            navTo('/Siskoolbe/Siswa', { replace: true });
        }
    }, 50)

    useEffect(() => {
        check()
        return () => {
            check.cancel()
        }
    }, [])
    return (
        <>
            {!Wmobile ? (

                <div className="flex flex-col w-full rounded-3xl mx-4">
                    <div className="bg-blue-500 p-4 w-full"
                    style={{borderRadius: '10px 10px 0 0'}}>
                        <span className="text-white font-semibold text-xl">Izin</span>
                    </div>
                    <div className="w-full h-full overflow-y-auto hide-scroll border border-1">
                        <IzinForm navTo={navTo}/>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center w-full">
                        <div className="bg-blue-500 p-4 w-full flex items-center"
                        style={{borderRadius: '10px 10px 0 0'}}>
                            <BiArrowBack className="w-6 h-6 mt-1 mr-2 text-white" onClick={() => navTo('/Siskoolbe/Siswa', { replace: true })} />
                            <span className="text-white font-semibold text-xl">Izin</span>
                        </div>
                        <div className="border border-1 w-full h-full mb-20 overflow-y-auto"
                        style={{borderRadius: '0 0 10px 10px'}}>
                            <IzinForm navTo={navTo}/>
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default Izin_Sakit;