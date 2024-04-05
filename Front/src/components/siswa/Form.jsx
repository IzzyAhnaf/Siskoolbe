import React, { useEffect, useState } from 'react';
import "../Styling.css"
import CustomWidth from '../../CustomWidth';


const Form = ({nama, email, alamat, nik, nis, nisn, no_hp, kelas, jenis_kelamin, handleInputChange}) => {
 

    const WMobile = CustomWidth() <= 767;

    return (
        <>
            {!WMobile ? (
                <form className="w-full overflow-y-auto slim-scroll mx-auto bg-white rounded-lg p-4 font-inter">
                    <div className=''>
                        <div className="mb-4 flex w-full space-x-2">
                            <div className='mt-4 w-full'>
                                <label htmlFor="nama" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    id="nama"
                                    name="nama"
                                    value={nama}
                                    onChange={handleInputChange}
                                    className="w-full flex border-[1px] border-black rounded-md bg-transparent px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                            <div className='mt-4 w-full'>
                                <label htmlFor="email" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
                                    className="w-full flex border-[1px] border-black rounded-md bg-transparent  py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    autoComplete='none'
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4 flex w-full">
                            <div className=''>
                                <label htmlFor="alamat" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Alamat
                                </label>
                                <textarea
                                id="alamat"
                                name="alamat"
                                value={alamat}
                                onChange={handleInputChange}
                                className='flex border-[1px] border-black rounded-md p-4 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6
                                w-full'
                                rows={4}
                                cols={201}
                                style={{ resize: 'none' }}>

                                </textarea>
                            </div>
                        </div>

                        <div className="mb-4 flex w-full">
                            <div className='w-full'>
                                <label htmlFor="nis" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    NIS
                                </label>
                                <input
                                    type="number"
                                    id="nis"
                                    name="nis"
                                    value={nis}
                                    onChange={handleInputChange}
                                    className="flex border-[1px] border-black rounded-md bg-transparent px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full
                                    no-InDecrement"
                                    autoComplete='none'
                                    required
                                />
                            </div>
                            <div className='ml-2 w-full'>
                                <label htmlFor="nisn" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    NISN
                                </label>
                                <input
                                    type="number"
                                    id="nisn"
                                    name="nisn"
                                    value={nisn}
                                    onChange={handleInputChange}
                                    className="flex border-[1px] border-black rounded-md bg-transparent px-2 py-2  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full
                                    no-InDecrement"
                                    autoComplete='none'
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4 flex w-full">
                            <div className='w-full'>
                                <label htmlFor="no_hp" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Nomor Hp
                                </label>
                                <input
                                    type="text"
                                    id="no_hp"
                                    name="no_hp"
                                    value={no_hp}
                                    onChange={handleInputChange}
                                    className="flex border-[1px] border-black rounded-md bg-transparent px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full
                                    no-InDecrement"
                                    autoComplete='none'
                                    required
                                />
                            </div>
                            <div className='ml-2 w-full'>
                                <label htmlFor="nik" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    NIK
                                </label>
                                <input
                                    type="text"
                                    id="nik"
                                    name="nik"
                                    value={nik}
                                    onChange={handleInputChange}
                                    className="flex border-[1px] border-black rounded-md bg-transparent px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full
                                    no-InDecrement"
                                    autoComplete='none'
                                    required
                                />
                            </div>

                        </div>

                        <div className="mb-2 flex w-full">
                            <div className='w-full'>
                                <label htmlFor="" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                    Kelas
                                </label>
                               <input type="text"
                               className='flex border-[1px] border-black rounded-md bg-transparent px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' disabled
                               value={kelas}
                               />
                            </div>
                            <div className='ml-2 w-full'>
                                <label htmlFor="" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Jenis Kelamin
                                </label>
                                <input type="text"
                                className='flex border-[1px] border-black rounded-md bg-transparent px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 w-full' disabled
                                value={jenis_kelamin}
                                />
                            </div>
                        </div>


                    </div>
                </form>
            ) : (
                <>
                    <form className="max-w-md mx-auto">
                        <div className=' justify-center items-center ml-2'>
                            <h1 className='font-bold text-[20px] mt-4'>Change User Information Here</h1>
                        </div>
                        <div className={`container5 items-center justify-center flex flex-col ${WMobile ? 'overflow-y-auto mt-[12px] slim-scroll t-[200px] h-[380px] pt-[100px] pb-[20px]' : DekstopLow ? 'overflow-y-auto slim-scroll h-96' : ''}`}>
                            <div className="comtaimer5 mb-4 flex flex-col justify-center items-center">

                                <div className='mt-4'>

                                    <label htmlFor="nama" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                        nama
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        name="nama"
                                        value={nama}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="email" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent  py-1 p-[60px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>



                                <div className=''>
                                    <label htmlFor="alamat" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Alamat
                                    </label>
                                    <input
                                        type="text"
                                        id="alamat"
                                        name="alamat"
                                        value={alamat}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent  py-1 p-[60px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>



                                <div>
                                    <label htmlFor="nis" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        NIS
                                    </label>
                                    <input
                                        type="text"
                                        id="nis"
                                        name="nis"
                                        value={nis}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div >
                                    <label htmlFor="nisn" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        NISN
                                    </label>
                                    <input
                                        type="text"
                                        id="nisn"
                                        name="nisn"
                                        value={nisn}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>



                                <div>
                                    <label htmlFor="no_hp" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Nomor Hp
                                    </label>
                                    <input
                                        type="tel"
                                        id="no_hp"
                                        name="no_hp"
                                        value={no_hp}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div className=''>
                                    
                                </div>



                                <div>
                           

                                </div>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </>
    );
};



export default Form;
