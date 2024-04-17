import { useNavigate, useParams } from "react-router-dom";
import CustomWidth from "../../CustomWidth";
import { useState, useEffect } from "react";
import _debounce from "lodash/debounce";
import { MdClass } from "react-icons/md";
import api from "../../api";
import Swal from "sweetalert2";

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
    

    const handleSelectGuru = (id, nama) => {
        setSearchGuru({ id, nama });
        setSearchResults([]);
        console.log({ id, nama });
    };

    const getData = _debounce(async () => {
        try{
            const resp = await api.get('/getDetailKelas/' + id)
            setDataKelas(resp.data.resp)
            setDataMurid(resp.data.resp2data)
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
        getData()
    }, [])

    useEffect(() => {
        if (searchGuru.length === 0 && searchResults.length > 0) {
            setSearchResults([]); 
        }
    }, [searchGuru]);

    return(
        <>
         {!WMobile ? (
        <div className="flex flex-col w-full font-inter">
        <div className={`flex flex-col item-centers h-screen bg-[#D9D9D9] mx-4 rounded-3xl`}>
            <div className="flex mt-12 space-x-4 mx-6 lg:px-6 sm:px-7">
                <MdClass className="w-12 h-12 bg-white rounded-full px-2" />
                <span className="font-semibold text-2xl font-inter mt-2">Kelas {dataKelas.kelas + " " + dataKelas.namajurusan + " " + dataKelas.sub_jurusan}</span>
            </div>
            <div className="flex justify-between mt-14 lg:px-10 sm:px-8 items-center">
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
            <div className="flex flex-col mt-4">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-8 lg:px-10">
                <div className="overflow-hidden">
                    <table className="min-w-full cursor-default">
                    <thead className="">
                      <tr className="px-3">
                        <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-2 text-center">
                          No
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-1 py-2 text-center ">
                          Nama
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-2 text-center">
                          Email
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-2 py-2 text-center">
                          No Hp
                        </th>
                      </tr>
                    </thead>
                        <tbody className="bg-white border-1 rounded-full">
                        {dataMurid && dataMurid.length > 0 ? (
                            dataMurid.map((dataMurid, index) => (
                              <tr key={dataMurid.id} className="" style={{ borderRadius: '24px' }}>
                                <td className="px-2 py-2 text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                                <td className="text-sm text-gray-900 font-light px-[-15px] py-2">
                                  <div className="flex flex-row space-x-1 w-24 px-0 mx-auto">
                                    <img className="w-12 h-12 right-12 mr-4 rounded-full" src={`data:image/png;base64,${dataMurid.bukti}`}
                                    onError={(e) => (e.target.src = "https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg")} alt="" />
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