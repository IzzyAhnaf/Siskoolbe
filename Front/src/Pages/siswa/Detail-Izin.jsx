import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import _debounce from 'lodash/debounce';
import api from "../../api";
import { IoArrowBack } from "react-icons/io5";

const DetailIzin = ({WMobile}) => {

    const id = useParams().id

    const [data,setData] = useState([])

    const navTo = useNavigate();

    const get = _debounce(async () => {
        try{
            const resp = await api.get(`/DetailIzinSiswa/${id}`, {
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

    useEffect(() => {
        console.log(data)
    },[data])

    return(
        <>
       {!WMobile ? (
        <div className="flex flex-col w-full rounded-xl bg-[#D9D9D9] mx-4 p-8 font-inter overflow-y-auto slim-scroll">
            <div className="flex flex-col items-center w-full space-y-4">
                    <div className="relative w-full">
                        <IoArrowBack className="text-3xl cursor-pointer absolute left-0 transform " onClick={() => navTo('/Siskoolbe/Siswa', {replace: true})}/>
                    </div>
                    <h1 className="text-3xl font-bold">Detail Izin</h1>
                    <div className="w-full">
                        <h4>Tipe Izin</h4>
                        <input type="text" value={data.izin} 
                            className="w-full flex border-[1px] border-black rounded-md bg-white px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 lg:text-lg sm:text-sm sm:leading-6"
                            disabled
                        />
                    </div>
                    <div className="w-full">
                        <h4>Detail Izin</h4>
                        <textarea value={data.detail_izin} 
                            className="flex border-[1px] slim-scroll px-4 w-full py-4 border-black rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-[20px] sm:leading-6"
                            style={{resize: 'none'}}
                            disabled
                        >
                        </textarea>
                    </div>
                    <div className="w-full">
                        <h4>Tanggal Izin</h4>
                        <input type="text" value={new Date(data.tanggal).toLocaleString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} 
                            className="w-full flex border-[1px] border-black rounded-md bg-white px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 lg:text-lg sm:text-sm sm:leading-6"
                            disabled
                        />
                    </div>
                    <div className='border-[1px] w-full justify-center flex flex-col items-center border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ' >
                        <img src={`data:image/png;base64,${data.bukti}`} alt="Uploaded" className="w-full mt-[20px]" />
                    </div>
            </div>
        </div>
       ) : (
        <div>

        </div>
       )}
       </>
    )
}

export default DetailIzin