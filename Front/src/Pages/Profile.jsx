import { Link } from "react-router-dom";
import React, { useState } from 'react';
import Form from "../components/Form";

import "./Styling.css"
import CustomWidth from "../CustomWidth";
import { IoIosClose } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ProfilePicture from "../components/Pp";

const Profile = () => {

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

    return (
        <>
            {!Wmobile ? (
                <div className="flex flex-row">
                    <aside className="flex flex-col h-[620px] mt-2 px-4 py-8 ml-2 overflow-y-auto rounded-3xl bg-sky-700">
                        <a href="#" className="mx-auto">
                        </a>
                        <div className="flex flex-col items-center mt-6 mx-2">
                            <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                            <h4 className="mx-2 mt-2 font-medium text-gray-100 dark:text-gray-200">John Doe</h4>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-100 dark:text-gray-400">Student</p>
                        </div>
                        <div className="flex flex-row justify-center flex-1 mt-6 ">
                            <nav>
                                <Link className="flex flex-col items-center px-4 py-2 text-gray-100 rounded-lg dark:bg-gray-100 dark:bg-opacity-50 dark:text-gray-200 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100" to="/Siskoolbe">
                                    <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3c0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8c24.9-25 24.9-65.5-.1-90.5"></path></svg>
                                    <span className="font-medium font-inter">Home</span>
                                </Link>

                                <Link className="flex flex-col items-center px-4 py-2 mt-5 text-gray-700  bg-gray-100 duration-300 transform rounded-lg dark:text-gray-100 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100" to="#">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="mx-4 font-medium font-inter">Profile</span>
                                </Link>

                                <a className="flex flex-col items-center px-4 py-2 mt-5 text-gray-100 duration-300 transform rounded-lg dark:text-gray-100 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100" href="#">
                                    <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1792 993q60 41 107 93t81 114t50 131t18 141q0 119-45 224t-124 183t-183 123t-224 46q-91 0-176-27t-156-78t-126-122t-85-157H128V128h256V0h128v128h896V0h128v128h256zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256zm643 1280q-3-31-3-64q0-119 45-224t124-183t183-123t224-46q100 0 192 33V640H256v896zm573 384q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36m64-512h192v128h-320v-384h128z"></path></svg>
                                    <span className="mx-4 font-medium text-center font-inter">Izin</span>
                                </a>
                            </nav>
                        </div>
                    </aside>

                    <div className="flex w-screen rounded-3xl bg-[#D9D9D9] mx-4 mt-2">
                        <div className="flex">
                            <div className="flex flex-col">
                                <button className="bg-white btn text-black w-60 h-15  border-black py-2 px-1 rounded-lg  hover:border-black hover:border-2">
                                    <div>
                                        <h1 className="font-bold">Your Profile</h1>
                                        <p>See your profile here</p>
                                    </div>
                                </button>
                                <button onClick={toggleContainer} className="bg-white btn2 text-black w-60 h-15  border-black py-2 px-1 rounded-lg  hover:border-black hover:border-2 ">
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
                </div>
            ) : (
                <>
                    <div className="flex flex-row">
                        <aside className="flex flex-col h-[620px] mt-2 px-4 py-8 ml-2 overflow-y-auto rounded-3xl bg-sky-700">
                            <a href="#" className="mx-auto">
                            </a>
                            <div className="flex flex-col items-center mt-6 mx-2">
                                <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
                                <h4 className="mx-2 mt-2 font-medium text-gray-100 dark:text-gray-200">John Doe</h4>
                                <p className="mx-2 mt-1 text-sm font-medium text-gray-100 dark:text-gray-400">Student</p>
                            </div>
                            <div className="flex flex-row justify-center flex-1 mt-6 ">
                                <nav>
                                    <Link className="flex flex-col items-center px-4 py-2 text-gray-100 rounded-lg dark:bg-gray-100 dark:bg-opacity-50 dark:text-gray-200 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100" to="/Siskoolbe">
                                        <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3c0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8c24.9-25 24.9-65.5-.1-90.5"></path></svg>
                                        <span className="font-medium font-inter">Home</span>
                                    </Link>

                                    <Link className="flex flex-col items-center px-4 py-2 mt-5 text-gray-700  bg-gray-100 duration-300 transform rounded-lg dark:text-gray-100 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100" to="#">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <span className="mx-4 font-medium font-inter">Profile</span>
                                    </Link>

                                    <a className="flex flex-col items-center px-4 py-2 mt-5 text-gray-100 duration-300 transform rounded-lg dark:text-gray-100 hover:bg-gray-300 hover:bg-opacity-50 dark:hover:text-gray-100 hover:text-gray-100" href="#">
                                        <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1792 993q60 41 107 93t81 114t50 131t18 141q0 119-45 224t-124 183t-183 123t-224 46q-91 0-176-27t-156-78t-126-122t-85-157H128V128h256V0h128v128h896V0h128v128h256zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256zm643 1280q-3-31-3-64q0-119 45-224t124-183t183-123t224-46q100 0 192 33V640H256v896zm573 384q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36m64-512h192v128h-320v-384h128z"></path></svg>
                                        <span className="mx-4 font-medium text-center font-inter">Izin</span>
                                    </a>
                                </nav>
                            </div>
                        </aside>

                        <div className="flex w-screen rounded-3xl bg-[#D9D9D9] mx-4 mt-2">
                            <div className="flex">
                                <div className="flex flex-col">
                                    <button className="bg-white btn text-black w-60 h-15  border-black py-2 px-1 rounded-lg  hover:border-black hover:border-2">
                                        <div>
                                            <h1 className="font-bold">Your Profile</h1>
                                            <p>See your profile here</p>
                                        </div>
                                    </button>
                                    <button onClick={toggleContainer} className="bg-white btn2 text-black w-60 h-15  border-black py-2 px-1 rounded-lg  hover:border-black hover:border-2 ">
                                        <div>
                                            <h1 className="font-bold">Account Setting</h1>
                                            <p>Setting your profile here</p>
                                        </div>
                                    </button>
                                </div>
                                {isCardVisible && (
                                    <div className={`bg-white border-[1px] border-black rounded-lg  absolute ml-[600px] mt-[100px] w-[450px] h-[165px] ${isCardVisible ? '' : 'blur'}`}>
                                        <div className=" w-[400px]">
                                            <h2 className="text-xl font-bold"></h2>
                                            <AiOutlineCloseCircle onClick={toggleCard} className="text-3xl ml-[417px]  rounded-full " />
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

                                {isContainerVisible && (
                                    <div className={` ${isCardVisible ? 'blur' : ''}`}>
                                        <Form />
                                    </div>)
                                }


                                {isCardVisible && (
                                    <div className={`bg-white border-[1px] border-black rounded-lg  absolute ml-[600px] mt-[100px] w-[450px] h-[165px] ${isCardVisible ? '' : 'blur'}`}>
                                        <div className=" w-[400px]">
                                            <h2 className="text-xl font-bold"></h2>
                                            <AiOutlineCloseCircle onClick={toggleCard} className="text-3xl ml-[417px]  rounded-full " />
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
                    </div >





                </>
            )}
        </>
    )
};

export default Profile