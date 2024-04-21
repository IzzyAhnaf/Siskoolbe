import { useEffect, useState } from "react";
import CustomWidth from "../../CustomWidth";
import _debounce from "lodash/debounce";
import api from "../../api";
import Swal from 'sweetalert2';
import { useNavigate, useParams } from "react-router-dom";
import { MdClass } from "react-icons/md";


const AdminDetailJurusan = () => {
    const WMobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;
    const navTo = useNavigate();

    const [dataKelas, setDataKelas] = useState([])

    const {id} = useParams()

    const getData = _debounce(async () => {
        try{
            const resp = await api.get('/getKelas_Admin/' + id)
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
        <div className="flex flex-col w-full font-inter h-full">
        <div className={`flex flex-col h-full bg-[#D9D9D9] mx-4 rounded-3xl py-8`}>
            <div className="flex space-x-2 mx-6 lg:px-6 sm:px-7 bg-blue-500 py-4 text-white"
            style={{borderRadius: '10px 10px 0 0'}}>
                <MdClass className="w-12 h-12 bg-white rounded-full px-2 text-blue-500"/>
                <span className="font-semibold text-2xl font-inter mt-2">Kelas</span>
            </div>
            <div className="flex flex-col bg-white mx-6 h-full"
            style={{borderRadius: '0 0 10px 10px'}}>
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-8 lg:px-6">
                <div className="overflow-hidden">
                    <table className="min-w-full">
                    <thead className="bg-blue-500 border border-1 border-gray-400"
                    style={{borderRadius: '10px 10px 0 0'}}>
                        <tr className="px-3 text-white">
                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                            No
                        </th>
                        <th scope="col" className="text-sm font-medium text-center ">
                            Kelas
                        </th>
                        <th scope="col" className="text-sm font-medium px-0 py-3 text-center ">
                            Wali Kelas
                        </th>
                        </tr>
                    </thead>
                        <tbody className="bg-white border-1 border rounded-full">
                        {dataKelas && dataKelas.length > 0 ? (
                            dataKelas.map((dataKelas, index) => (
                            <tr key={dataKelas.id} className="cursor-pointer" 
                            style={{ borderRadius: '24px', border: '1px solid #D9D9D9' }} 
                            onClick={() => navTo(`/Siskoolbe/Admin/Admin_DetailKelas/${dataKelas.id}`)}>
                                <td className="px-2 py-4 text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                                <td className="text-sm text-gray-900 font-light py-4 text-center">
                                <span className="items-center font-inter font-medium text-sm">{dataKelas.kelas + ' - ' + dataKelas.namajurusan}</span>
                                </td>
                                <td className="text-sm text-gray-900 font-medium px-0 py-4 text-center">
                                {dataKelas.namaguru ? dataKelas.namaguru : '-'}
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

export default AdminDetailJurusan