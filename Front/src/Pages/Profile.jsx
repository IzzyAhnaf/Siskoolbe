import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Form from "../components/Form";
import { IoMdSettings } from "react-icons/io";
import "./Styling.css"
import CustomWidth from "../CustomWidth";
import { IoIosClose } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ProfilePicture from "../components/Pp";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import FormProfGuru from "../components/FormProfilGuru";
import _debounce from 'lodash/debounce';
import api from "../api";
import base64ToFile from "../base64toFile";
import Swal from "sweetalert2";

const Profile = ({getProfileImage, setSelectedImage}) => {


    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        alamat: '',
        nik: '',
        nis: '',
        nisn: '',
        no_hp: '',
        kelas: '',
        jenis_kelamin: '',
        agama: '',
        tempat_lahir: '',
        tgl_lahir: '',
    });

    const toggleCard = () => {
        setCardVisible(!isCardVisible);
    };

    const handleOpenFileExplorer = (event) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; 
        input.onchange = async (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                setSelectedImage(reader.result);
    
                try {
                    const image = new FormData();
                    image.append('image', file);
                    await api.post(`/editsiswaProfileImage/${formData.email}`, image, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        Swal.fire(
                            'Berhasil',
                            'Data Berhasil diubah',
                            'success'
                        )
                        setFormData(prevState => ({ ...prevState, gambar_profil: reader.result }));
                    }).catch((err) => {
                        Swal.fire(
                            'Gagal',
                            'Data gagal diubah',
                            'error'
                        )
                    });
                } catch (error) {
                    Swal.fire(
                        'Gagal',
                        'Data gagal diubah',
                        'error'
                    )
                }
            };
        };
        input.click(); 
    };

    const update = async ({ nama, email, alamat, nik, nis, nisn, no_hp, agama }) => {
        try {
            const data = {
                nama: nama,
                email: email,
                alamat: alamat,
                nik: nik,
                nis: nis,
                nisn: nisn,
                no_hp: no_hp,
                agama: agama,
            }
    
            const encoded = JSON.stringify(data);
            const res = await api.post(`/editsiswaProfile/${formData.email}`, encoded);
    
            if (res.status === 200) {
                Swal.fire(
                    'Berhasil',
                    'Data Berhasil diubah',
                    'success'
                );
                getProfileImage();
            } else {
                Swal.fire(
                    'Gagal',
                    'Data gagal diubah',
                    'error'
                );
            }
        } catch (error) {
            
        }
    }
    
    
    
    const getData = _debounce(async () => {
        try{
            await api.get('/siswa', {headers: {Authorization: `${sessionStorage.getItem('token')}`}}).then((res) => {
                const file = base64ToFile(res.data[0].gambar_profil, res.data[0].nama_gambar);
                setFormData({
                    nama: res.data[0].nama,
                    email: res.data[0].email,
                    alamat: res.data[0].alamat,
                    nik: res.data[0].nik,
                    nis: res.data[0].nis,
                    nisn: res.data[0].nisn,
                    no_hp: res.data[0].no_hp,
                    kelas: res.data[0].kelas,
                    jenis_kelamin: res.data[0].jenis_kelamin,
                    agama: res.data[0].agama,
                    tempat_lahir: res.data[0].tempat_lahir,
                    tgl_lahir: res.data[0].tgl_lahir,
                    gambar_profil: 'data:image/png;base64,' + res.data[0].gambar_profil,
                    file: file
                })
            })
        }catch(error){
            console.log(error);
        }
    }, 50)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        getData();
    }, [])

    const Wmobile = CustomWidth() <= 767;
    const navTo = useNavigate();

    return (
        <>
            {!Wmobile ? (
                <div className="flex w-full rounded-3xl bg-[#D9D9D9] mx-4 p-8">
                    <div className="flex flex-col mx-auto space-y-4 w-full">
                            <div className="flex bg-white rounded-lg p-4 items-center space-x-8 justify-between">
                                <div className="" onClick={handleOpenFileExplorer}>
                                    <ProfilePicture onClick={handleOpenFileExplorer} gambar_profil={getProfileImage || formData.gambar_profil} />
                                </div>
                                <div className="flex space-x-8 pe-4">
                                    <div className="">
                                        <p className="font-bold text-3xl">Upload a New Photo</p>
                                        <p>Profile-pic.jpg</p>
                                    </div>
                                    <div>
                                        <button className="bg-white text-black border-solid border-2
                                        hover:bg-black
                                        border-black py-2 px-4 rounded hover:text-gray-100"
                                        onClick={() => update(formData)}>Update</button>
                                    </div>
                                </div>
                            </div>
                            <Form nama={formData.nama} email={formData.email} alamat={formData.alamat} nik={formData.nik} no_hp={formData.no_hp}
                            nis={formData.nis} nisn={formData.nisn} kelas={formData.kelas} jenis_kelamin={formData.jenis_kelamin} handleInputChange={handleInputChange}  
                            /> 
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
                            <IoMdSettings className="absolute ml-80 mt-2 w-6 h-6" onClick={() => navTo('/Siskoolbe/Profile')} />
                        </div>
                        <div className="flex flex-col items-center justify-center  w-[360px] h-[460px] rounded-3xl bg-[#D9D9D9] mx-[5px] mt-4">
                            <div className="flex flex-col">
                                <button className="bg-white text-black w-60 h-15   border-black py-2 px-1 rounded-lg  hover:border-black hover:border-2">
                                    <div>
                                        <h1 className="font-bold">Your Profile</h1>
                                        <p>See your profile here</p>
                                    </div>
                                </button>
                                <button className="bg-white justify-center items-center mt-[20px] text-black w-60 h-15  border-black py-2  rounded-lg  hover:border-black hover:border-2 " onClick={() => navTo('/Siskoolbe/ProfSet')}>
                                    <div className=" justify-center items-center ">
                                        <h1 className="font-bold">Account Setting</h1>
                                        <p>Setting your profile here</p>
                                    </div>
                                </button>
                            </div>

                        </div>
                    </div>

                </>
            )}
        </>
    )
};

export default Profile