import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/SidebarAdm";
import { FaUserTie } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import Swal from 'sweetalert2';
import CustomWidth from "../CustomWidth";
import { useNavigate } from "react-router-dom";
import { BsFillTrash3Fill } from "react-icons/bs";
import _debounce from "lodash/debounce";
import api from "../api";

const AdminMurid = () => {
  const navTo = useNavigate();
  const Wmobile = CustomWidth() <= 767;
  const [siswa, setSiswa] = useState([]);
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
        Swal.fire(
          'Deleted!',
          'Murid telah dihapus.',
          'success'
        );
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

  const getSiswa = _debounce(async () => {
    try{
    const resp = await api.get("/getSiswa_Admin");
    resp.status === 200 && setSiswa(resp.data);
    }catch(err){

    }
  }, 50)

  useEffect(() => {
    getSiswa();
  },[])

  return (
    <>
{!Wmobile ? (
      <div className="flex flex-col h-screen w-full font-inter">

        <div className="flex flex-col item-centers h-screen bg-[#D9D9D9] mx-4 rounded-3xl">
          <div className="flex mt-12 space-x-2 mx-6 lg:px-6 sm:px-7">
            <FaUserTie className="w-12 h-12 bg-white rounded-full px-2" />
            <span className="font-semibold text-2xl font-inter mt-2">Murid</span>
          </div>
          <div className="flex justify-between sm:px-8 lg:px-7  w-auto mx-4">
            <div class="max-w-md mx-2 mt-20">
              <div class="relative flex w-full h-12 rounded-lg focus-within:shadow-lg  bg-white overflow-hidden border-2 border-solid border-black">
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
            <button onClick={() => navTo('/Siskoolbe/Admin/TambahMurid')} className="flex bg-[#1E6CB1] w-40 h-10 ml-[150px] mt-20 items-center rounded-[10px]">
              <FaPlus className="ml-3" style={{ color: '#FFFF' }} />
              <span className="text-white border-0  mx-2 font-inter text-sm">Tambah Murid</span>
            </button>
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-8 lg:px-10">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="">
                      <tr className="px-3">
                        <th scope="col" class="text-sm font-medium text-gray-900 px-2 py-2 text-center">
                          No
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-1 py-2 text-center ">
                          Nama
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-0 py-3 text-center ">
                          Kelas
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-2 py-2 text-center">
                          Jurusan
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-2 py-2 text-center">
                          No Hp
                        </th>
                        <th scope="col" class="text-sm font-medium text-gray-900 px-2 py-2 text-center">

                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white border-1  rounded-full">
                    {siswa && siswa.length > 0 ? (
                        siswa.map((siswa, index) => (
                      <tr class="" style={{ borderRadius: '24px' }}>
                        <td class="px-2 py-2 text-sm font-medium text-gray-900 text-center">{index + 1}</td>
                        <td class="text-sm text-gray-900 font-light px-[-15px] py-2">
                          <div className="flex flex-row space-x-1 w-24 px-0 mx-auto">
                            <img className="w-12 h-12 right-12 mr-4" src="https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" alt="" />
                            <span className="items-center mt-3 font-inter font-medium text-sm">{siswa.nama}</span>
                          </div>
                        </td>
                        <td class="text-sm text-gray-900 font-medium px-0 py-2 text-center">
                          Kepala Program
                        </td>
                        <td class="text-sm text-gray-900 font-medium px-2 py-2 text-center">
                          PNS
                        </td>
                        <td class="text-sm text-gray-900 font-medium px-2 py-2 text-center">
                          087723263759
                        </td>
                        <td class="text-sm text-gray-900 font-medium px-4 py-2 space-x-0">
                          <div className="flex justify-center">
                            <RiPencilFill className="w-7 h-7 bg-gray-400 bg-opacity-50 rounded-lg px-1" color="#1E6CB1" />
                            <BsFillTrash3Fill className="w-7 h-7 bg-gray-400 bg-opacity-50 rounded-lg px-1 ml-2" color="#FF0000" />
                          </div>
                        </td>
                      </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={'6'} className="px-4 py-2 text-center">Data Kosong</td>
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
  );
};
export default AdminMurid;