import { useNavigate, useParams } from "react-router-dom";
import CustomWidth from "../../CustomWidth";
import { useState, useEffect } from "react";
import _debounce from "lodash/debounce";
import { MdClass } from "react-icons/md";
import api from "../../api";

const AdminDetailKelas = () => {
    const WMobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;
    const navTo = useNavigate();

    const [dataKelas, setDataKelas] = useState([])

    const { id } = useParams()

    const getData = _debounce(async () => {
        try{
            const resp = await api.get('/getDetailKelas/' + id)
            setDataKelas(resp.data)
        }catch(err){
            console.log(err)
        }
    }, 50)

    useEffect(() => {
        getData()
    }, [])

    return(
        <>
         {!WMobile ? (
        <div className="flex flex-col w-full font-inter">

        <div className={`flex flex-col item-centers h-screen bg-[#D9D9D9] mx-4 rounded-3xl`}>
            <div className="flex mt-12 space-x-2 mx-6 lg:px-6 sm:px-7">
            <MdClass className="w-12 h-12 bg-white rounded-full px-2" />
            <span className="font-semibold text-2xl font-inter mt-2">Kelas</span>
            </div>
            <div class="flex flex-col mt-12">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div class="py-2 inline-block min-w-full sm:px-8 lg:px-10">
                <div class="overflow-hidden">
                    <table class="min-w-full">
                    <thead class="">
                        <tr className="px-3">
                        <th scope="col" class="text-sm font-medium text-gray-900 px-2 py-2 text-center">
                            No
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 text-center ">
                            Kelas
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-0 py-3 text-center ">
                            Guru
                        </th>
                        </tr>
                    </thead>
                        <tbody className="bg-white border-1 rounded-full">
                        {dataKelas && dataKelas.length > 0 ? (
                            dataKelas.map((dataKelas, index) => (
                            <tr key={dataKelas.id} className="cursor-pointer" 
                            style={{ borderRadius: '24px', borderBottom: '1px solid #D9D9D9' }} 
                            onClick={() => navTo(`/Siskoolbe/Admin/Admin_DetailKelas/${dataKelas.id}`)}>
                                <td className="px-2 py-4 text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                                <td className="text-sm text-gray-900 font-light py-4 text-center">
                                <span className="items-center font-inter font-medium text-sm">{dataKelas.kelas + ' - ' + dataKelas.namajurusan}</span>
                                </td>
                                <td className="text-sm text-gray-900 font-medium px-0 py-4 text-center">
                                {dataKelas.idguru ? dataKelas.idguru : '-'}
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan={3} className="px-4 py-2 text-center">Data Kosong</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        ) : (
            <>
            
            </>
        )}
        </>
    )
}

export default AdminDetailKelas