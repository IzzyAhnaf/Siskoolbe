import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Form from "../../components/siswa/Form";
import { IoMdSettings } from "react-icons/io";
import "../Styling.css"
import CustomWidth from "../../CustomWidth";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import _debounce from 'lodash/debounce';

const ProfSet = () => {

    const [isContainerVisible, setContainerVisible] = useState(false);

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

    // const toggleContainer = () => {
    //     setContainerVisible(!isContainerVisible);

    //     const Form = () => {
    //         const [formData, setFormData] = useState({
    //             fullName: '',
    //             email: '',
    //             address: '',
    //             nis: '',
    //             nisn: '',
    //             phoneNumber: '',
    //             selectedClass: '',
    //         });

    //         const handleInputChange = (e) => {
    //             const { name, value } = e.target;
    //             setFormData((prevData) => ({
    //                 ...prevData,
    //                 [name]: value,
    //             }));
    //         };


    //     };
    // };

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

        }
    }, 50)

    const [isCardVisible, setCardVisible] = useState(false);

    const toggleCard = () => {
        setCardVisible(!isCardVisible);
    };

    const handleOpenFileExplorer = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            
        };
        input.click(); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const Wmobile = CustomWidth() <= 767;
    const navTo = useNavigate();

    useEffect(() => {
        if (!Wmobile) {
            navTo('/Siskoolbe/Siswa/Profile', { replace: true });
        }else{
            getData();
        }
    }, []) 

    return (
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
                        <Form nama={formData.nama} email={formData.email} alamat={formData.alamat} nik={formData.nik} no_hp={formData.no_hp}
                        nis={formData.nis} nisn={formData.nisn} kelas={formData.kelas} jenis_kelamin={formData.jenis_kelamin} handleInputChange={handleInputChange}  
                        /> 
                    </div>
            </div>
            <div>

            </div>
        </>
    )
};

export default ProfSet