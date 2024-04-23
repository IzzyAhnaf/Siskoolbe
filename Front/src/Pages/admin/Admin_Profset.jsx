import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import _debounce from 'lodash/debounce';
import api from "../../api";
import CustomWidth from "../../CustomWidth";
import { IoMdArrowBack } from "react-icons/io";
import FormAdmin from "../../components/admin/FormAdmin";
import base64ToFile from "../../base64toFile";


const AdminProfset = ({getProfileImage, setSelectedImage}) => {
    const navTo = useNavigate();
    const Wmobile = CustomWidth() <= 767;
    const [formData, setFormData] = useState({})

    const update = async () => {
        try{
            const data = {
                nama: formData.nama,
                nik: formData.nik,
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


    useEffect(() => {
        if (!Wmobile) {
            navTo('/Siskoolbe/Siswa/Profile', { replace: true });
        }else{
            getData();
        }
    }, []) 

    return(
        <>
             <div className="flex flex-col w-full font-inter overflow-y-auto">
                <IoMdArrowBack className="w-6 h-6 absolute top-0 left-0 m-4" onClick={() => navTo('/Siskoolbe/Siswa/Profile', { replace: true })}/>

                <div className="border border-1 mt-12 bg-blue-500 p-2"
                style={{borderRadius: '10px 10px 0 0'}}>
                    <span className="text-md p-3 text-white font-semibold">Foto Profil</span>
                </div>
                <div className="flex justify-start items-center p-2 space-x-8 border border-1"
                style={{borderRadius: '0 0 10px 10px'}}>
                    <img onClick={handleOpenFileExplorer} className="w-20 h-20 mt-2 object-cover rounded-full" 
                    src={getProfileImage}
                    onError={(e) => e.target.src = 'https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'}
                    alt="" />
                    <div className="flex flex-col">
                        <span className="font-semibold font-inter text-xl">{formData.nama}</span>
                        <span className="font-inter text-md mt-1">Pelajar</span>
                    </div>
                </div>

                <div className='justify-center items-center mt-4 bg-blue-500 border border-1'
                style={{borderRadius: '10px 10px 0 0'}}>
                    <h1 className='font-semibold text-md p-3 text-white'>Data Diri</h1>
                </div>
                <div className="flex flex-col w-full h-full overflow-y-auto hidden-scroll mb-20 bg-white pb-8 border border-1"
                style={{borderRadius: '0 0 10px 10px'}}>
                    <FormAdmin nama={formData.nama} no_hp={formData.no_hp} email={formData.email} nik={formData.nik}
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
}

export default AdminProfset