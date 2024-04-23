import { useEffect, useState } from "react";
import CustomWidth from "../../CustomWidth";
import _debounce from "lodash/debounce";
import api from "../../api";
import Swal from 'sweetalert2';
import { BiArrowBack } from "react-icons/bi";
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

    const shortJurusan = (jurusan) => {
        if(jurusan === "Pengembangan Perangkat Lunak dan Gim"){
          return "PPLG"
        }else if(jurusan === "Akutansi Keuangan Lembaga"){
          return "AKL"
        }else if(jurusan === "Teknik Otomotif"){
          return "TO"
        }else if(jurusan === "Perhotelan"){
          return "PH"
        }else if(jurusan === "Desain Komunikasi Visual"){
          return "DKV"
        }
      }

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
            <div className="flex rounded-xl w-full h-[90%] bg-[#D9D9D9] border border-1 font-inter">
                <div className="flex flex-col w-full">
                    <div className="bg-blue-500 p-4 w-full flex items-center justify-between text-white space-x-2"
                    style={{borderRadius: '10px 10px 0 0'}}>
                        <div className="flex items-center space-x-2">
                            <MdClass className="w-12 h-12 bg-white rounded-full px-2 text-blue-500"/>
                            <span className="font-semibold text-2xl font-inter">Kelas</span>
                        </div>
                        <BiArrowBack className="w-12 h-12 rounded-full px-2 text-white"
                        onClick={() => navTo('/Siskoolbe/Admin/Admin_Jurusan')}/>
                    </div>
                    <div className="w-full flex flex-col bg-white h-full p-1 border border-1 overflow-y-auto"
                    style={{borderRadius: '0 0 10px 10px'}}>
                    <div className="overflow-y-auto hide-scroll">
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
                                        <span className="items-center font-inter font-medium text-sm">{dataKelas.kelas + ' - ' + shortJurusan(dataKelas.namajurusan) + ' ' + dataKelas.sub_jurusan}</span>
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
        )}
        </>
    )
}

export default AdminDetailJurusan