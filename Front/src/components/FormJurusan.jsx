import React, { useState, useRef } from 'react';
import "./Styling.css"
import CustomWidth from '../CustomWidth';
import { FaBackspace } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiImageAlt } from "react-icons/bi";
import { GiTrumpetFlag } from "react-icons/gi";

const FormJurusan = () => {
    const [formData, setFormData] = useState({

        Profile: null,
        previewImage: null,
        imageName: ''
    });
    const Wmobile = CustomWidth() <= 767;
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const handleBack = () => {
        window.history.back(); // Kembali ke halaman sebelumnya
    };



    return (
        <>
            {!Wmobile ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className='flex flex-row space-x-4 '>
                        <div className='mt-[20px]'>
                            <GiTrumpetFlag className='text-blue-700 text-[30px] bg-white rounded-full ' />
                        </div>
                        <div>
                            <h1 className='font-bold text-2xl mt-4'>Jurusan</h1>
                        </div>
                        <div className='mt-[20px]' onClick={handleBack}>
                            <FaBackspace className='text-2xl ml-[930px]' />
                        </div>
                    </div>
                    <div className='w-[1130px] overflow-y-auto mt-[12px] slim-scroll  h-[500px] pb-[20px]'>
                        <div className="flex flex-col " >

                            <div className='flex flex-row'>


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
                                                    name="Profile"
                                                    id="Profile"
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
                            </div>

                            <div className="flex flex-row  mt-4">
                                <div className="mr-4">
                                    <label htmlFor="kelas">Nama Jurusan:</label>
                                    <input type="text" id="noHp"
                                        name="noHp"
                                        className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={formData.Najur}
                                        onChange={handleInputChange} />
                                </div>
                                <div className='mr-4'>
                                    <label htmlFor="noHp">Urutan Jurusan:</label>
                                    <input type="text" id="noHp"
                                        name="noHp"
                                        className="block flex-1 bg-white border-[1px]  border-black rounded-md bg-transparent w-[530px] h-[40px] pl-[20px] py-1 placeholder:text-[20px]  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={formData.Ujur}
                                        onChange={handleInputChange} />


                                </div>
                            </div>

                        </div>

                    </div>
                </form>




            ) : (
                <>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className=' justify-center items-center ml-2'>
                            <h1 className='font-bold text-[20px] mt-4'>Change User Information Here</h1>
                        </div>
                        <div className={`container5 items-center justify-center flex flex-col ${WMobile ? 'overflow-y-auto  slim-scroll t-[200px] h-[350px] pt-[50px] pb-[20px]' : DekstopLow ? 'overflow-y-auto slim-scroll h-96' : ''}`}>
                            <div className=" mb-4 flex flex-col justify-center items-center">

                                <div className=''>

                                    <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Nama
                                    </label>

                                    <input
                                        type="Nama"
                                        id="Nama"
                                        name="Nama"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent  py-1 p-[60px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>



                                <div className=''>
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent  py-1 p-[60px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>



                                <div>
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        NIS
                                    </label>
                                    <input
                                        type="text"
                                        id="nis"
                                        name="nis"
                                        value={formData.nis}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div >
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        NISN
                                    </label>
                                    <input
                                        type="text"
                                        id="nisn"
                                        name="nisn"
                                        value={formData.nisn}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>



                                <div>
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />

                                </div>
                            </div>
                        </div>



                    </form>
                </>
            )}
        </>
    );
};
export default FormJurusan;
