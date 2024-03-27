import React, { useState, useRef, useEffect } from 'react';
import "./Styling.css"
import CustomWidth from '../CustomWidth';
import { FaBackspace } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiImageAlt } from "react-icons/bi";
import _debounce from 'lodash/debounce';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import base64ToFile from '../base64toFile';
import formatDate from '../formattedDate';

const FEditMurid = () => {
    const [formData, setFormData] = useState({
        nik: '',
        nama: '',
        email: '',
        Password: '',
        noHp: '',
        alamat: '',
        tempatLahir: '',
        tanggalLahir: '',
        nis: '',
        nisn: '',
        jenisKelamin: '',
        agama: '',
        jurusan: null,
        sub_jurusan: null,
        selectedJurusan: '',
        kelas: '',
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

    const id = useParams().id;

    const getMurid = _debounce(async () => {
        try {
            const response = await api.get(`/getSiswa_Admin/${id}`);
            if (response.status === 200) {
                const file = base64ToFile(response.data[0].bukti, response.data[0].gambar_profil);
                const date = formatDate(response.data[0].tgl_lahir);
                setFormData({
                    nik: response.data[0].nik,
                    nama: response.data[0].nama,
                    email: response.data[0].email,
                    Password: response.data[0].password,
                    noHp: response.data[0].no_hp,
                    alamat: response.data[0].alamat,
                    tempatLahir: response.data[0].tempat_lahir,
                    tanggalLahir: date,
                    nis: response.data[0].nis,
                    nisn: response.data[0].nisn,
                    jenisKelamin: response.data[0].jenis_kelamin,
                    agama: response.data[0].agama,
                    selectedJurusan: response.data[0].jurusan + '-' + response.data[0].sub_jurusan,
                    jurusan: response.data[0].jurusan,
                    sub_jurusan: response.data[0].sub_jurusan,
                    kelas: response.data[0].kelas,
                    bukti: file,
                    previewImage: 'data:image/png;base64,' + response.data[0].bukti,
                    imageName: response.data[0].gambar_profil
                })
                console.log(response.data[0]);
            }
        } catch (error) {
            window.history.back();
        }
    }, 50)

    useEffect(() => {
        getMurid();
    }, [id])

    useEffect(() => {
        if (formData.previewImage) {
            setImage(formData.previewImage);
            setShowIcon(false);
            setImageUp(false);
        }
    },  [formData.previewImage])

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
        const jurusanMap = {
            'PPLG1': ['Pengembangan Perangkat Lunak dan Gim', 1],
            'PPLG2': ['Pengembangan Perangkat Lunak dan Gim', 2],
            'AKL1': ['Akutansi Keuangan Lembaga', 1],
            'AKL2': ['Akutansi Keuangan Lembaga', 2],
            'To1': ['Teknik Otomotif', 1],
            'To2': ['Teknik Otomotif', 2],
            'To3': ['Teknik Otomotif', 3],
            'To4': ['Teknik Otomotif', 4],
            'PerHotelan1': ['Perhotelan', 1],
            'PerHotelan2': ['Perhotelan', 2],
            'DKV1': ['Desain Komunikasi Visual', 1],
            'DKV2': ['Desain Komunikasi Visual', 2],
        };
        const [jurusan, subJurusan] = jurusanMap[formData.jurusan] || [];
        formData.jurusan = jurusan;
        formData.sub_jurusan = subJurusan;

        const formData2 = new FormData();
        formData2.append('image', formData.bukti);
        const data = {
            'nama': formData.nama,
            'email': formData.email,
            'Password': formData.Password,
            'nisn': formData.nisn,
            'nis': formData.nis,
            'alamat': formData.alamat,
            'tempatLahir': formData.tempatLahir,
            'tanggalLahir': formData.tanggalLahir,
            'jenisKelamin': formData.jenisKelamin,
            'agama': formData.agama,
            'jurusan': formData.jurusan,
            'sub_jurusan': formData.sub_jurusan,
            'kelas' : formData.kelas,
            'noHp' : formData.noHp,
        }
        const encoded = JSON.stringify(data);
        console.log(formData);
        console.log(data);
        try {
            await api.post(`/updateSiswa_Admin/${id}`, formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'data': encoded
                }
            }).then((response) => {
                if (response.status === 200) {
                    alert('Data Murid Berhasil');
                    window.location.href = '/Siskoolbe/Admin/Admin_Murid';
                }
            });
        }catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        window.history.back(); // Kembali ke halaman sebelumnya
    };



    return (
        <>
            {!Wmobile ? (
                <div className=''>
                <form onSubmit={handleSubmit} className="">
                    <div className='flex space-x-4'>
                        <div className='mt-[20px]'>
                            <FaUserTie className='text-blue-700 text-[30px] bg-white rounded-full ' />
                        </div>
                        <div>
                            <h1 className='font-bold text-2xl mt-4'>Murid</h1>
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
                                <label htmlFor="nama">Nama:</label>
                                <input type="text" placeholder='Masukan Nama' id="nama" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    name="nama" value={formData.nama} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex flex-row mt-4">
                            <div className="mr-4">
                                <label htmlFor="email">Email:</label>
                                <input type="email" placeholder='Masukan Email' id="email" name="email" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={formData.email} onChange={handleInputChange} autoComplete='off'/>
                            </div>
                            <div className="mr-4">
                                <label htmlFor="nik">Password:</label>
                                <input type="password" id="nik" placeholder='Masukan Password' className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="Password" value={formData.Password} onChange={handleInputChange} />

                            </div>
                        </div>
                        <div className="flex flex-row  mt-4">
                            <div className="mr-4">
                                <label htmlFor="alamat">Alamat:</label>
                                <textarea id="alamat" name="alamat" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[70px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={formData.alamat}
                                    onChange={handleInputChange} />
                            </div>
                            <div className="mr-4">
                                <label htmlFor="tempatLahir">Tempat Lahir:</label>
                                <textarea type="text" id="tempatLahir" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[70px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="tempatLahir" value={formData.tempatLahir} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex flex-row  mt-4">
                            <div className="mr-4">
                                <label htmlFor="tanggalLahir">Tanggal Lahir:</label>
                                <input type="date" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" id="tanggalLahir" name="tanggalLahir" value={formData.tanggalLahir} onChange={handleInputChange} />
                            </div>
                            <div className="mr-4">
                                <label htmlFor="nis">NIS:</label>
                                <input type="text" id="nis" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="nis" value={formData.nis} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex flex-row  mt-4">
                            <div className="mr-4">
                                <label htmlFor="nisn">NISN:</label>
                                <input type="text" id="nisn" name="nisn" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={formData.nisn} onChange={handleInputChange} />
                            </div>
                            <div className="mr-4">
                                <label htmlFor="jenisKelamin">Jenis Kelamin:</label>
                                <select id="jenisKelamin" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleInputChange}>
                                    <option value="" disabled>Pilih Jenis Kelamin</option>
                                    <option value="laki-laki" selected={formData.jenisKelamin === "Laki-laki"}>Laki-laki</option>
                                    <option value="perempuan" selected={formData.jenisKelamin === "Perempuan"}>Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row  mt-4">
                            <div className="mr-4">
                                <label htmlFor="agama">Agama:</label>
                                <select id="agama" name="agama" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    value={formData.agama} onChange={handleInputChange}>
                                    <option value="" disabled>Pilih Agama</option>
                                    <option value="muslim" selected={formData.agama === "Muslim"}>Muslim</option>
                                    <option value="non muslim" selected={formData.agama === "Non-Muslim"}>Non Muslim</option>
                                </select>
                            </div>
                            <div className="mr-4">
                                <label htmlFor="jurusan">Jurusan:</label>
                                <select id="jurusan" name="jurusan" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={formData.jurusan} onChange={handleInputChange}>
                                    <option value="" disabled>Pilih Jurusan</option>
                                    <option value="To1" selected={formData.selectedJurusan === "Teknik Otomotif-1"}>To1</option>
                                    <option value="To2" selected={formData.selectedJurusan === "Teknik Otomotif-2"}>To2</option>
                                    <option value="To3" selected={formData.selectedJurusan === "Teknik Otomotif-3"}>To3</option>
                                    <option value="To4" selected={formData.selectedJurusan === "Teknik Otomotif-4"}>To4</option>
                                    <option value="PerHotelan1" selected={formData.selectedJurusan === "Perhotelan-1"}>PerHotelan1</option>
                                    <option value="PerHotelan2" selected={formData.selectedJurusan === "Perhotelan-2"}>PerHotelan2</option>
                                    <option value="PPLG1" selected={formData.selectedJurusan === "Pengembangan Perangkat Lunak dan Gim-1"}>PPLG1</option>
                                    <option value="PPLG2" selected={formData.selectedJurusan === "Pengembangan Perangkat Lunak dan Gim-2"}>PPLG2</option>
                                    <option value="AKL1" selected={formData.selectedJurusan === "Akuntansi Keuangan Lembaga-1"}>AKL1</option>
                                    <option value="AKL2" selected={formData.selectedJurusan === "Akuntansi Keuangan Lembaga-2"}>AKL2</option>
                                    <option value="DKV1" selected={formData.selectedJurusan === "Desain Komunikasi Visual-1"}>DKV1</option>
                                    <option value="DKV2" selected={formData.selectedJurusan === "Desain Komunikasi Visual-2"}>DKV2</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-row  mt-4">
                            <div className="mr-4">
                                <label htmlFor="kelas">Kelas:</label>
                                <select id="kelas" name="kelas" className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" value={formData.kelas} onChange={handleInputChange}>
                                    <option value="">Pilih Kelas</option>
                                    <option value="10" selected={formData.kelas === "10"}>10</option>
                                    <option value="11" selected={formData.kelas === "11"}>11</option>
                                    <option value="12" selected={formData.kelas === "12"}>12</option>
                                </select>
                            </div>
                            <div className='mr-4'>
                                <label htmlFor="noHp">No HP:</label>
                                <input type="text" id="noHp"
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
                            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded'>Ubah Data Murid</button>
                        </div>

                    </div>
                </form>
                </div>



            ) : (
                <>
              
                </>
            )}
        </>
    );
};

export default FEditMurid;
