import { useEffect, useState } from "react";
import CustomWidth from "../../CustomWidth";
import _debounce from 'lodash/debounce';
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { set } from "lodash";
import { MdDateRange } from 'react-icons/md';
import { CustomDatePicker } from "../../components/CustomDatePicker";



const AbsensiWaliKelas = ({idguru}) => {
    const WMobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;

    const [data, setData] = useState([]);

    const navTo = useNavigate();

    const [startDate, setStartDate] = useState(null);
    const [izinFilter, setIzinFilter] = useState("");

    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limitPerPage = 10;

    const handleKeyword = async (e) => {
        try{
            await api.get(`/AbsensiMurid/Search/${idguru}?keyword=${e.target.value}`).then((res) => {
                setData(res.data.data);
                setTotalData(res.data.total);
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
            await api.get(`/AbsensiMurid/${idguru}?offset=${offset}&start_date=${startDate ? startDate.toISOString() : null}&izin_filter=${izinFilter}`).then((res) => {
                setData(res.data.data);
                setTotalData(res.data.total);
            })
        }catch(err){
            setData([]);
            setTotalData(0);
        }
    }, 50)

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleIzinFilterChange = (e) => {
        setIzinFilter(e.target.value);
    };


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
    }, [startDate, izinFilter]);

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
                            <div className="mx-4 flex space-x-2">
                                <span>Filter Tanggal</span>
                                <CustomDatePicker handleChange={handleDateChange} selectedDate={startDate}/>
                            </div>
                            <div className="space-x-2">
                                <span>Filter Izin</span>
                                <select className="w-43 h-8 bg-white border-2 border-solid border-black rounded-lg"

                                onChange={(e) => setIzinFilter(e.target.value)}>
                                    <option value="">Semua</option>
                                    <option value="sakit">Sakit</option>
                                    <option value="keterangan">Keterangan</option>
                                    <option value="tanpa_keterangan">Tanpa Keterangan</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white p-4 h-full"
                        style={{borderRadius: '0 0 10px 10px'}}>
                            <div className={`overflow-y-auto slim-scroll ${DekstopLow ? 'h-[355px]' : 'h-full'}`}>
                                <table className="min-w-full">
                                    <thead className="bg-blue-500 border border-1 border-gray-400"
                                    style={{borderRadius: '10px 10px 0 0'}}>
                                        <tr className="px-3 text-white">
                                            <th scope="col" className="text-sm font-medium px-2 py-2 text-center">No</th>
                                            <th scope="col" className="text-sm font-medium px-2 py-2 text-center">Nama</th>
                                            <th scope="col" className="text-sm font-medium px-2 py-2 text-center">Tanggal</th>
                                            <th scope="col" className="text-sm font-medium px-2 py-2 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white border border-1 border-gray-400">
                                        {data && data.length > 0 ? (
                                            data.map((item, index) => (
                                            <tr key={index} className={`text-center ${item.izin === 'izin' || item.izin === 'keterangan' ? 'cursor-pointer' : 'cursor-default'} border border-1`}
                                            onClick={() => item.izin === 'izin' || item.izin === 'keterangan' && navTo(`./${item.idabsen}`)}
                                            >
                                                <td className="text-sm font-medium px-2 py-2 text-center">{index + 1}</td>
                                                <td className="text-sm font-medium px-2 py-2 text-center">{item.nama}</td>
                                                <td className="text-sm font-medium px-2 py-2 text-center">{DateNow(item.tanggal)}</td>
                                                <td className="text-sm font-medium px-2 py-2 text-center">{item.absen_masuk ? 'Hadir' : item.izin}</td>
                                            </tr>
                                        ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-4 py-2 text-center">Data Kosong</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
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
                <div className="flex w-full mx-2 h-[90%] rounded-xl bg-[#D9D9D9] border border-1 font-inter">
                    <div className="flex flex-col w-full">
                        <div className="bg-blue-500 p-4"
                        style={{borderRadius: '10px 10px 0 0'}}>
                            <span className="text-white font-semibold text-lg">Izin Murid</span>
                        </div>
                        <div className="flex flex-col bg-white space-y-2 p-4">
                            <div className="max-w-md flex">
                                <div className="relative flex w-full h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-solid border-black">
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
                            <div className="flex space-x-2">
                                <span>Filter Tanggal</span>
                                <CustomDatePicker handleChange={handleDateChange} selectedDate={startDate} WMobile={WMobile}/>
                            </div>
                            <div className="space-x-2">
                                <span>Filter Izin</span>
                                <select className="w-43 h-8 bg-white border-1 border border-black rounded-lg"
                                onChange={(e) => setIzinFilter(e.target.value)}>
                                    <option value="">Semua</option>
                                    <option value="sakit">Sakit</option>
                                    <option value="keterangan">Keterangan</option>
                                    <option value="tanpa_keterangan">Tanpa Keterangan</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white p-1 h-full border border-1 overflow-y-auto"
                        style={{borderRadius: '0 0 10px 10px'}}>
                            <div className={`overflow-y-auto slim-scroll ${DekstopLow ? 'h-[355px]' : 'h-full'}`}>
                                <table className="min-w-full">
                                    <thead className="bg-blue-500 border border-1 border-gray-400"
                                    style={{borderRadius: '10px 10px 0 0'}}>
                                        <tr className="px-3 text-white">
                                            <th scope="col" className="text-sm font-medium px-2 py-2 text-center">No</th>
                                            <th scope="col" className="text-sm font-medium px-2 py-2 text-center">Nama</th>
                                            <th scope="col" className="text-sm font-medium px-2 py-2 text-center">Tanggal</th>
                                            <th scope="col" className="text-sm font-medium px-2 py-2 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white border border-1 border-gray-400">
                                        {data && data.length > 0 ? (
                                            data.map((item, index) => (
                                            <tr key={index} className={`text-center ${item.izin === 'izin' || item.izin === 'keterangan' ? 'cursor-pointer' : 'cursor-default'} border border-1`}
                                            onClick={() => item.izin === 'izin' || item.izin === 'keterangan' && navTo(`./${item.idabsen}`)}
                                            >
                                                <td className="text-sm font-medium px-2 py-2 text-center">{index + 1}</td>
                                                <td className="text-sm font-medium px-2 py-2 text-center">{item.nama}</td>
                                                <td className="text-sm font-medium px-2 py-2 text-center">{DateNow(item.tanggal)}</td>
                                                <td className="text-sm font-medium px-2 py-2 text-center">{item.absen_masuk && !item.izin ? 'Hadir' : !item.absen_masuk && !item.izin ? 'Belum Hadir' : item.izin === 'tanpa_keterangan' ? 'tanpa keterangan' : item.izin}</td>
                                            </tr>
                                        ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-4 py-2 text-center">Data Kosong</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-auto flex mx-auto pt-2 space-x-2 items-center">
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
            )}
        </>
    )
}

export default AbsensiWaliKelas