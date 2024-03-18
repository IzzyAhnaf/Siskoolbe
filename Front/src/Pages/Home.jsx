import React from "react";
import { IoMdSettings } from "react-icons/io";
import CustomWidth from "../CustomWidth";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Styling.css"
import Mnvbar from "../components/MNavbar";

const Homes = (props) => {
  const WMobile = CustomWidth() <= 767;
  const navTo = useNavigate();

  return (
    <>
      {!WMobile ? (          
          <div className="flex flex-col w-screen rounded-3xl bg-[#D9D9D9] mx-6 mt-2">
            <div className="flex flex-row bg-white mt-12 mx-[120px] h-48 rounded-3xl">
              <div className="flex flex-col">
                <span className="font-semibold font-inter text-lg mt-8 mx-6">Welcome Username</span>
                <span className="font-semibold font-inter text-[20px] mt-6 mx-6 w-[500px]">semangatmu adalah kunci untuk meraih impianmu! dengan absensi ini adalah bukti kedisiplinanmu</span>
              </div>
              <img className="w-64 ml-auto" src="https://i.pinimg.com/564x/f2/3d/95/f23d95272024a786778cf50db8fcc64b.jpg" alt="" />
            </div>
            <div className="flex bg-sky-700 mt-4 mx-[120px] h-16 rounded-3xl items-center px-4 py-2 ">
              <svg className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="white" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"></path></svg>
              <span className="font-semibold font-inter text-lg text-white mx-2">SMKN 1 Depok, Gang Bhakti Suci No.100, Cimpaeun, Tapos, Kota Depok, Jawa Barat, 16459</span>
            </div>
            <span className="text-xl mt-8 font-medium font-inter text-black mx-32">Absensi Senin 11 Maret 2024</span>
            <div className="flex bg-white mt-2 mx-[120px] justify-between h-20 rounded-3xl">
              <div className="flex flex-col items-center justify-center bg-[#05FF00] bg-opacity-60 mx-6 px-6 rounded-2xl py-1 h-14 mt-3">
                <span className="font-inter font-semibold text-[16px] text-slate-950">1</span>
                <span className="font-inter font-semibold text-[16px] text-slate-950">Senin</span>
              </div>
              {/* Absen */}
              <div className="flex mx-6">
                <div className="outline outline-1 outline-[#269400] p-2 rounded-2xl py-1 px-6 mx-2 my-3 items-center flex flex-col cursor-pointer"
                onClick={() => navTo('./AbsenMasuk')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"
                  color="#269400"><path fill="currentColor" 
                  d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19q-26 0-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z">
                  </path></svg>
                  <span className="font-inter font-bold text-lg text-[#269400]">Masuk</span>
                </div>
                <span className="text-5xl font-thin mt-2 mx-1">|</span>
                <div className="outline outline-1 outline-[#ff1100] p-2 rounded-2xl py-1 px-6 mx-2 my-3 items-center flex flex-col cursor-pointer"
                onClick={() => navTo('./AbsenKeluar')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"
                  color="#ff1100"><path fill="currentColor" 
                  d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19q-26 0-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z">
                  </path></svg>
                  <span className="font-inter font-bold text-lg text-[#ff1100]">Keluar</span>
                </div>
              {/* ===== */}
              </div>
              {/* ===== */}
            </div>
          </div>
      ) : (
        <>
          <div className="flex flex-col w-full">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <span className="font-semibold font-inter text-xl mt-6 mx-6">Ilham</span>
                <span className="font-semibold font-inter text-lg mt-2 mx-6">Student</span>
              </div>
              <img className="w-20 h-20 mt-2 ml-36" src="https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" alt="" />
              <IoMdSettings className="absolute ml-80 mt-2 w-6 h-6" onClick={() => navTo('./Profile')} />
            </div>
            <div className="flex flex-col w-screen rounded-3xl bg-[#D9D9D9] pb-12 mt-4 ml-[-10px]">
              <div className="flex flex-row bg-white mt-4 w-[315px] mx-6 h-32 rounded-3xl">
                <div className="flex flex-col">
                  <span className="font-[600] font-inter text-sm mt-4 mx-4">Wellcome Username</span>
                  <span className="font-semibold font-inter text-[12px] mt-2 mx-4 w-[180px]">semangatmu adalah kunci untuk meraih impianmu! dengan absensi ini adalah bukti kedisiplinanmu</span>
                </div>
                <img className="w-24 h-24 mt-4 ml-[-20px]" src="https://i.pinimg.com/564x/f2/3d/95/f23d95272024a786778cf50db8fcc64b.jpg" alt="" />
              </div>
              <div className="flex flex-row bg-sky-700 mt-4 w-[315px] mx-6 h-12 rounded-3xl items-center px-4 py-2 ">
                <svg className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="white" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"></path></svg>
                <span className="font-semibold font-inter text-[10px] text-white mx-2">SMKN 1 Depok, Gang Bhakti Suci No.100, Cimpaeun, Tapos, Kota Depok, Jawa Barat, 16459</span>
              </div>
              <span className="text-base mt-4 font-semibold font-inter text-black mx-6">Absensi Senin 11 Maret 2024</span>
              <div className="flex flex-row bg-white mt-2 w-[315px] mx-6 h-16 rounded-xl">
                <div className="flex flex-col items-center justify-center bg-[#05FF00] bg-opacity-60 mx-3 px-4 rounded-xl py-1 h-12 mt-2">
                  <span className="font-inter font-semibold text-[12px] text-slate-950">1</span>
                  <span className="font-inter font-semibold text-[12px] text-slate-950">Senin</span>
                </div>
                <button className="flex flex-col items-center justify-center mt-3 bg-slate-400 bg-opacity-50 rounded-xl px-3 h-11 py-1 border-solid border-[#269400] border-[3px]  ml-16 hover:underline" onClick={() => navTo('./AbsenMasuk')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="#269400" d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19q-26 0-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z"></path></svg>
                  <span className="font-inter font-semibold text-[10px] text-[#269400]">masuk</span>
                </button>
                <span className="text-5xl font-thin mt-1 mx-3">|</span>
                <div className="flex flex-col items-center justify-center ">
                  <span className="font-inter font-bold text-xs text-[#FF0000]">Keluar</span>
                  <span className="font-inter font-bold text-xs text-[#FF0000] mt-2">-- --</span>
                </div>
              </div>
            </div>
          </div>
          <div>
          </div>
        </>
      )}
    </>
  );
};

export default Homes;
