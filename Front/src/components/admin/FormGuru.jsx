import React, { useState, useRef } from 'react';
import "../Styling.css"
import CustomWidth from '../../CustomWidth';
import { FaBackspace } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiImageAlt } from "react-icons/bi";
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';




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
        Swal.fire({
            title: 'Apakah Anda Yakin?',
            text: "Data ini Akan ditambahkan!",
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Tambah Data!',
            cancelButtonText: 'Batal'
        }).then(async (result) => {
            if(result.isConfirmed){
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
                        Swal.fire(
                            'Berhasil!',
                            'Guru Berhasil ditambahkan.',
                            'success'
                        ).then(() => {
                            navTo('/Siskoolbe/Admin/Admin_Guru', { replace: true });
                        })
                    }else{
                        Swal.fire(
                            'Gagal!',
                            'Guru gagal ditambahkan.',
                            'error'
                        )
                    }
                }catch(err){
                    Swal.fire(
                        'Gagal!',
                        'Guru gagal ditambahkan.',
                        'error'
                    )
                }
            }
        })
    };

    return (
        <>
            {!Wmobile ? (
                <div>
                <form onSubmit={handleSubmit} className="font-inter">
                    <div className={`overflow-y-auto mt-[12px] px-8 slim-scroll ${DekstopLow ? 'h-[550px]' : 'h-[850px]'}`}>
                        <div className="flex w-full space-x-2">
                            <div className="w-full">
                                <label htmlFor="nik">Nik</label>
                                <input type="text" placeholder='Masukan Nik' id="nik" className="block flex-1 bg-white border-[1px]
                                 border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]
                                  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="nik" value={formData.nik} onChange={handleInputChange} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="nama">Nama Lengkap</label>
                                <input type="text" placeholder='Masukan Nama' id="nama" className="block flex-1 bg-white border-[1px]
                                 border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    name="nama" value={formData.nama} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex mt-4 space-x-2 w-full">
                            <div className="w-full">
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder='Masukan Email' id="email" name="email" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="nik">Password</label>
                                <input type="text" id="nik" placeholder='Masukan Password' className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="Password" value={formData.Password} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className="flex mt-4 space-x-2">
                            <div className="w-full">
                                <label htmlFor="alamat">Alamat</label>
                                <textarea id="alamat"
                                    name="alamat"
                                    placeholder='Masukan Alamat'
                                    rows={4}
                                    style={{resize: 'none'}}
                                    className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={formData.alamat}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="tempatLahir">Tempat Lahir</label>
                                <textarea
                                    type="text"
                                    id="tempatLahir"
                                    className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    name="tempatLahir"
                                    placeholder='Masukan Tempat Lahir'
                                    rows={4}
                                    style={{resize: 'none'}}
                                    value={formData.tempatLahir}
                                    onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex mt-4 space-x-2">
                            <div className="w-full">
                                <label htmlFor="jabatan">Jabatan</label>
                                <select id="jabatan" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    name="jabatan"
                                    value={formData.jabatan}
                                    onChange={handleInputChange}>
                                    <option value="" selected disabled>Pilih Jabatan</option>
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
                            <div className="w-full">
                                <label htmlFor="status">Status</label>
                                <select id="status" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}>
                                    <option value="" selected disabled>Pilih Status</option>
                                    <option value="PNS">PNS</option>
                                    <option value="Honorer">Honorer</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <div className="w-full">
                                <label htmlFor="jenisKelamin">Jenis Kelamin</label>
                                <select id="jenisKelamin" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleInputChange}>
                                    <option value="" disabled selected>Pilih Jenis Kelamin</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>

                            <div className="w-full">
                                <label htmlFor="agama">Agama</label>
                                <select id="agama" name="agama" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={formData.agama} onChange={handleInputChange}>
                                    <option value="" disabled selected>Pilih Agama</option>
                                    <option value="Muslim">Muslim</option>
                                    <option value="Non-Muslim">Non Muslim</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                            <div className="w-full">
                                <label htmlFor="tanggalLahir">Tanggal Lahir</label>
                                <input type="date" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" id="tanggalLahir" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleInputChange} />
                            </div>

                            <div className='w-full'>
                                <label htmlFor="noHp">No HP</label>
                                <input type="text"
                                    id="noHp"
                                    placeholder='Masukan Nomer hp'
                                    name="noHp"
                                    className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-full py-2 px-4 placeholder:text-[14px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={formData.noHp}
                                    onChange={handleInputChange} />
                            </div>

                        </div>

                        <div className='flex mt-4'>
                            <div className='w-full'>
                                <label >Foto Profil </label>
                                {showImageUP && (
                                    <div
                                        onClick={() => fileInputRef.current.click()} // Memicu klik pada input file saat div diklik
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        className="border-[1px] w-full justify-center flex border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                                    <div className='border-[1px] w-full justify-center flex flex-col items-center border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ' >
                                        <IoMdClose onClick={handleDelete} className="text-red-500 text-[30px] mr-auto ml-2" />
                                        <div>
                                            <img src={image} alt="Uploaded" className="w-auto" />
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
