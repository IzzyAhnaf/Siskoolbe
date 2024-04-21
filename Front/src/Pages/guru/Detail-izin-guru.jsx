import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import api from "../../api";
import _debounce from 'lodash/debounce';
import { IoArrowBack } from "react-icons/io5";


const DetailIzinGuru = ({WMobile}) => {
    const id = useParams().id

    const [data, setData] = useState([])

    const navTo = useNavigate();

    const get = _debounce(async () => {
        try{
            const resp = await api.get(`/DetailIzinGuru/${id}`, {
                headers: {
                    Authorization: `${sessionStorage.getItem('token')}`
                }
            })

            resp.status === 200 ? setData(resp.data[0]) : console.log(resp.data);
        }catch(err){
            navTo('/Siskoolbe/Siswa', {replace: true})
        }
    }, 50)

    useEffect(() => {
       get()
    }, [])

    return(
        <>
        {!WMobile ? (
         <div className="flex flex-col w-full rounded-xl bg-[#D9D9D9] mx-4 p-8 font-inter overflow-y-auto slim-scroll">
             <div className="flex bg-blue-500 w-full p-4 space-x-1 items-center"
             style={{borderRadius: '10px 10px 0 0'}}>
                 <IoArrowBack className="text-xl text-white" onClick={() => navTo('/Siskoolbe/Siswa', {replace: true})}/>
                 <span className="text-lg font-semibold text-white">Detail Izin</span>
             </div>
             <div className="flex flex-col items-center w-full space-y-4 bg-white p-4"
             style={{borderRadius: '0 0 10px 10px'}}>
                     <div className="w-full">
                         <h4 className="font-semibold">Tipe Izin</h4>
                         <input type="text" value={data.izin} 
                             className="w-full flex border-[1px] border-black rounded-md bg-white px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 lg:text-lg sm:text-sm sm:leading-6"
                             disabled
                         />
                     </div>
                     <div className="w-full">
                         <h4 className="font-semibold">Detail Izin</h4>
                         <textarea value={data.detail_izin} 
                             className="flex border-[1px] slim-scroll px-4 w-full py-4 border-black rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-[20px] sm:leading-6"
                             style={{resize: 'none'}}
                             disabled
                         >
                         </textarea>
                     </div>
                     <div className="w-full">
                         <h4 className="font-semibold">Tanggal Izin</h4>
                         <input type="text" value={new Date(data.tanggal).toLocaleString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} 
                             className="w-full flex border-[1px] border-black rounded-md bg-white px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 lg:text-lg sm:text-sm sm:leading-6"
                             disabled
                         />
                     </div>
                     <div className="w-full">
                         <h4 className="font-semibold">Bukti</h4>
                         <div className='border-[1px] w-full justify-center flex flex-col items-center border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                         mb-4'>
                             <img src={`data:image/png;base64,${data.bukti}`} alt="Uploaded" className="w-full mt-[20px]" />
                         </div>
                     </div>
             </div>
         </div>
        ) : (
         <div className="w-full">
             <div className="w-full bg-blue-500 flex items-center p-4 space-x-2"
             style={{borderRadius: '10px 10px 0 0'}}>
                 <IoArrowBack className="text-xl text-white" onClick={() => navTo('/Siskoolbe/Siswa', {replace: true})}/>
                 <span className="text-lg font-semibold text-white">Detail Izin</span>
             </div>
             <div className="flex flex-col items-center w-full space-y-4 bg-white p-4 border border-1 
             h-[78%]
             overflow-y-auto hide-scroll"
             style={{borderRadius: '0 0 10px 10px'}}>
                 <div className="w-full">
                         <h4 className="font-semibold">Tipe Izin</h4>
                         <input type="text" value={data.izin} 
                             className="w-full flex border-[1px] border-black rounded-md bg-white px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 lg:text-lg sm:text-sm sm:leading-6"
                             disabled
                         />
                     </div>
                     <div className="w-full">
                         <h4 className="font-semibold">Detail Izin</h4>
                         <textarea value={data.detail_izin} 
                             className="flex border-[1px] slim-scroll px-4 w-full py-4 border-black rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-[20px] sm:leading-6"
                             style={{resize: 'none'}}
                             disabled
                         >
                         </textarea>
                     </div>
                     <div className="w-full">
                         <h4 className="font-semibold">Tanggal Izin</h4>
                         <input type="text" value={new Date(data.tanggal).toLocaleString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} 
                             className="w-full flex border-[1px] border-black rounded-md bg-white px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 lg:text-lg sm:text-sm sm:leading-6"
                             disabled
                         />
                     </div>
                     <div className="w-full">
                         <h4 className="font-semibold">Bukti</h4>
                         <div className='border-[1px] w-full justify-center flex flex-col items-center border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'>
                             <img src={`data:image/png;base64,${data.bukti}`} alt="Uploaded" className="w-full mt-[20px]" />
                         </div>
                     </div>
             </div>
         </div>
        )}
        </>
    )
}

export default DetailIzinGuru