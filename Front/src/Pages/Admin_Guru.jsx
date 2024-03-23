import React from "react";
import SidebarAdmin from "../components/SidebarAdm";
import { FaUserTie } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import CustomWidth from "../CustomWidth";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";

const AdminGuru = () => {
  const navTo = useNavigate();
  const Wmobile = CustomWidth() <= 767;
  const handleDelete = () => {
    Swal.fire({
      title: 'Yakin ingin menghapus murid?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna menekan OK
        Swal.fire(
          'Deleted!',
          'Murid telah dihapus.',
          'success'
        );
        // Tambahkan logika penghapusan di sini
      }
    });
  };

  const handleUpdates = () => {
    Swal.fire({

      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }


  return (
    <>

      {!Wmobile ? (
        <div className="flex flex-col h-screen w-[1130px] rounded-3xl bg-[#D9D9D9] mx-4">
          <div className="flex flex-row mt-12 space-x-2 mx-6">
            <FaUserTie className="w-12 h-12 bg-white rounded-full px-2" />
            <span className="font-semibold text-2xl font-inter mt-2">Murid</span>
          </div>
          <div className="flex flex-row w-auto mx-4">
            <div class="max-w-md mx-2 mt-20">
              <div class="relative flex w- h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-solid border-black">
                <div class="grid place-items-center h-full w-12 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  class="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search.." />
              </div>
            </div>
            <button className="flex flex-row bg-[#1E6CB1] w-40 h-10 ml-[650px] mt-20 items-center rounded-[10px]"
              onClick={() => navTo('/Siskoolbe/TambahGuru')}>
              <FaPlus className="ml-3" style={{ color: '#FFFF' }} />
              <span className="text-white mx-2 font-inter text-sm">Tambah Guru</span>
            </button>
          </div>
          <div className="flex flex-row mt-8 mx-8 space-x-32">
            <span className="font-semibold font-inter text-lg mt-2">No</span>
            <span className="font-semibold font-inter text-lg mt-2">Nama</span>
            <span className="font-semibold font-inter text-lg mt-2">Jabatan</span>
            <span className="font-semibold font-inter text-lg mt-2">Status</span>
            <span className="font-semibold font-inter text-lg mt-2">No Hp</span>
          </div>
          <div className="flex flex-row mt-5 mx-6 bg-white rounded-xl h-16 items-center w-auto">
            <span className="font-inter font-semibold text-xl mx-4">1</span>
            <div className="flex flex-row mx-16">
              <img className="w-12 h-12" src="https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" alt="" />
              <span className="font-inter font-semibold text-lg mx-3 mt-2">Username</span>
            </div>
            <span className="font-inter font-semibold text-lg ml-4 mt-2">Guru</span>
            <span className="font-inter font-semibold text-lg mx-36 mt-2">PNS</span>
            <span className="font-inter font-semibold text-lg pr-8 mt-2">081121120897</span>
            <div className="flex flex-row mx-12 space-x-5">
              <RiPencilFill className="w-8 h-8 bg-gray-400 bg-opacity-50 rounded-lg px-1 ml-auto" color="#1E6CB1" onClick={() => navTo('/Siskoolbe/Edit_Guru')} />
              <BsFillTrash3Fill className="w-8 h-8 bg-gray-400 bg-opacity-50 rounded-lg px-1 ml-auto" color="#FF0000" onClick={handleDelete} />
            </div>
          </div>
        </div>
      ) : (
        <>

        </>
      )}
    </>
  );
};
export default AdminGuru;
