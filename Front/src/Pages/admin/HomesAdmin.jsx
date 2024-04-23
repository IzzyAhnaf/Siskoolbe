import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import _debounce from 'lodash/debounce';
import CustomWidth from "../../CustomWidth";
import base64ToFile from "../../base64toFile";
import ProfilePicture from "../../components/Pp";
import FormAdmin from "../../components/admin/FormAdmin";
import Swal from "sweetalert2";
import { RxExit } from "react-icons/rx";

const HomesAdmin = ({getProfileImage, setSelectedImage}) => {
    const navTo = useNavigate();
    const [formData, setFormData] = useState({});

    const update = async () => {
        try{
            const data = {
                nama: formData.nama,
                alamat: formData.alamat,
                no_hp: formData.no_hp
            }

            const encoded = JSON.stringify(data);
            const res = await api.post(`editadminProfile?email=${formData.email}`, encoded);

            if(res.status === 200){
                Swal.fire(
                    'Berhasil',
                    'Data Berhasil diubah',
                    'success'
                )
            }
        }catch(err){
            Swal.fire(
                'Gagal',
                'Data gagal diubah',
                'error'
            )
        }
    }

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
                    await api.post(`/editadminProfileImage?email=${formData.email}`, image, {
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
                    });
                } catch (error) {
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

    const getData = _debounce(async () => {
        try{
            await api.get('/admin', {
                headers: {
                    Authorization: `${sessionStorage.getItem('token')}`
                }
            }).then((res) => {
                const file = base64ToFile(res.data[0].gambar_profil, res.data[0].nama_gambar);
                setFormData({
                    nama: res.data[0].nama,
                    nik: res.data[0].nik,
                    email: res.data[0].email,
                    alamat: res.data[0].alamat,
                    no_hp: res.data[0].no_hp,
                    gambar_profil: res.data[0].gambar_profil,
                    file: file
                })
            })
        }catch(err){
            console.log(err);
        }
    })

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

    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        removeCookies('token');
        navTo('/Siskoolbe/login', {replace: true});
    }

    const Wmobile = CustomWidth() <= 767;
    
    return (
        <>
            {!Wmobile ? (
                  <div className="flex w-full rounded-3xl bg-[#D9D9D9] mx-4 p-8 font-inter">
                  <div className="flex flex-col mx-auto w-full">

                          <div className="bg-blue-500 p-4" style={{borderRadius: '10px 10px 0 0'}}>
                              <span className="text-white font-semibold text-xl">Foto Profil</span>
                          </div>
                          <div className="flex bg-white p-4 items-center space-x-8 justify-between lg:mb-10 md:mb-20"
                          style={{borderRadius: '0 0 10px 10px'}}>
                              <div className="" onClick={handleOpenFileExplorer}>
                                  <ProfilePicture onClick={handleOpenFileExplorer} gambar_profil={getProfileImage || formData.gambar_profil} />
                              </div>
                              <div className="flex space-x-8 pe-4">
                                  <div className="">
                                      <p className="font-bold text-3xl">Upload Gambar Baru</p>
                                  </div>
                                  <div>
                                      <button className="bg-white text-black border-solid border-2
                                      hover:bg-black
                                      border-black py-2 px-4 rounded hover:text-gray-100"
                                      onClick={handleOpenFileExplorer}
                                      >
                                          Upload
                                      </button>
                                  </div>
                              </div>
                          </div>

                          <div className="bg-blue-500 p-4"
                          style={{borderRadius: '10px 10px 0 0'}}>
                              <span className="text-white font-semibold text-xl">Data diri</span>
                          </div>
                          <FormAdmin nama={formData.nama} email={formData.email} nik={formData.nik} no_hp={formData.no_hp}
                          handleInputChange={handleInputChange} 
                          update={update}
                          /> 
                  </div>
              </div>
            ) : (
                <>
                    <div className="flex flex-col items-center w-full h-[88%] mx-[5px] font-inter
                    text-white">
                        <div className="bg-blue-500 border border-1 w-full p-3 border-gray-400"
                        style={{borderRadius: '10px 10px 0 0'}}>
                            <span className="text-lg font-semibold text-white">
                                Profil
                            </span>
                        </div>
                        <div className="flex flex-col items-center border border-1
                        border-gray-400 w-full h-full text-black py-4"
                        style={{borderRadius: '0 0 10px 10px'}}>
                            <img src={getProfileImage} className="object-cover w-28 h-28 rounded-full" alt="" />
                            <h4 className="text-2xl font-bold mt-3">{formData.nama}</h4>
                            <h4 className="text-sm mt-1 hover:underline" 
                            onClick={''}>{formData.email}</h4>
                            <h5 className="mt-1 text-sm font-semibold">Admin</h5>
                            <button className="bg-white mt-[60px] text-black w-60 h-15 py-2
                            rounded-lg hover:text-white hover:bg-blue-500 
                            border-2 border-blue-500" 
                            onClick={() => navTo('/Siskoolbe/Admin/ProfSet')}>
                                <div className=" justify-center items-center ">
                                    <h1 className="font-bold">Ubah Profil</h1>
                                </div>
                            </button>
                            <button className="bg-white mt-4 text-black w-60 h-15 py-2 
                            rounded-lg hover:bg-blue-500 hover:text-white border-2 
                            border-blue-500" 
                            onClick={() => navTo('/Siskoolbe/AboutUs')}>
                                <div className=" justify-center items-center ">
                                    <h1 className="font-bold">About Us</h1>
                                </div>
                            </button>

                            <button className="bg-white mt-8 w-60 h-15 py-2 rounded-lg text-red-800 hover:text-white hover:bg-red-800 border-2 border-red-800" 
                            onClick={() => logout()}>
                                <div className=" justify-center items-center flex relative">
                                    <h1 className="font-bold">Keluar</h1>
                                    <RxExit className="w-4 h-4 absolute right-4"/>
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default HomesAdmin