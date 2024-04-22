import { useEffect, useState } from "react";
import CustomWidth from "../../CustomWidth";
import _debounce from 'lodash/debounce';
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { set } from "lodash";

const AbsensiWaliKelas = ({idguru}) => {
    const WMobile = CustomWidth() <= 767;

    const [data, setData] = useState([]);

    const navTo = useNavigate();

    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limitPerPage = 10;

    const handleKeyword = async (e) => {
        try{
            await api.get(`/AbsensiMurid/Search/${idguru}?keyword=${e.target.value}`).then((res) => {
                setData(res.data);
                setTotalData(0);
            })
        }catch(err){
            setData([]);
            setTotalData(0);
        }
    }

    const handleNext = () => {
        if(currentPage < Math.ceil(totalData / limitPerPage)) {
          const newOffset = currentPage * limitPerPage;
          setCurrentPage(prevPage => prevPage + 1);
          getData(newOffset);
        }
      };
    
      const handlePrev = () => {
        if (currentPage > 1) {
          const newOffset = (currentPage - 2) * limitPerPage;
          setCurrentPage(prevPage => prevPage - 1);
          getData(newOffset);
        }
      }

    const getData = _debounce(async (offset) => {
        try{
            await api.get(`/AbsensiMurid/${idguru}?offset=${offset}`).then((res) => {
                setData(res.data.data);
                setTotalData(res.data.total);
            })
        }catch(err){
            setData([]);
            setTotalData(0);
        }
    }, 50)

    const DateNow = (datedata) => {
        const date = new Date(datedata);
        const year = date.getFullYear();
        const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];
        const monthIndex = date.getMonth();
        const month = monthNames[monthIndex];
        const day = date.getDate();
  
        const options = { weekday: 'long' };
        const dayName = date.toLocaleDateString('id-ID', options);
  
        return `${dayName}, ${day} ${month} ${year}`;
    };

    useEffect(() => {
        getData(0);
    }, [])

    return(
        <>
            {!WMobile ? (
                <div className="flex w-full rounded-3xl bg-[#D9D9D9] mx-4 p-8 font-inter">
                    <div className="flex flex-col w-full">
                        <div className="bg-blue-500 p-4"
                        style={{borderRadius: '10px 10px 0 0'}}>
                            <span className="text-white font-semibold text-xl">Izin Murid</span>
                        </div>
                        <div className="flex bg-white p-4 items-center">
                            <div className="max-w-md flex">
                                <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-solid border-black">
                                    <div className="grid place-items-center h-full w-12 text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                    className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
                                    type="text"
                                    id="search"
                                    onChange={handleKeyword}
                                    placeholder="Mencari Data Murid" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white p-4 h-full"
                        style={{borderRadius: '0 0 10px 10px'}}>
                            <table className="min-w-full">
                                <thead className="bg-blue-500 border border-1 border-gray-400"
                                style={{borderRadius: '10px 10px 0 0'}}>
                                    <tr className="px-3 text-white">
                                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">No</th>
                                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">Nama</th>
                                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">Tanggal</th>
                                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">Izin</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white border border-1">
                                    {data && data.length > 0 ? (
                                        data.map((item, index) => (
                                        <tr key={index} className="text-center cursor-pointer" onClick={() => navTo(`./${item.idabsen}`)}>
                                            <td className="text-sm font-medium px-2 py-2 text-center">{index + 1}</td>
                                            <td className="text-sm font-medium px-2 py-2 text-center">{item.nama}</td>
                                            <td className="text-sm font-medium px-2 py-2 text-center">{DateNow(item.tanggal)}</td>
                                            <td className="text-sm font-medium px-2 py-2 text-center">{item.izin}</td>
                                        </tr>
                                    ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-4 py-2 text-center">Data Kosong</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="mt-auto flex mx-auto mb-4 space-x-2 items-center">
                                <MdKeyboardArrowLeft onClick={() => handlePrev()} disabled={currentPage === 1}
                                className={`${currentPage === 1 ? 'cursor-not-allowed' : ''}`}/>
                                <span className="bg-[#1E6CB1] text-white px-2 border border-1 border-[#D9D9D9]">{currentPage}</span>
                                <MdKeyboardArrowRight onClick={() => handleNext()} 
                                className={`${currentPage === Math.ceil(totalData / limitPerPage) ? 'cursor-not-allowed' : ''}`} 
                                disabled={(currentPage === Math.ceil(totalData / limitPerPage))}/>
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

export default AbsensiWaliKelas