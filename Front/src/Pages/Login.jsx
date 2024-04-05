import { Link } from "react-router-dom";
import Auth from "../Layout/Auth";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import api from "../api";
import { setCookies } from "../setCookies";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";


const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [check, setCheck] = useState(false);
    const [password, setPassword] = useState('');
    const HLogin = async () => {
        try{
        const response = await api.post('/login', { email, password });
            if(response.status === 200){
                Swal.fire(
                    'Berhasil',
                    'Login Berhasil',
                    'success'
                ).then(() => {                    
                    if(check === true){
                        setCookies('token', response.data.token, 30)
                    }            
                    sessionStorage.setItem('token', response.data.token);
                    window.location.href = '/Siskoolbe/'
                })
            }
            else{ 
                Swal.fire(
                    'Gagal',
                    'Email atau Password salah',
                    'error'
                )
            }
        }catch(err){
            Swal.fire(
                'Gagal',
                'Email atau Password salah',
                'error'
            )
        }
    }

    return (
        <Auth type="login">
            <div className="font-inter flex flex-col space-y-4">
                <div className="space-y-2">
                    <p className="font-semibold">Email</p>
                    <div className="flex border border-[#818283] rounded-md px-3 py-2 space-x-4">
                        <RiAccountCircleLine className="text-3xl" color="#1652C7"/>
                        <input type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none placeholder:text-gray-700" placeholder="Masukkan Email"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold">Password</p>
                    <div className="flex border border-[#818283] rounded-md px-3 py-2 space-x-4">
                        <IoIosLock className="text-3xl" color="#1652C7"/>
                        <input type={show ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none placeholder:text-gray-700 w-full" 
                        placeholder="Masukkan Kata Sandi"/>
                        {show ? <FaRegEyeSlash className="text-3xl" color="#B8B8D6" onClick={() => setShow(!show)}/> : <FaRegEye className="text-3xl" color="#B8B8D6" onClick={() => setShow(!show)}/>}
                    </div>
                </div>
                <div className="flex space-y-2 items-center">
                    <p className="font-semibold"></p>
                    <div className="flex rounded-md px-3 py-2 space-x-4">
                        <input type="checkbox" 
                        className="outline-none placeholder:text-gray-700"
                        onChange={(e) => 
                            {
                                setCheck(!check)
                            }
                        }
                        value={check}/>
                        <p className="text-sm">Ingat Saya</p>
                    </div>
                    <Link to={"/Siskoolbe/forgotpassword"} className="text-black text-sm underline ml-auto">Lupa Kata Sandi?</Link>
                </div>
                <div className="flex flex-col space-y-6">
                    <button className="bg-[#1E6CB1] hover:bg-white text-white hover:text-black  
                    border border-[#1E6CB1] hover:shadow-md rounded-sm px-6 py-1" type="button" onClick={HLogin}
                    >Log In</button>
                </div>
            </div>
        </Auth>
    );
};

export default Login