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
                <div>

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
                            <IoMdSettings className="absolute ml-80 mt-2 w-6 h-6" onClick={() => navTo('/Siskoolbe/Profile')} />
                        </div>
                        <div className="flex flex-col w-[360px] h-[460px] rounded-3xl bg-[#D9D9D9] mx-[5px] pb-16 mt-4">
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