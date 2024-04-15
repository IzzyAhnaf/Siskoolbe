import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Form from "../../components/siswa/Form";
import { IoMdArrowBack, IoMdSettings } from "react-icons/io";
import "../Styling.css"
import CustomWidth from "../../CustomWidth";
import { useNavigate } from "react-router-dom";
import _debounce from 'lodash/debounce';
import api from "../../api";
import base64ToFile from "../../base64toFile";
import Swal from "sweetalert2";

const ProfSet = ({getProfileImage, setSelectedImage}) => {

    const [isContainerVisible, setContainerVisible] = useState(false);


    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        alamat: '',
        no_hp: '',
    });

    const getData = _debounce(async () => {
        try{
            await api.get('/siswa', {headers: {Authorization: `${sessionStorage.getItem('token')}`}}).then((res) => {
                const file = base64ToFile(res.data[0].gambar_profil, res.data[0].nama_gambar);
                setFormData({
                    nama: res.data[0].nama,
                    email: res.data[0].email,
                    alamat: res.data[0].alamat,
                    no_hp: res.data[0].no_hp,
                    file: file
                })
            })
        }catch(error){
            console.log(error);
        }
    }, 50)

    const [isCardVisible, setCardVisible] = useState(false);

    const toggleCard = () => {
        setCardVisible(!isCardVisible);
    };

    const handleOpenFileExplorer = (event) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSelectedImage(reader.result);

                try{
                    const image = new FormData();
                    image.append('image', file);
                    api.post(`/editsiswaProfileImage/${formData.email}`, image, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        Swal.fire(
                            'Berhasil',
                            'Gambar Berhasil diubah',
                            'success'
                        )
                    }).catch((err) => {
                        Swal.fire(
                            'Gagal',
                            'Gambar gagal diubah',
                            'error'
                        )
                    })
                }catch(error){
                    Swal.fire(
                        'Gagal',
                        'Gambar gagal diubah',
                        'error'
                    )
                }
            }
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

    const update = async ({ nama, alamat, no_hp }) => {
        try {
            const data = {
                nama: nama,
                alamat: alamat,
                no_hp: no_hp,
            }
    
            const encoded = JSON.stringify(data);
            const res = await api.post(`/editsiswaProfile/${formData.email}`, encoded);
    
            if (res.status === 200) {
                Swal.fire(
                    'Berhasil',
                    'Data Berhasil diubah',
                    'success'
                );
            }
        } catch (err) {
            Swal.fire(
                'Gagal',
                'Data gagal diubah',
                'error'
            );
        }
    }

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
            <div className="flex flex-col w-full">
                <IoMdArrowBack className="w-6 h-6 absolute top-0 left-0 m-4" onClick={() => navTo('/Siskoolbe/Siswa/Profile', { replace: true })}/>
                <div className="flex justify-start items-center px-2 space-x-8 mt-8">
                    <img onClick={handleOpenFileExplorer} className="w-20 h-20 mt-2 object-cover rounded-full" 
                    src={getProfileImage}
                    onError={(e) => e.target.src = 'https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'}
                    alt="" />
                    <div className="flex flex-col">
                        <span className="font-semibold font-inter text-xl">{formData.nama}</span>
                        <span className="font-inter text-md mt-1">Pelajar</span>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full mb-20 rounded-2xl bg-[#1E6CB1] pb-8 mt-4 text-white">
                    <Form nama={formData.nama} alamat={formData.alamat} no_hp={formData.no_hp} handleInputChange={handleInputChange}  
                    /> 
                    <button className="w-[80%] rounded-lg border border-1 border-green-500 text-green-500 bg-white hover:text-white hover:bg-green-500 mx-auto mt-auto py-1"
                    onClick={() => update(formData.nama, formData.alamat, formData.no_hp)}>
                        Ubah
                    </button>
                </div>
             
            </div>
            <div>

            </div>
        </>
    )
};

export default ProfSet