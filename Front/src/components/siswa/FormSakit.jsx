import React, { useState, useRef, useEffect } from 'react';
import CustomWidth from '../../CustomWidth';
import { IoMdClose } from "react-icons/io";
import { BiImageAlt } from "react-icons/bi";
import '../Styling.css'; // Impor CSS yang mengimpor font Inter
import api from '../../api';
import _debounce from 'lodash/debounce';
import Swal from 'sweetalert2';

function IzinForm({navTo}) {
    const [formData, setFormData] = useState({
        izinType: '',
        alasan: '',
        bukti: null,
        previewImage: null,
        imageName: ''
    });
    
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
        const file = e.target.files[0]; // Use e.target.files to access the selected file
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
        const token = sessionStorage.getItem('token');
        const ImageData = new FormData();
        ImageData.append('image', formData.bukti);

        const data = {
            izinType: formData.izinType,
            alasan: formData.alasan
        };
        
        try{
            await api.post('IzinSiswa', ImageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    data: JSON.stringify(data),
                    Authorization: `${token}`
                }
            }).then((res) => {
                if(res.status === 200){
                    Swal.fire(
                        'Berhasil',
                        'Izin Berhasil',
                        'success'
                    ).then(() => {
                        navTo('/Siskoolbe/Siswa', { replace: true });
                    })
                }
            }).catch((err) => {
                console.log(err);
                Swal.fire(
                    'Gagal',
                    'Izin Gagal',
                    'error'
                )
            })
            
        }catch(err){
            console.log(err);
            Swal.fire(
                'Gagal',
                'Izin Gagal',
                'error'             
            )
        }
    };


    const WMobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;


    return (
        <>
            {!WMobile ? (
                <div className={`flex flex-col items-center justify-center w-full slim-scroll ${DekstopLow ? 'h-[550px]' : 'h-[850px]'} pb-[20px]`} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <form onSubmit={handleSubmit} className="inter-font">
                        {/* Form elements */}
                        <div className='w-full'>
                            <label className='text-[20px] font-bold' >
                                Kamu Izin Apa?
                            </label>
                            <select
                                name="izinType"
                                id="izinType"
                                value={formData.izinType}
                                onChange={handleInputChange}
                                placeholder='Pilih Izin'
                                className="block flex-1 border-[1px] px-4 w-full py-2 border-black rounded-md bg-transparent text-gray-900  placeholder:text-gray-400 focus:ring-2 sm:text-[20px] sm:leading-4"
                                required
                            >
                                <option className='ml-[20px]' value="">Pilih izin</option>
                                <option value="sakit" >Sakit</option>
                                <option value="keterangan">Izin lainya</option>
                            </select>
                        </div>
                        <div className='mt-[20px]'>
                            <label className='text-[20px] font-bold'>
                                Alasan
                            </label>
                            <textarea
                                name="alasan"
                                id="alasan"
                                value={formData.alasan}
                                onChange={handleInputChange}
                                className="flex border-[1px] slim-scroll px-4 w-full py-4 border-black rounded-md bg-transparent  text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:text-[20px] sm:leading-6"
                                style={{resize: 'none'}}
                                required
                            />
                        </div>

                        <div className='mt-[20px]'>
                            <label className='text-[20px] font-bold'>
                                Bukti (Surat dokter/foto kegiatan)
                            </label>
                            {showImageUP && (
                                <div
                                    onClick={() => fileInputRef.current.click()} 
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    className="border-[1px] w-[1050px] justify-center flex border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    required
                                >
                                    <input
                                        type="file"
                                        name="bukti"
                                        id="bukti"
                                        accept="image/*"
                                        ref={fileInputRef} 
                                        onChange={handleFileChange}
                                        className="hidden"
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
                                <div className='border-[1px] w-[1050px] justify-center flex flex-col items-center border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ' >
                                    <img src={image} alt="Uploaded" className="w-[80%] mt-[20px]" />
                                    <div className="text-[20px]">{formData.imageName}</div> {/* Menampilkan nama file */}
                                    <IoMdClose onClick={handleDelete} className="text-[red] text-[30px]" />
                                </div>
                            )}
                        </div>

                        <button type='submit' className=' border-outline border-[1px] border-blue-700 rounded-lg mt-[20px] h-[50px] w-[1050px] text-[#1E6CB1]'> upload </button>
                    </form>
                </div >
            ) : (
                <>
                    <div className={` pl-[50px] ${WMobile ? 'overflow-y-auto mt-[12px] slim-scroll t-[200px] h-[400px]  pb-[20px]' : DekstopLow ? 'overflow-y-auto slim-scroll h-96' : ''}`}
                        onDragOver={handleDragOver} onDrop={handleDrop}>
                        <form onSubmit={handleSubmit} className="inter-font">
                            <div>
                                <label className='text-[20px] font-bold' >
                                    Izin:
                                </label>
                                <select
                                    name="izinType"
                                    id="izinType"
                                    value={formData.izinType}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px] w-[250px] h-[35px]  border-black rounded-md bg-transparent    text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    required
                                >
                                    <option value="">Pilih jenis izin</option>
                                    <option value="Sakit">Sakit</option>
                                    <option value="Izin lainya">Izin lainya</option>
                                </select>
                            </div>
                            <div className='mt-[5px]'>
                                <label className='text-[20px] font-bold'>
                                    Tanggal Izin:
                                </label>
                                <input
                                    type="date"
                                    name="tanggalIzin"
                                    id="tanggalIzin"
                                    value={formData.tanggalIzin}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px]  w-[250px] h-[35px]  border-black rounded-md bg-transparent    text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                            <div className='mt-[5px]'>
                                <label className='text-[20px] font-bold'>
                                    Alasan:
                                </label>
                                <textarea
                                    name="alasan"
                                    id="alasan"
                                    value={formData.alasan}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px]  w-[250px] h-[35px]  border-black rounded-md bg-transparent    text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                            <div className='mt-[5px]'>
                                <label className='text-[20px] \ font-bold'>
                                    Bukti:
                                </label>
                            </div>
                            {showImageUP && (
                                <div
                                    onClick={() => fileInputRef.current.click()} // Memicu klik pada input file saat div diklik
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    className="border-[1px] w-[250px] justify-center flex border-black rounded-md bg-transparent h-[80px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                                        <div className="image-icon flex flex-col items-center pt-[10px] ">
                                            <BiImageAlt className="w-[30px] h-[30px] text-[#00000099]" />
                                            <div>
                                                <h1 className="text-[20px] text-[#00000099] font-bold">Drag And Drop Here</h1>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}


                            {image && (
                                <div className='border-[1px] w-[250px] justify-center flex flex-col items-center border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ' >
                                    <img src={image} alt="Uploaded" className="w-[80%] mt-[20px]" />
                                    <div className="text-[20px]">{formData.imageName}</div> {/* Menampilkan nama file */}
                                    <IoMdClose onClick={handleDelete} className="text-[red] text-[30px]" />
                                </div>
                            )}

                            <button type='submit' className=' border-outline mb-[20px] border-[1px] border-blue-700 flex flex-col justify-center items-center  rounded-lg mt-[20px] h-[50px] w-[250px] text-[#1E6CB1]'> upload </button>
                        </form>
                    </div>
                </>
            )
            }
        </>
    );
};

export default IzinForm;
