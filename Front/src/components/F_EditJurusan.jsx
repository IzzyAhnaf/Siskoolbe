import React, { useState, useRef, useEffect } from 'react';
import "./Styling.css"
import CustomWidth from '../CustomWidth';
import { FaBackspace } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiImageAlt } from "react-icons/bi";
import { GiTrumpetFlag } from "react-icons/gi";
import { useNavigate, useParams } from 'react-router-dom';
import _debounce from 'lodash/debounce';
import api from '../api';
import base64ToFile from '../base64toFile';

const FEditJurusan = () => {
    const navTo = useNavigate();
    const [formData, setFormData] = useState({
        namaJurusan: '',
        urutanJurusan: '',
        previewImage: null,
        imageName: '',
        bukti: null
    });
    const Wmobile = CustomWidth() <= 767;
    const DekstopLow = CustomWidth() <= 1366;
    const [showIcon, setShowIcon] = useState(true);
    const [showImageUP, setImageUp] = useState(true);
    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);

    const { id } = useParams();

    const getJurusan = _debounce(async () => {
        try {
            const response = await api.get(`/getJurusan_Admin/${id}`);
            if(response.status === 200){
                const file =  base64ToFile(response.data[0].image, response.data[0].gambar);
                setFormData({
                    namaJurusan: response.data[0].namajurusan,
                    urutanJurusan: response.data[0].sub_jurusan,
                    previewImage: 'data:image/png;base64,' + response.data[0].image,
                    gambar: response.data[0].gambar,
                    bukti: file
                });
            }
        } catch (error) {
            console.error(error);
        }
    }, 50);

    useEffect(() => {
        getJurusan();
    }, [id]);

    useEffect(() => {
        if (formData.previewImage) {
            setImage(formData.previewImage);
            setShowIcon(false);
            setImageUp(false);
        }
    }, [formData.previewImage]);

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
                    previewImage: event.target.result,
                    imageName: file.name
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
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
        setFormData((prevData) => ({
            ...prevData,
            previewImage: null,
            imageName: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData2 = new FormData();
        formData2.append('bukti', formData.bukti);
        const data = {
            namaJurusan: formData.namaJurusan,
            urutanJurusan: formData.urutanJurusan
        }
        const encoded = JSON.stringify(data);
        try {
            const response = await api.post(`/updateJurusan/${id}`, formData2, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'data': encoded
                },
            });
            response.status === 200 &&
            navTo('/Siskoolbe/Admin/Admin_Jurusan');
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        window.history.back();
    };



    return (
        <>
            {!Wmobile ? (
                <div className=''>
                    <form onSubmit={handleSubmit} className="">
                        <div className='flex space-x-4 '>
                            <div className='mt-[20px]'>
                                <GiTrumpetFlag className='text-blue-700 text-[30px] rounded-full ' />
                            </div>
                            <div>
                                <h1 className='font-bold text-2xl mt-4'>Jurusan</h1>
                            </div>
                            <div className='mt-[20px]' onClick={handleBack}>
                                <FaBackspace className='text-2xl ml-[930px]' />
                            </div>
                        </div>
                        <div className={`overflow-y-auto mt-[12px] w-full slim-scroll ${DekstopLow ? 'h-[550px]' : 'h-[850px]'} pb-[20px]`}>
                            <div className="flex flex-col " >

                                <div className='flex'>
                                    <div className='flex mt-4'>
                                        <div className=''>
                                            <label >Profile: </label>
                                            {showImageUP && (
                                                <div
                                                    onClick={() => fileInputRef.current.click()} 
                                                    onDrop={handleDrop}
                                                    onDragOver={handleDragOver}
                                                    className="border-[1px]  w-[530px] justify-center flex border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    required
                                                >
                                                    <input
                                                        type="file"
                                                        name="gambar"
                                                        id="gambar"
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
                                                <div className='border-[1px] w-[530px] justify-center flex flex-col items-center border-black rounded-md bg-transparent py-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ' >
                                                    <div>
                                                    <IoMdClose onClick={handleDelete} className="text-[white] hover:text-gray-400 text-[30px]  mt-[20px]" />
                                                        <div>
                                                            <img src={`${image}`} alt="Uploaded" className="w-auto z-0" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <div className="flex mt-4">
                                    <div className="mr-4">
                                        <label htmlFor="kelas">Nama Jurusan:</label>
                                        <input type="text" id="namaJurusan"
                                            name="namaJurusan"
                                            className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={formData.namaJurusan}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className='mr-4'>
                                        <label htmlFor="noHp">Urutan Jurusan:</label>
                                        <input type="text" id="urutanJurusan"
                                            name="urutanJurusan"
                                            className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            value={formData.urutanJurusan}
                                            onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="flex mt-4">
                                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded'>Ubah Jurusan</button>
                                </div>

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

export default FEditJurusan;

