import React, { useState, useRef } from 'react';
import "./Styling.css"
import CustomWidth from '../CustomWidth';
import { FaBackspace } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiImageAlt } from "react-icons/bi";
import api from '../api';
import { useNavigate } from 'react-router-dom';




const FormGuru = () => {
    const [formData, setFormData] = useState({
        nik: '',
        nama: '',
        email: '',
        Password: '',
        noHp: '',
        alamat: '',
        tempatLahir: '',
        tanggalLahir: '',
        jabatan: '',
        status: '',
        jenisKelamin: '',
        agama: '',
        bukti: null,
        previewImage: null,
        imageName: ''
    });
    const navTo = useNavigate();
    const Wmobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;
    const [showIcon, setShowIcon] = useState(true);
    const [showImageUP, setImageUp] = useState(true);
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setShowIcon(false);
        setImageUp(false);
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImage(event.target.result);
                };
                reader.readAsDataURL(file);
                setFormData((prevData) => ({
                    ...prevData,
                    bukti: file,
                    previewImage: event.target.result,
                    imageName: file.name
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    bukti: file,
                    previewImage: null,
                    imageName: file.name
                }));
                alert('Please choose an image file.');
            }
        } else {
            alert('No file selected.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setImageUp(false);
        setShowIcon(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImage(event.target.result);
                };
                reader.readAsDataURL(file);
                setFormData((prevData) => ({
                    ...prevData,
                    bukti: file,
                    previewImage: event.target.result,
                    imageName: file.name
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    bukti: file,
                    previewImage: null,
                    imageName: file.name
                }));
            }
        } else {
            alert('No file dropped.');
        }
    };

    const handleDelete = () => {
        setImage(null);
        setImageUp(true);
        setShowIcon(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const ImageData = new FormData();
        ImageData.append('image', formData.bukti);

        const data = {
            nik: formData.nik,
            nama: formData.nama,
            email: formData.email,
            Password: formData.Password,
            noHp: formData.noHp,
            alamat: formData.alamat,
            tempatLahir: formData.tempatLahir,
            tanggalLahir: formData.tanggalLahir,
            jabatan: formData.jabatan,
            status: formData.status,
            jenisKelamin: formData.jenisKelamin,
            agama: formData.agama
        }

        const encoded = JSON.stringify(data);
        try{
            const resp = await api.post('/addGuru_Admin', ImageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'data': encoded
                }
            })

            if(resp.status === 200){
                alert('Guru Berhasil');
                navTo('/Siskoolbe/Admin/Admin_Guru');
            }else{
                console.log(resp.data);
            }
        }catch(err){
            console.log(err);
        }
    };

    const handleBack = () => {
        window.history.back(); // Kembali ke halaman sebelumnya
    };



    return (
        <>
            {!Wmobile ? (
                <div>
                <form onSubmit={handleSubmit} className="">
                    <div className='flex space-x-4'>
                        <div className='mt-[20px]'>
                            <FaUserTie className='text-blue-700 text-[30px] bg-white rounded-full ' />
                        </div>
                        <div>
                            <h1 className='font-bold text-2xl mt-4'>Guru</h1>
                        </div>
                        <div className='mt-[20px]' onClick={handleBack}>
                            <FaBackspace className='text-2xl ml-[930px]' />
                        </div>
                    </div>
                    <div className={`overflow-y-auto mt-[12px] slim-scroll ${DekstopLow ? 'h-[550px]' : 'h-[850px]'} pb-[20px]`}>
                        <div className="flex flex-row " >
                            <div className="mr-4">
                                <label htmlFor="nik">Nik:</label>
                                <input type="text" placeholder='Masukan Nik' id="nik" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="nik" value={formData.nik} onChange={handleInputChange} />
                            </div>
                            <div className="mr-4">
                                <label htmlFor="nama">Nama Lengkap:</label>
                                <input type="text" placeholder='Masukan Nama' id="nama" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    name="nama" value={formData.nama} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex flex-row mt-4">
                            <div className="mr-4">
                                <label htmlFor="email">Email:</label>
                                <input type="email" placeholder='Masukan Email' id="email" name="email" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="mr-4">
                                <label htmlFor="nik">Password:</label>
                                <input type="text" id="nik" placeholder='Masukan Password' className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="Password" value={formData.Password} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className="flex flex-row  mt-4">
                            <div className="mr-4">
                                <label htmlFor="alamat">Alamat:</label>
                                <textarea id="alamat"
                                    name="alamat"
                                    placeholder='Masukan Alamat'
                                    className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[70px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={formData.alamat}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="mr-4">
                                <label htmlFor="tempatLahir">Tempat Lahir:</label>
                                <textarea
                                    type="text"
                                    id="tempatLahir"
                                    className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[70px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    name="tempatLahir"
                                    placeholder='Masukan Tempat Lahir'
                                    value={formData.tempatLahir}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex flex-row  mt-4">
                            <div className="mr-4">
                                <label htmlFor="jabatan">Jabatan:</label>
                                <select id="jabatan" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    name="jabatan"
                                    value={formData.jabatan}
                                    onChange={handleInputChange}>
                                    <option value="">Pilih Jabatan</option>
                                    <option value="Kepala Sekolah">Kepala Sekolah</option>
                                    <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</option>
                                    <option value="Guru Kelas">Guru Kelas</option>
                                    <option value="Koordinator atau Pembina Bidang">Koordinator atau Pembina Bidang</option>
                                    <option value="Guru Mata Pelajaran">Guru Mata Pelajaran</option>
                                    <option value="Guru Bimbingan Konseling (BK)">Guru Bimbingan Konseling (BK)</option>
                                    <option value="Guru Agama">Guru Agama</option>
                                    <option value="Guru Pendukung">Guru Pendukung</option>
                                    <option value="Guru Pengajar Tambahan">Guru Pengajar Tambahan</option>
                                    <option value="Guru Pembimbing">Guru Pembimbing</option>
                                    <option value="Guru Pendidikan Khusus">Guru Pendidikan Khusus</option>
                                    <option value="Guru Bahasa Asing">Guru Bahasa Asing</option>
                                    <option value="Guru Pengampu Program Keahlian">Guru Pengampu Program Keahlian</option>
                                </select>
                            </div>
                            <div className="mr-4">
                                <label htmlFor="status">Status:</label>
                                <select id="status" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}>
                                    <option value="">Pilih Status</option>
                                    <option value="PNS">PNS</option>
                                    <option value="Honorer">Honorer</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row  mt-4">
                            <div className="mr-4">
                                <label htmlFor="jenisKelamin">Jenis Kelamin:</label>
                                <select id="jenisKelamin" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleInputChange}>
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>

                            <div className="mr-4">
                                <label htmlFor="agama">Agama:</label>
                                <select id="agama" name="agama" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={formData.agama} onChange={handleInputChange}>
                                    <option value="">Pilih Agama</option>
                                    <option value="Muslim">Muslim</option>
                                    <option value="Non-Muslim">Non Muslim</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-row  mt-4">
                            <div className="mr-4">
                                <label htmlFor="tanggalLahir">Tanggal Lahir:</label>
                                <input type="date" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" id="tanggalLahir" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleInputChange} />
                            </div>

                            <div className='mr-4'>
                                <label htmlFor="noHp">No HP:</label>
                                <input type="text"
                                    id="noHp"
                                    placeholder='Masukan Nomer hp'
                                    name="noHp"
                                    className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={formData.noHp}
                                    onChange={handleInputChange} />
                            </div>

                        </div>

                        <div className='flex flex-row mt-4'>
                            <div className=''>
                                <label >Profile: </label>
                                {showImageUP && (
                                    <div
                                        onClick={() => fileInputRef.current.click()} // Memicu klik pada input file saat div diklik
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        className="border-[1px]  w-[530px] justify-center flex border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        required
                                    >
                                        <input
                                            type="file"
                                            name="bukti"
                                            id="bukti"
                                            accept="image/*"
                                            ref={fileInputRef} // Menghubungkan elemen input dengan useRef
                                            onChange={handleFileChange}
                                            className="hidden" // Menyembunyikan input file
                                        />
                                        {showIcon && (
                                            <div className="image-icon flex flex-col items-center pt-[50px] pb-[50px]">
                                                <BiImageAlt className="w-[50px] h-[50px] text-[#00000099]" />
                                                <div>
                                                    <h1 className="text-[20px] text-[#00000099] font-bold">Drag And Drop Here</h1>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {image && (
                                    <div className='border-[1px] w-[530px] justify-center flex flex-col items-center border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ' >
                                        <div>
                                            <IoMdClose onClick={handleDelete} className="text-[white] text-[30px]  mt-[20px]" />
                                            <div>
                                                <img src={image} alt="Uploaded" className="w-auto z-0  " />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="flex mt-4">
                            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded'>Tambah Guru</button>
                        </div>
                    </div>
                </form >
                </div>



            ) : (
                <>
                </>
            )}
        </>
    );
};

export default FormGuru;
