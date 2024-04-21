import React, { useEffect, useState } from 'react';
import FormProfGuru from "../../components/guru/FormProfilGuru";
import { IoMdArrowBack, IoMdSettings } from "react-icons/io";
import "../Styling.css"
import { useNavigate } from "react-router-dom";
import _debounce from 'lodash/debounce';
import api from "../../api";
import base64ToFile from '../../base64toFile';
import Swal from 'sweetalert2';


const ProfSetGr = ({getProfileImage, setSelectedImage}) => {

    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        alamat: '',
        nik: '',
        no_hp: '',
        kelas: '',
        jenis_kelamin: '',
        agama: '',
        tempat_lahir: '',
        tgl_lahir: '',
    });

    const [nama, setNama] = useState('')

    const navTo = useNavigate();

    const update = async () => {
        try{
            const data = {
                nama: formData.nama,
                alamat: formData.alamat,
                no_hp: formData.no_hp
            }

            const encoded = JSON.stringify(data);
            const res = await api.post(`editguruProfile/${formData.email}`, encoded);

            if(res.status === 200){
                Swal.fire(
                    'Berhasil',
                    'Data Berhasil diubah',
                    'success'
                ).then(() => {
                    getData();
                })
            }
        }catch(err){
            Swal.fire(
                'Gagal',
                'Data gagal diubah',
                'error'
            )
        }
    }

    const getData = _debounce(async () => {
        try{
            await api.get('/guru', {
                headers: {
                    Authorization: `${sessionStorage.getItem('token')}`
                }
            }).then((res) => {
                const file = base64ToFile(res.data[0].gambar_profil, res.data[0].nama_gambar);
                setFormData({
                    nama: res.data[0].nama,
                    email: res.data[0].email,
                    alamat: res.data[0].alamat,
                    nik: res.data[0].nik,
                    no_hp: res.data[0].no_hp,
                    jenis_kelamin: res.data[0].jenis_kelamin,
                    agama: res.data[0].agama,
                    tempat_lahir: res.data[0].tempat_lahir,
                    tgl_lahir: res.data[0].tgl_lahir,
                    gambar_profil: 'data:image/png;base64,' + res.data[0].gambar_profil,
                    file: file
                })
                setNama(res.data[0].nama);
            })
        }catch(err){
            console.log(err);
        }
    }, 50)

    const handleOpenFileExplorer = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Mengatur agar hanya file gambar yang dapat dipilih
        input.onchange = (event) => {
            // Lakukan penanganan perubahan file disini (jika diperlukan)
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                setSelectedImage(reader.result);
                try{
                    const image = new Image();
                    image.append('image', file);
                    await api.post(`editguruProfileImage/${formData.email}`, image, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        Swal.fire(
                            'Berhasil',
                            'Gambar Berhasil diubah',
                            'success'
                        )
                        setFormData(prevState => ({ ...prevState, gambar_profil: reader.result }));
                    }).catch((err) => {
                        Swal.fire(
                            'Gagal',
                            'Gambar gagal diubah',
                            'error'
                        )
                    })
                }catch(err){
                    Swal.fire(
                        'Gagal',
                        'Gambar gagal diubah',
                        'error'
                    )
                }
            };
        };
        input.click(); 
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        getData();
    }, [nama])

    return (
        <>
           <div className="flex flex-col w-full font-inter">
                <IoMdArrowBack className="w-6 h-6 absolute top-0 left-0 m-4" onClick={() => navTo('/Siskoolbe/Guru/ProfileGuru', { replace: true })}/>

                <div className="border border-1 mt-12 bg-blue-500 p-2"
                style={{borderRadius: '10px 10px 0 0'}}>
                    <span className="text-md p-3 text-white font-semibold">Foto Profil</span>
                </div>
                <div className="flex justify-start items-center space-x-8 border-1 border p-2"
                style={{borderRadius: '0 0 10px 10px'}}>
                    <img onClick={handleOpenFileExplorer} 
                    className="w-20 h-20 object-cover rounded-full" 
                    src={getProfileImage}
                    onError={(e) => e.target.src = 'https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'}
                    alt="" />
                    <div className="flex flex-col">
                        <span className="font-semibold font-inter text-xl">{nama}</span>
                        <span className="font-inter text-md mt-1">Guru</span>
                    </div>
                </div>

                <div className='justify-center items-center mt-4 bg-blue-500 border border-1'
                style={{borderRadius: '10px 10px 0 0'}}>
                    <h1 className='font-semibold text-md p-3 text-white'>Data Diri</h1>
                </div>
                <div className="flex flex-col w-full h-full rounded-2xl bg-white pb-8 overflow-y-auto hidden-scroll mb-10 text-white border-1 border"
                style={{borderRadius: '0 0 10px 10px'}}>
                    <FormProfGuru nama={formData.nama} alamat={formData.alamat} no_hp={formData.no_hp} 
                    jenis_kelamin={formData.jenis_kelamin} agama={formData.agama} tempat_lahir={formData.tempat_lahir} tgl_lahir={formData.tgl_lahir}
                    nik={formData.nik} email={formData.email}
                    handleInputChange={handleInputChange}
                    /> 
                    <button className="w-[80%] rounded-lg border border-1 border-green-500 text-green-500 bg-white hover:text-white hover:bg-green-500 mx-auto mt-auto py-1"
                    onClick={() => update()}>
                        Ubah
                    </button>
                </div>
             
            </div>
            <div>

            </div>
        </>
    )
};

export default ProfSetGr;