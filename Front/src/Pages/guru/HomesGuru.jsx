import React, { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import CustomWidth from "../../CustomWidth";
import { Link, useNavigate } from "react-router-dom";
import "../Styling.css"
import _debounce from 'lodash/debounce';
import api from "../../api";

const HomesGuru = ({nama, token, WMobile, DekstopLow}) => {
  const navTo = useNavigate();
  const [dataAbsen, setDataAbsen] = useState([]);

  const getdataAbsen = _debounce(async () => {
    try{
      const resp = await api.get('/absenguru', {
        headers: {
          Authorization: `${token}`
        }
      })

      
      const newDataAbsen = resp.data.map(entry => {
        const tanggal = new Date(entry.tanggal);
        const tanggallokal = tanggal.toLocaleDateString();
        return {
          ...entry,
          tanggallokal
        }
      });

      setDataAbsen(newDataAbsen);
    }catch(err){ 
      console.log(err);
    }
  },60)

  const DateNow = () => {
      const date = new Date();
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
    getdataAbsen()
  }, []);

  return (
    <>
      {!WMobile ? (
        <div className="flex flex-col w-screen rounded-3xl pb-12 bg-[#D9D9D9] mx-4 font-inter">
          <div className="flex justify-between bg-white mt-12 mx-[120px] h-48"
          style={{borderRadius: '10px 10px 0 0'}}>
            <div className="flex flex-col">
              <span className="font-semibold font-inter text-lg mt-8 mx-6">Welcome {nama}</span>
              <span className="font-semibold text-[#AE9D9D] font-inter text-[20px] mt-6 mx-6">semangatmu adalah kunci untuk meraih impianmu! dengan absensi ini adalah bukti kedisiplinanmu</span>
            </div>
            <img className="w-52 ml-[140px] " src="https://i.pinimg.com/564x/f2/3d/95/f23d95272024a786778cf50db8fcc64b.jpg" alt="" />
          </div>
          <div className="flex bg-sky-700 mx-[120px] h-16 items-center px-4 py-2"
          style={{borderRadius: '0 0 10px 10px'}}>
            <svg className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="white" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"></path></svg>
            <span className="font-semibold font-inter text-lg text-white mx-2">SMKN 1 Depok, Gang Bhakti Suci No.100, Cimpaeun, Tapos, Kota Depok, Jawa Barat, 16459</span>
          </div>

          <div className="flex justify-between items-center bg-blue-500 py-2
          mx-[120px] mt-4 px-7"
          style={{borderRadius: '10px 10px 0 0'}}>
            <span className="lg:text-lg md:text-md sm:text-sm font-medium font-inter text-white">Absensi {DateNow()}</span>
            <span className="lg:text-lg md:text-md sm:text-sm my-2 font-medium font-inter text-white bg-red-600 py-2 px-12
            rounded-lg hover:cursor-pointer"
            onClick={() => navTo('/Siskoolbe/Guru/IzinGuru')}>Ajukan Izin</span>
          </div>

          <div className={`overflow-y-auto flex flex-col slim-scroll  ${DekstopLow ? 'h-[280px]' : 'h-[90%]'}`}>
          {dataAbsen.map((entry, index) => (  
              <div className="flex bg-white mx-[120px] justify-between h-20" key={index}
              style={{borderBottom: '1px solid #D9D9D9'}}>
                <div className="flex flex-col items-center justify-center bg-[#05FF00] bg-opacity-60 mx-6 px-6 w-[100px] rounded-2xl py-1 h-14 mt-3">
                  <span className="font-inter font-semibold text-[16px] text-slate-950">{new Date(entry.tanggal).toLocaleDateString("id-ID", { day: 'numeric' })}</span>
                  <span className="font-inter font-semibold text-[16px] text-slate-950">{new Date(entry.tanggal).toLocaleDateString("id-ID", { weekday: 'long' })}</span>
                </div>
                {/* Absen */}
                <div className="flex mx-6">
  
                  {entry.status !== 'closed' ? (
                  <>
                  {/* Absen Masuk */}
                  {entry.absen_masuk === '' || !entry.absen_masuk ? (
                  <div className="outline outline-1 outline-[#269400] p-2 rounded-2xl
                  py-1 px-6 mx-2 my-3 items-center flex flex-col cursor-pointer hover:bg-gray-100"
                    onClick={() => navTo('./AbsenMasuk/' + entry.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"
                      color="#269400"><path fill="currentColor"
                        d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19q-26 0-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z">
                      </path></svg>
                    <span className="font-inter font-bold text-lg text-[#269400]">Masuk</span>
                  </div>
                  ) : (
                  <div className="p-2 rounded-2xl py-1 px-6 mx-2 my-3 items-center flex flex-col">
                    <span className="font-inter font-bold text-lg text-[#269400]">Masuk</span>
                    <span className="font-inter font-bold text-lg text-[#269400]">
                      {new Date(entry.absen_masuk).toLocaleString("id-ID", {hour: '2-digit', minute: '2-digit'})}
                    </span>
                  </div>
                  )}
  
                  <span className="text-5xl font-thin mt-4 mx-1">|</span>
  
                  {/* Absen Keluar */}
                  {entry.absen_masuk === '' || !entry.absen_masuk  ? (
                    <>
                    <div className="outline outline-1 outline-[#706e67] p-2 rounded-2xl py-1 px-6 mx-2 my-3 items-center flex flex-col">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"
                        color="#706e67"><path fill="currentColor"
                          d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19q-26 0-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z">
                        </path></svg>
                      <span className="font-inter font-bold text-lg text-[#706e67]">Keluar</span>
                    </div>
                    </>
                  ) : entry.absen_keluar === '' || !entry.absen_keluar ? (
                    <>
                    <div className="outline outline-1 outline-[#ff1100] p-2 rounded-2xl py-1 px-6 mx-2 my-3 items-center flex flex-col cursor-pointer hover:bg-gray-100"
                    onClick={() => navTo('./AbsenKeluar/' +  entry.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"
                        color="#ff1100"><path fill="currentColor"
                          d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19q-26 0-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z">
                        </path></svg>
                      <span className="font-inter font-bold text-lg text-[#ff1100]">Keluar</span>
                    </div>
                    </>
                  ) : (
                    <>
                    <div className="p-2 rounded-2xl py-1 px-6 mx-2 my-3 items-center flex flex-col">
                      <span className="font-inter font-bold text-lg text-[#ff1100]">Keluar</span>
                      <span className="font-inter font-bold text-lg text-[#ff1100]">
                        {new Date(entry.absen_keluar).toLocaleString("id-ID", {hour: '2-digit', minute: '2-digit'})}
                      </span>
                    </div>
                    </>
                  )}
                  
                  </>
                  ) : (
                  <>
                  {entry.izin === 'sakit' || entry.izin === 'keterangan' ? (
                    <div className="p-2 rounded-2xl py-2 px-6 mx-2 my-4 items-center flex flex-col 
                    bg-[#ffec1c] justify-center cursor-pointer" 
                    onClick={() => navTo(`/Siskoolbe/Guru/Absen/${entry.id}`)}>
                      <span className="font-inter font-bold text-lg text-white">Izin</span>
                    </div>
                  ) : null}
                  <div className="p-2 rounded-2xl py-1 px-6 mx-2 my-3 items-center flex flex-col">
                    <span className="font-inter font-bold text-lg text-[#269400]">Masuk</span>
                    <span className="font-inter font-bold text-lg text-[#269400]">
                      {!entry.absen_masuk || entry.absen_masuk === '' ? '--' : new Date(entry.absen_masuk).toLocaleString("id-ID", {hour: '2-digit', minute: '2-digit'})}
                    </span>
                  </div>
  
                  <span className="text-5xl font-thin mt-4 mx-1">|</span>
  
                  <div className="p-2 rounded-2xl py-1 px-6 mx-2 my-3 items-center flex flex-col">
                    <span className="font-inter font-bold text-lg text-[#ff1100]">Keluar</span>
                    <span className="font-inter font-bold text-lg text-[#ff1100]">
                      {!entry.absen_keluar || entry.absen_keluar === '' ? '--' : new Date(entry.absen_keluar).toLocaleString("id-ID", {hour: '2-digit', minute: '2-digit'})}
                    </span>
                  </div>
                  </>
                  )}
                </div>
              </div>
              ))}
          </div>
        </div>
      ) : (
        <>
           <div className="flex flex-col w-full bg-[#D9D9D9] h-[85%] pb-12 rounded-2xl">
              <div className="flex flex-row bg-white mx-3 mt-4 py-4"
              style={{borderRadius: '10px 10px 0 0'}}>
                <div className="flex flex-col">
                  <span className="font-[600] font-inter text-sm mx-4">Selamat Datang, {nama}</span>
                  <span className="font-semibold font-inter text-[12px] mt-2 mx-4">semangatmu adalah kunci untuk meraih impianmu! dengan absensi ini adalah bukti kedisiplinanmu</span>
                </div>
                {/* <img className="w-24 h-24 mt-4" src="https://i.pinimg.com/564x/f2/3d/95/f23d95272024a786778cf50db8fcc64b.jpg" alt="" /> */}
              </div>

              <div className="flex flex-row bg-sky-700 mx-3 h-12 rounded-xl items-center px-4 py-2"
              style={{borderRadius: '0 0 10px 10px'}}>
                <svg className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="white" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"></path></svg>
                <span className="font-semibold font-inter text-[10px] text-white mx-2">SMKN 1 Depok, Gang Bhakti Suci No.100, Cimpaeun, Tapos, Kota Depok, Jawa Barat, 16459</span>
              </div>

              <span className="text-base mt-4 font-semibold font-inter text-black mx-3">Absensi {DateNow()}</span>
              <span className="lg:text-lg md:text-md sm:text-sm my-2 mx-3 font-medium font-inter text-red-500 bg-white border border-1 border-red-500 py-2 px-4
                rounded-lg hover:cursor-pointer focus:outline-none active:bg-red-500"
                onClick={() => navTo('/Siskoolbe/Guru/IzinGuru')}>
                  Ajukan Izin
              </span>

              <div className="overflow-y-auto mt-2">
                {dataAbsen.map((entry, index) => (
                <>
                  <div className="flex bg-white mt-2 justify-between mx-3 h-16 rounded-xl overflow-y-auto slim-scroll">
                    <div className="flex flex-col rounded-lg items-center justify-center bg-opacity-60 bg-[#05FF00] w-20 mx-3 px-6 h-12 my-auto">
                      <span className="font-inter font-semibold text-[12px] text-slate-950">{new Date(entry.tanggal).toLocaleDateString("id-ID", { day: 'numeric' })}</span>
                      <span className="font-inter font-semibold text-[12px] text-slate-950">{new Date(entry.tanggal).toLocaleDateString("id-ID", { weekday: 'long' })}</span>
                    </div>

                    {/* Absen */}
                    <div className="flex mx-1">
                      {entry.status !== 'closed' ? (
                        <>
                        {/* Absen Masuk */}
                        {!entry.absen_masuk || entry.absen_masuk === '' ? (
                          <div className="outline outline-1 outline-[#269400] 
                          justify-center items-center flex flex-col rounded-lg cursor-pointer w-16 px-4 h-12 my-auto hover:bg-gray-100"
                          onClick={() => navTo('./AbsenMasuk/'+entry.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"
                            color="#269400"><path fill="currentColor"
                              d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19q-26 0-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z">
                            </path></svg>
                            <span className="font-inter font-bold text-[12px] text-[#269400]">Masuk</span>
                          </div>
                        ) : (
                          <div className="py-1 px-4 h-12 my-auto items-center flex flex-col">
                            <span className="font-inter font-bold text-[12px] text-[#269400]">Masuk</span>
                            <span className="font-inter font-bold text-[12px] text-[#269400]">
                              {new Date(entry.absen_masuk).toLocaleString("id-ID", {hour: '2-digit', minute: '2-digit'})}
                            </span>
                          </div>
                        )}

                        {/* <span className="text-5xl font-thin mt-4 mx-1">|</span> */}

                        {!entry.absen_masuk || entry.absen_masuk === '' ? (
                          <div className="outline outline-1 outline-[#706e67]
                          justify-center items-center flex flex-col rounded-lg cursor-pointer w-16 ml-2 mr-1 px-4 h-12 my-auto hover:bg-gray-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"
                            color="#706e67"><path fill="currentColor"
                              d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19q-26 0-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z">
                            </path></svg>
                            <span className="font-inter font-bold text-[12px] text-[#706e67]">Keluar</span>
                          </div>
                        ) : entry.absen_keluar === '' || !entry.absen_keluar ? (
                          <div className="outline outline-1 outline-[#ff1100]
                          justify-center items-center flex flex-col rounded-lg cursor-pointer w-16 ml-2 mr-1 px-4 h-12 my-auto hover:bg-gray-100"
                          onClick={() => navTo('./AbsenKeluar/'+entry.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"
                            color="#ff1100"><path fill="currentColor"
                              d="M1600 896q40 0 75 15t61 41t41 61t15 75v384q0 119-45 224t-124 183t-183 123t-224 46q-144 0-268-55t-226-156l-472-472q-28-28-43-65t-15-76q0-42 16-78t43-64t63-42t78-16q82 0 141 59l107 106V853q-59-28-106-70t-80-95t-52-114t-18-126q0-93 35-174t96-143t142-96T832 0q93 0 174 35t143 96t96 142t35 175q0 93-37 178t-105 149q35 9 63 30t49 52q45-25 94-25q50 0 93 23t69 66q45-25 94-25M512 448q0 75 34 143t94 113V448q0-40 15-75t41-61t61-41t75-15q40 0 75 15t61 41t41 61t15 75v256q60-45 94-113t34-143q0-66-25-124t-69-101t-102-69t-124-26q-66 0-124 25t-102 69t-69 102t-25 124m1152 640q0-26-19-45t-45-19q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-37 0-50-23t-16-60t2-77t2-77t-15-59t-51-24q-34 0-47 19t-16 47t-1 62t0 61t-16 48t-48 19q-26 0-45-19t-19-45V448q0-26-19-45t-45-19q-26 0-45 19t-19 45v787q0 23-8 42t-23 35t-35 23t-42 9q-22 0-42-8t-37-24l-139-139q-21-21-50-21t-50 21t-22 51q0 29 21 50l472 473q84 84 184 128t219 45q93 0 174-35t142-96t96-142t36-175z">
                            </path></svg>
                            <span className="font-inter font-bold text-[12px] text-[#ff1100]">Keluar</span>
                          </div>
                        ) : (
                          <div className="py-1 px-4 h-12 my-auto items-center flex flex-col">
                            <span className="font-inter font-bold text-[12px] text-[#ff1100]">Keluar</span>
                            <span className="font-inter font-bold text-[12px] text-[#ff1100]">
                              {new Date(entry.absen_masuk).toLocaleString("id-ID", {hour: '2-digit', minute: '2-digit'})}
                            </span>
                          </div>
                        )}
                        </>
                      ) : (
                        <>
                        {entry.izin === 'sakit' || entry.izin === 'keterangan' ? (
                          <div className="p-2 rounded-xl flex flex-col bg-[#ffec1c] justify-center
                          cursor-pointer h-10 px-4 mx-2 my-auto"
                          onClick={() => navTo(`/Siskoolbe/Guru/Absen/${entry.id}`)}>
                            <span className="font-inter font-bold text-white text-[12px]">Izin</span>
                          </div>
                        ) : null}

                        <div className="py-1 px-4 h-12 my-auto items-center flex flex-col">
                            <span className="font-inter font-bold text-[12px] text-[#269400]">Masuk</span>
                            <span className="font-inter font-bold text-[12px] text-[#269400]">
                            {!entry.absen_masuk || entry.absen_masuk === '' ? '--' : new Date(entry.absen_masuk).toLocaleString("id-ID", {hour: '2-digit', minute: '2-digit'})}
                          </span>
                        </div>
                        
                        <div className="py-1 px-4 h-12 my-auto items-center flex flex-col">
                            <span className="font-inter font-bold text-[12px] text-[#ff1100]">Keluar</span>
                            <span className="font-inter font-bold text-[12px] text-[#ff1100]">
                              {!entry.absen_keluar || entry.absen_keluar === '' ? '--' : new Date(entry.absen_masuk).toLocaleString("id-ID", {hour: '2-digit', minute: '2-digit'})}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

            
                  </div>
                </>
                ))}
              </div>
              

            </div>
        </>
      )}
    </>
  );
};

export default HomesGuru;