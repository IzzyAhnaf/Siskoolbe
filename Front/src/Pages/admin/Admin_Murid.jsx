import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaUserTie, FaPlus } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import CustomWidth from "../../CustomWidth";
import { BsFillTrash3Fill } from "react-icons/bs";
import _debounce from "lodash/debounce";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const AdminMurid = () => {
  const navTo = useNavigate();
  const Wmobile = CustomWidth() <= 767;
  const DekstopLow = CustomWidth() <= 1366;
  const [siswa, setSiswa] = useState([]);
  
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = 10;

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Yakin ingin menghapus murid?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resp = await api.post(`/deleteSiswa_Admin/${id}`);
          if(resp.status === 200){
            Swal.fire(
              'Deleted!',
              'Murid telah dihapus.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          }else{
            Swal.fire(
              'Failed!',
              'Murid gagal dihapus.',
              'error'
            );
          }
        } catch (err) {
          console.error("Failed to delete murid:", err);
          Swal.fire(
            'Failed!',
            'Murid gagal dihapus.',
            'error'
          );
        }
      }
    });
  };

  const handleKeyword = async (e) => {
    try{
      await api.get(`/getSiswa_Admin/Search?keyword=${e.target.value}`).then((res) => {
        setSiswa(res.data.data);
        setTotalData(res.data.Length);
      });
    }catch(err){
      setGuru([]);
      setTotalData(0);
    }
  }

  const handleNext = () => {
    if(currentPage < Math.ceil(totalData / limitPerPage)) {
      const newOffset = currentPage * limitPerPage;
      setCurrentPage(prevPage => prevPage + 1);
      getSiswa(newOffset);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const newOffset = (currentPage - 2) * limitPerPage;
      setCurrentPage(prevPage => prevPage - 1);
      getSiswa(newOffset);
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

  const shortName = (name) => {
    if(name.length > 7){
      return name.substring(0, 7) + "..."
    }else{
      return name
    }
  }


  const getSiswa = _debounce(async (offset) => {
    try {
      const resp = await api.get("/getSiswa_Admin?offset=" + offset);
      if (resp.status === 200) {
        setSiswa(resp.data.data);
        setTotalData(resp.data.Length);
      }
    } catch (err) {
      setGuru([]);
      setTotalData(0);
    }
  }, 50);

  useEffect(() => {
    getSiswa(0);
  }, []);

  return (
    <>
{!Wmobile ? (
      <div className={`flex flex-col w-full font-inter h-full`}>
        <div className={`flex flex-col h-full bg-[#D9D9D9] mx-4 rounded-3xl py-8`}>
          <div className="flex space-x-2 mx-6 lg:px-6 sm:px-7 bg-blue-500 py-4 text-white"
          style={{borderRadius: '10px 10px 0 0'}}>
            <FaUserTie className="w-12 h-12 bg-white rounded-full px-2 text-blue-500" />
            <span className="font-semibold text-2xl font-inter mt-2">Murid</span>
          </div>
          <div className="flex justify-between mx-6 sm:px-8 lg:px-7 bg-white py-4">
            <div className="max-w-md flex">
              <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg  bg-white overflow-hidden border-2 border-solid border-black">
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
            <button onClick={() => navTo('/Siskoolbe/Admin/TambahMurid')} className="flex bg-[#1E6CB1] w-40 h-10 items-center justify-center rounded-[10px]">
              <FaPlus className="" style={{ color: '#FFFF' }} />
              <span className="text-white border-0  mx-2 font-inter text-sm">Tambah Murid</span>
            </button>
          </div>
          <div className="flex flex-col bg-white mx-6 h-full"
          style={{borderRadius: '0 0 10px 10px'}}>
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5 h-full mb-8">
              <div className="py-2 inline-block min-w-full sm:px-8 lg:px-6">
                <div className={`overflow-y-auto slim-scroll ${DekstopLow? 'h-[355px]' : ''}`}>
                  <table className="min-w-full">
                    <thead className="bg-blue-500 border border-1 border-gray-400"
                    style={{borderRadius: '10px 10px 0 0'}}>
                      <tr className="px-3 text-white">
                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                          No
                        </th>
                        <th scope="col" className="text-sm font-medium px-1 py-2 text-center ">
                          Nama
                        </th>
                        <th scope="col" className="text-sm font-medium px-0 py-3 text-center ">
                          Kelas
                        </th>
                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                          Jurusan
                        </th>
                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                          No Hp
                        </th>
                        <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                          Opsi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white border-1 border rounded-full">
                    {siswa && siswa.length > 0 ? (
                      siswa.map((siswaItem, index) => (
                        <tr key={siswaItem.id} className="border border-1" style={{ borderRadius: '24px' }}>
                          <td className="px-2 py-2 text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                          <td className="text-sm text-gray-900 font-light px-[-15px] py-2">
                            <div className="flex space-x-1 w-24 px-0 mx-auto">
                              <div style={{position: 'relative', display: 'inline-block'}}>
                                <img className="w-10 h-10 mr-4 rounded-full object-cover" 
                                src={`data:image/png;base64,${siswaItem.gambar_profil}`}
                                onError={(e) => (e.target.src = "https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg")} alt="" />
                              </div>
                              <span className="items-center mt-3 font-inter font-medium text-sm">{siswaItem.nama}</span>
                            </div>
                          </td>
                          <td className="text-sm text-gray-900 font-medium py-2 text-center">
                            {siswaItem.kelas}
                          </td>
                          <td className="text-sm text-gray-900 font-medium py-2 text-center">
                            {siswaItem.jurusan} {siswaItem.sub_jurusan}
                          </td>
                          <td className="text-sm text-gray-900 font-medium px-2 py-2 text-center">
                            {siswaItem.no_hp}
                          </td>
                          <td className="text-sm text-gray-900 font-medium px-4 py-2 space-x-0">
                            <div className="flex justify-center">
                              <RiPencilFill className="w-7 h-7 bg-gray-400 bg-opacity-50 rounded-lg px-1" color="#1E6CB1" onClick={() => navTo(`/Siskoolbe/Admin/Edit_Murid/${siswaItem.id}`)} />
                              <BsFillTrash3Fill className="w-7 h-7 bg-gray-400 bg-opacity-50 rounded-lg px-1 ml-2" color="#FF0000" onClick={() => handleDelete(siswaItem.id)} />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-2 text-center">Data Kosong</td>
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
        <div className="flex rounded-xl w-full h-[90%] bg-[#D9D9D9] border border-1 font-inter">
          <div className="flex flex-col w-full">
            <div className="bg-blue-500 p-4 w-full flex justify-between items-center"
            style={{borderRadius: '10px 10px 0 0'}}>
              <div className="flex space-x-2 items-center">
                <FaUserTie className='text-white text-[24px] rounded-full' />
                <span className="text-white font-semibold text-xl">Admin Murid</span>
              </div>
            </div>
            <div className="flex flex-col sm:px-8 lg:px-7 bg-white p-4 space-y-2 w-full">
              <div className="max-w-md flex">
                <div className="relative flex w-full h-12 rounded-lg focus-within:shadow-lg  bg-white overflow-hidden border-2 border-solid border-black">
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
              <button onClick={() => navTo('/Siskoolbe/Admin/TambahMurid')} className="flex bg-[#1E6CB1] w-full h-8 items-center justify-center rounded-[8px]">
                <FaPlus className="" style={{ color: '#FFFF' }} />
                <span className="text-white border-0 mx-2 font-inter text-sm">Tambah Murid</span>
              </button>
            </div>
            <div className="w-full flex flex-col bg-white h-full p-1 border border-1 overflow-y-auto"
            style={{borderRadius: '0 0 10px 10px'}}>
              <div className="overflow-y-auto hide-scroll">
              <table className="min-w-full border border-1">
                <thead className="bg-blue-500"
                  style={{borderRadius: '10px 10px 0 0'}}>
                  <tr className="text-white px-3">
                    <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                      No
                    </th>
                    <th scope="col" className="text-sm font-medium px-1 py-2 text-center ">
                      Nama - Kelas dan Jurusan
                    </th>
                    <th scope="col" className="text-sm font-medium px-2 py-2 text-center">
                      Opsi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {siswa && siswa.length > 0 ? (
                    siswa.map((data, index) => (
                      <tr key={data.id} className="border border-1" style={{ borderRadius: '24px' }}>
                        <td className="px-2 py-2 text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                        <td className="px-1 py-2 text-sm font-medium text-gray-900 text-center">{shortName(data.nama)} - {data.kelas} {shortJurusan(data.jurusan)} {data.sub_jurusan}</td>
                        <td className="text-sm text-gray-900 font-medium px-4 py-2 space-x-0">
                            <div className="flex justify-center">
                              <RiPencilFill className="w-7 h-7 bg-gray-400 bg-opacity-50 rounded-lg px-1" color="#1E6CB1" 
                              onClick={() => navTo(`/Siskoolbe/Admin/Edit_Murid/${data.id}`)} />
                              <BsFillTrash3Fill className="w-7 h-7 bg-gray-400 bg-opacity-50 rounded-lg px-1 ml-2" color="#FF0000" 
                              onClick={() => handleDelete(data.id)} />
                            </div>
                          </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-2 px-4">
                        Data Kosong
                      </td>
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
  );
};
export default AdminMurid;