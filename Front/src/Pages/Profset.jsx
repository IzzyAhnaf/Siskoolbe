import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Form from "../components/Form";
import { IoMdSettings } from "react-icons/io";
import "./Styling.css"
import CustomWidth from "../CustomWidth";
import { IoIosClose } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ProfilePicture from "../components/Pp";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";


const ProfSet = () => {

    const [isContainerVisible, setContainerVisible] = useState(false);

    const toggleContainer = () => {
        setContainerVisible(!isContainerVisible);




        const Form = () => {
            const [formData, setFormData] = useState({
                fullName: '',
                email: '',
                address: '',
                nis: '',
                nisn: '',
                phoneNumber: '',
                selectedClass: '',
            });

            const handleInputChange = (e) => {
                const { name, value } = e.target;
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            };


        };
    };

    const [isCardVisible, setCardVisible] = useState(false);

    const toggleCard = () => {
        setCardVisible(!isCardVisible);
    };

    const handleOpenFileExplorer = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Mengatur agar hanya file gambar yang dapat dipilih
        input.onchange = (event) => {
            // Lakukan penanganan perubahan file disini (jika diperlukan)
        };
        input.click(); // Membuka dialog penjelajah file
    };

    const Wmobile = CustomWidth() <= 767;
    const navTo = useNavigate();


    return (
        <>
            {!Wmobile ? (
                <div className="flex w-screen rounded-3xl bg-[#D9D9D9] mx-4 mt-2">
                    <div className="flex">
                        <div className="flex flex-col">
                            <button className="bg-white btn text-black w-60 h-15  border-black py-2 px-1 rounded-lg  hover:border-black hover:border-2">
                                <div>
                                    <h1 className="font-bold">Your Profile</h1>
                                    <p>See your profile here</p>
                                </div>
                            </button>
                            <button className="bg-white btn2 text-black w-60 h-15  border-black py-2 px-1 rounded-lg  hover:border-black hover:border-2 " >
                                <div>
                                    <h1 className="font-bold">Account Setting</h1>
                                    <p>Setting your profile here</p>
                                </div>
                            </button>
                        </div>
                        {isContainerVisible && (
                            <div className="container2 flex flex-row absolute   ">


                                <div className="mt-[23px] absolute" onClick={handleOpenFileExplorer}>
                                    <ProfilePicture onClick={handleOpenFileExplorer} />
                                </div>
                                <div className="ml-[140px]">
                                    <p className="mt-11 font-bold text-3xl">Upload a New Photo</p>
                                    <p>Profile-pic.jpg</p>
                                </div>
                                <div>
                                    <button className="bg-white text-black border-solid border-2 border-black py-2 px-4 rounded   :hover:text-gray-100 mt-11 ml-28 hover:text-gray-100"> Update</button>
                                </div>
                            </div>)}
                        {isContainerVisible && (
                            <Form />

                        )}
                        {isCardVisible && (
                            <div className={`bg-white border-[1px] border-black rounded-lg  absolute ml-[600px] mt-[100px] w-[450px] h-[165px] ${isCardVisible ? '' : 'blur'}`}>
                                <div className=" w-[400px]">
                                    <h2 className="text-xl font-bold"></h2>
                                    <div className="col-span-full justify-center">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium ml-[20px] mt-[-27px] text-gray-900">
                                            Cover photo
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed h-[125px] ml-[3px] w-[440px] border-gray-900/25 px-6 py-8">
                                            <div className="text-center">
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 text-base"></p>

                            </div>)}

                    </div>

                </div>
            ) : (
                <>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <div className="flex flex-col">
                                <span className="font-semibold font-inter text-xl mt-6 mx-6">Ilham</span>
                                <span className="font-semibold font-inter text-lg mt-2 mx-6">Student</span>
                            </div>
                            <img onClick={handleOpenFileExplorer} className="w-20 h-20 mt-2 ml-36" src="https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" alt="" />
                            <IoMdSettings className="absolute ml-80 mt-2 w-6 h-6" />
                        </div>
                        <div className="flex flex-col w-11/12 h-[460px] rounded-3xl bg-[#D9D9D9] mx-4 pb-16 mt-4">
                            <Form />

                        </div>
                    </div>
                    <div>
                    </div>
                </>
            )
            }
        </>
    )
};

export default ProfSet