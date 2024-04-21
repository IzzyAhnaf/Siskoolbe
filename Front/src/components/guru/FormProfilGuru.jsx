import React, { useState } from 'react';
import "../Styling.css"
import CustomWidth from '../../CustomWidth';
import formatDate from '../../formattedDate';


const FormProfGuru = ({nama, email, alamat, nik, no_hp, jenis_kelamin, tempat_lahir, tgl_lahir, agama, status, handleInputChange, update}) => {

    const WMobile = CustomWidth() <= 767;

    const DateBorn = () => {
        const date = new Date(tgl_lahir);
        const year = date.getFullYear();
        const monthNamesIndonesia = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const monthIndex = date.getMonth();
        const month = monthNamesIndonesia[monthIndex];
        const day = date.getDate();

        return `${day}, ${month} ${year}`;
    }

    return (
        <>
            {!WMobile ? (
                <form className="w-full overflow-y-auto slim-scroll mx-auto bg-white p-4 font-inter"
                style={{borderRadius: '0 0 10px 10px'}}>
                    <div className=''>
                        <div className="mb-4 flex w-full space-x-2">
                            <div className='mt-4 w-full'>
                                <label htmlFor="nama" className="block text-sm ">
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={nama}
                                    onChange={handleInputChange}
                                    className="w-full flex border-1 border border-black rounded-md bg-transparent px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:outline-0 focus:ring-0 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                            <div className='mt-4 w-full'>
                                <label htmlFor="nik" className="block text-sm ">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={email}
                                    className="flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full
                                    no-InDecrement"
                                    autoComplete='none'
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="mb-4 flex w-full">
                            <div className=''>
                                <label htmlFor="alamat" className="block text-sm ">
                                    Alamat
                                </label>
                                <textarea
                                id="alamat"
                                name="alamat"
                                value={alamat}
                                onChange={handleInputChange}
                                className='flex border-1 border border-black rounded-md p-4 bg-transparent text-gray-900 
                                placeholder:text-gray-400 focus:ring-0 focus:outline-0 sm:text-sm sm:leading-6
                                w-full'
                                rows={4}
                                cols={201}
                                style={{ resize: 'none' }}>
                                </textarea>
                            </div>
                        </div>

                        <div className="mb-4 flex w-full">
                            <div className='w-full'>
                                <label htmlFor="nik" className="block text-sm ">
                                    NIK
                                </label>
                                <input
                                    type="text"
                                    id="nik"
                                    name="nik"
                                    value={nik}
                                    className="flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full
                                    no-InDecrement"
                                    autoComplete='none'
                                    disabled
                                />
                            </div>
                            <div className='ml-2 w-full'>
                                <label htmlFor="no_hp" className="block text-sm ">
                                    Nomor Hp
                                </label>
                                <input
                                    type="text"
                                    id="no_hp"
                                    name="no_hp"
                                    value={no_hp}
                                    className="flex border-black rounded-md px-2 border-1 border py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-0 sm:text-sm sm:leading-6 w-full
                                    no-InDecrement"
                                    onChange={handleInputChange}
                                    autoComplete='none'
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-2 flex w-full">
                            <div className='w-full'>
                                <label htmlFor="" className="block text-sm">
                                    Tempat Lahir
                                </label>
                               <input type="text"
                               className='flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' 
                               disabled
                               value={tempat_lahir}
                               />
                            </div>
                            <div className='ml-2 w-full'>
                                <label htmlFor="" className="block text-sm ">
                                    Tanggal Lahir
                                </label>
                                <input type="text"
                                className='flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' 
                                disabled
                                value={DateBorn()}
                                />
                            </div>
                        </div>

                        <div className="mb-2 flex w-full">
                            <div className='w-full'>
                                <label htmlFor="" className="block text-sm">
                                    Agama
                                </label>
                               <input type="text"
                               className='flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' 
                               disabled
                               value={agama}
                               />
                            </div>
                            <div className='ml-2 w-full'>
                                <label htmlFor="" className="block text-sm ">
                                    Jenis Kelamin
                                </label>
                                <input type="text"
                                className='flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' 
                                disabled
                                value={jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                                />
                            </div>
                        </div>

                        <div className="w-full mt-8">
                            <button type="button"
                            onClick={update}
                            className='w-full bg-blue-500 rounded py-2 text-white'>
                                <span>Simpan</span>
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <>
                   <form className="w-full text-black font-inter">
                            <div className="mb-4 flex flex-col justify-center items-center space-y-2 px-8">
                                <div className='mt-4 w-full'>
                                    <label htmlFor="nama" className="block text-sm">
                                        nama
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        name="nama"
                                        value={nama}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent w-full py-1 text-gray-900 placeholder:text-gray-400
                                        focus:ring-0 sm:text-sm sm:leading-6 bg-white px-4 focus:outline-0"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="alamat" className="block text-sm">
                                        Alamat
                                    </label>
                                    <textarea value={alamat} onChange={handleInputChange} id="alamat" name="alamat" required
                                    className='flex border-[1px] border-black rounded-md px-4 py-1 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                    w-full focus:outline-0'
                                    rows={4}
                                    cols={201}
                                    style={{ resize: 'none' }}>

                                    </textarea>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="no_hp" className="block text-sm">
                                        Nomor Hp
                                    </label>
                                    <input
                                        type="tel"
                                        id="no_hp"
                                        name="no_hp"
                                        value={no_hp}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent w-full py-1  text-gray-900 placeholder:text-gray-400 
                                        focus:ring-0 sm:text-sm sm:leading-6 bg-white px-4 focus:outline-0"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div className='w-full'>
                                <label htmlFor="nik" className="block text-sm ">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        value={email}
                                        className="flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full
                                        no-InDecrement"
                                        autoComplete='none'
                                        disabled
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="nik" className="block text-sm ">
                                        NIK
                                    </label>
                                    <input
                                        type="text"
                                        id="nik"
                                        name="nik"
                                        value={nik}
                                        className="flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full
                                        no-InDecrement"
                                        autoComplete='none'
                                        disabled
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="" className="block text-sm">
                                        Tempat Lahir
                                    </label>
                                    <input type="text"
                                    className='flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' 
                                    disabled
                                    value={tempat_lahir}
                                />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="" className="block text-sm ">
                                        Tanggal Lahir
                                    </label>
                                    <input type="text"
                                    className='flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' 
                                    disabled
                                    value={DateBorn()}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="" className="block text-sm">
                                        Agama
                                    </label>
                                    <input type="text"
                                    className='flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' 
                                    disabled
                                    value={agama}
                                    />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="" className="block text-sm ">
                                        Jenis Kelamin
                                    </label>
                                    <input type="text"
                                    className='flex border-black rounded-md bg-gray-200 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' 
                                    disabled
                                    value={jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                                    />
                                </div>
                            </div>
                    </form>
                </>
            )}
        </>
    );
};



export default FormProfGuru;
