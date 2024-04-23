import { useNavigate, useParams } from "react-router-dom";
import CustomWidth from "../../CustomWidth";
import { useState, useEffect } from "react";
import _debounce from "lodash/debounce";
import { MdClass, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import api from "../../api";
import Swal from "sweetalert2";
import { BiArrowBack } from "react-icons/bi";

const AdminDetailKelas = () => {
    const WMobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;
    const navTo = useNavigate();

    const { id } = useParams()

    const [dataKelas, setDataKelas] = useState([]);
    const [dataMurid, setDataMurid] = useState([]);
    const [dataGuru, setDataGuru] = useState([]);
    const [searchGuru, setSearchGuru] = useState({nama: "", id: ""});
    const [searchResults, setSearchResults] = useState([]);

    const [totalData, setTotalData] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limitPerPage = 10;

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchGuru(value);
        filterGuru();
    }

    const filterGuru = () => {
        if (searchGuru.trim() === "") {
            setSearchResults([]);
        } else {
            const filteredGuru = dataGuru.filter((guru) => {
                return guru.nama.toLowerCase().includes(searchGuru.toLowerCase());
            });
            setSearchResults(filteredGuru);
        }
    };
    
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

    const handleSelectGuru = (id, nama) => {
        setSearchGuru({ id, nama });
        setSearchResults([]);
        console.log({ id, nama });
    };

    const getData = _debounce(async (offset) => {
        try{
            const resp = await api.get('/getDetailKelas/' + id + '?offset=' + offset)
            setDataKelas(resp.data.resp)
            setDataMurid(resp.data.resp2data)
            setTotalData(resp.data.resp2length)
            setDataGuru(resp.data.resp3)
            setSearchGuru({nama: resp.data.resp.namaguru || "", id: resp.data.resp.idguru || ""})
        }catch(err){
            navTo('/Siskoolbe/Admin/Admin_DetailJurusan', { replace: true })
        }   
    }, 50)

    const ubahWaliKelas = async () => {
        try {
            await api.post('/ubahWaliKelas', {
                id: id,
                idguru: searchGuru.id,
            }).then(() => {
                Swal.fire(
                    'Berhasil!',
                    'Wali kelas berhasil telah diubah.',
                    'success'
                )
            })
        } catch (err) {
            Swal.fire(
                'Gagal!',
                'Wali kelas gagal diubah.',
                'error'
            )
        }
    }

    useEffect(() => {
        getData(0)
    }, [])

    useEffect(() => {
        if (searchGuru.length === 0 && searchResults.length > 0) {
            setSearchResults([]); 
        }
    }, [searchGuru]);

    return(
        <>
         {!WMobile ? (
        <div className="flex flex-col w-full font-inter h-full">
        <div className={`flex flex-col h-full bg-[#D9D9D9] mx-4 rounded-3xl py-8`}>
            <div className="flex space-x-4 mx-6 lg:px-6 sm:px-7 bg-blue-500 py-4 text-white"
            style={{borderRadius: '10px 10px 0 0'}}>
                <MdClass className="w-12 h-12 bg-white text-blue-500 rounded-full px-2" />
                <span className="font-semibold text-2xl font-inter mt-2">Kelas {dataKelas.kelas + " " + dataKelas.namajurusan + " " + dataKelas.sub_jurusan}</span>
            </div>
            <div className="flex justify-between mx-6 py-4 lg:px-10 sm:px-8 bg-white items-center">
                <div className="relative">
                    <div className="flex space-x-4 items-center">
                        <input type="text" className="rounded-lg outline-1 outline px-4 py-1 text-black placeholder:text-gray-500" placeholder="Wali Kelas" 
                        value={searchGuru.nama}
                        onChange={handleSearchChange}/>
                        <span className="text-lg">Wali Kelas</span>
                    </div>
                    {searchResults.length > 0 ? (
                        <ul className="absolute z-10 bg-white rounded-lg shadow-lg mt-1 w-full">
                          {searchResults.map((result, index) => (
                              <li
                                  key={index}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                  onClick={() => {handleSelectGuru(result.id, result.nama)}}
                              >
                                  {result.nama}
                              </li>
                          ))}
                      </ul>
                    )  : (
                        <>
                        </>
                    )}
                </div>
                <button type="button" className="bg-green-500 text-white font-medium rounded-lg px-4 py-2"
                onClick={ubahWaliKelas}>
                    <span>Ubah Wali Kelas</span>
                </button>
            </div>
            <div className="flex flex-col bg-white mx-6 h-full"
            style={{borderRadius: '0 0 10px 10px'}}>
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-8 lg:px-6">
                <div className={`overflow-y-auto slim-scroll ${DekstopLow? 'h-[355px]' : ''}`}>
                    <table className="min-w-full cursor-default">
                    <thead className="bg-blue-500 border border-1 border-gray-400"
                    style={{borderRadius: '10px 10px 0 0'}}>
                      <tr className="px-3 text-white">
                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                          No
                        </th>
                        <th scope="col" className="text-sm font-medium px-1 py-2 text-center ">
                          Nama
                        </th>
                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                          Email
                        </th>
                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                          No Hp
                        </th>
                      </tr>
                    </thead>
                        <tbody className="bg-white border-1 border rounded-full">
                        {dataMurid && dataMurid.length > 0 ? (
                            dataMurid.map((dataMurid, index) => (
                              <tr key={dataMurid.id} className="" style={{ borderRadius: '24px', border: '1px solid #D9D9D9' }}>
                                <td className="px-2 py-2 text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                                <td className="text-sm text-gray-900 font-light px-[-15px] py-2">
                                  <div className="flex flex-row space-x-1 w-24 px-0 mx-auto">
                                    <div style={{position: 'relative', display: 'inline-block'}}>
                                        <img className="w-10 h-10 mr-4 rounded-full object-cover" src={`data:image/png;base64,${dataMurid.bukti}`}
                                        onError={(e) => (e.target.src = "https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg")} alt="" />
                                    </div>
                                    <span className="items-center mt-3 font-inter font-medium text-sm">{dataMurid.nama}</span>
                                  </div>
                                </td>
                                <td className="text-sm text-gray-900 font-medium py-2 text-center">
                                  {dataMurid.email}
                                </td>
                                <td className="text-sm text-gray-900 font-medium py-2 text-center">
                                  {dataMurid.no_hp}
                                </td>
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
                </div>
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
            <div className="flex rounded-xl w-full border border-1 font-inter bg-[#D9D9D9] h-[90%]">
                <div className="flex flex-col w-full">
                    <div className="bg-blue-500 p-4 w-full flex justify-between items-center"
                    style={{borderRadius: '10px 10px 0 0'}}>
                        <div className="flex items-center space-x-2 text-white">
                            <MdClass className="w-12 h-12 bg-white rounded-full px-2 text-blue-500"/>
                            <span className="font-semibold text-lg font-inter">Kelas {dataKelas.kelas + " " + shortJurusan(dataKelas.namajurusan) + " " + dataKelas.sub_jurusan}</span>
                        </div>
                        <BiArrowBack className="w-12 h-12 rounded-full px-2 text-white"
                        onClick={() => navTo('/Siskoolbe/Admin/Admin_Jurusan')}/>
                    </div>
                    <div className="flex flex-col bg-white p-4 space-y-2 w-full">
                        <div className="relative">
                            <div className="flex space-x-3 items-center">
                                <input type="text" className="rounded-lg outline-1 outline px-2 py-1 text-black placeholder:text-gray-500" placeholder="Wali Kelas" 
                                value={searchGuru.nama}
                                onChange={handleSearchChange}/>
                                <span className="text-lg">Wali Kelas</span>
                            </div>
                            {searchResults.length > 0 ? (
                                <ul className="absolute z-10 bg-white rounded-lg shadow-lg mt-1 w-full">
                                {searchResults.map((result, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        onClick={() => {handleSelectGuru(result.id, result.nama)}}
                                    >
                                        {result.nama}
                                    </li>
                                ))}
                            </ul>
                            )  : (
                                <>
                                </>
                            )}
                        </div>
                        <button type="button" className="bg-green-500 text-white font-medium rounded-lg px-4 py-2"
                        onClick={ubahWaliKelas}>
                            <span>Ubah Wali Kelas</span>
                        </button>
                    </div>
                    <div className="w-full flex flex-col bg-white h-full p-1 border border-1 overflow-y-auto"
                    style={{borderRadius: '0 0 10px 10px'}}>
                        <div className="overflow-y-auto hide-scroll">
                            <div className="py-2 inline-block min-w-full sm:px-8 lg:px-6">
                                <div className={`overflow-y-auto slim-scroll`}>
                                    <table className="min-w-full cursor-default">
                                    <thead className="bg-blue-500 border border-1 border-gray-400"
                                    style={{borderRadius: '10px 10px 0 0'}}>
                                    <tr className="px-3 text-white">
                                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                                        No
                                        </th>
                                        <th scope="col" className="text-sm font-medium px-1 py-2 text-center ">
                                        Nama
                                        </th>
                                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                                        Email
                                        </th>
                                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                                        No Hp
                                        </th>
                                    </tr>
                                    </thead>
                                        <tbody className="bg-white border-1 border rounded-full">
                                        {dataMurid && dataMurid.length > 0 ? (
                                            dataMurid.map((dataMurid, index) => (
                                            <tr key={dataMurid.id} className="" style={{ borderRadius: '24px', border: '1px solid #D9D9D9' }}>
                                                <td className="px-2 py-2 text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                                                <td className="text-sm text-gray-900 font-light px-[-15px] py-2">
                                                <div className="flex flex-row space-x-1 w-24 px-0 mx-auto">
                                                    <div style={{position: 'relative', display: 'inline-block'}}>
                                                        <img className="w-10 h-10 mr-4 rounded-full object-cover" src={`data:image/png;base64,${dataMurid.bukti}`}
                                                        onError={(e) => (e.target.src = "https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg")} alt="" />
                                                    </div>
                                                    <span className="items-center mt-3 font-inter font-medium text-sm">{dataMurid.nama}</span>
                                                </div>
                                                </td>
                                                <td className="text-sm text-gray-900 font-medium py-2 text-center">
                                                {dataMurid.email}
                                                </td>
                                                <td className="text-sm text-gray-900 font-medium py-2 text-center">
                                                {dataMurid.no_hp}
                                                </td>
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
                            </div>
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
        )}
        </>
    )
}

export default AdminDetailKelas