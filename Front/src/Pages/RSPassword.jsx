import { useState } from "react";
import Auth from "../Layout/Auth"
import api from "../api";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";

const RSPassword = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Cpassword, setCPassword] = useState('');
    const Send = async () => {
        if(password !== Cpassword){
            const resp = await api.post("/resetpassword", { email, password });  
            resp.status === 200 ? window.location.href = '/Siskoolbe/Login' : console.log(resp.data);
        }else{
            alert("Password tidak sama");
        }
    }
    return(
        <>
        <Auth type="resetpassword">
            <div className="font-inter flex flex-col space-y-8">
                <div className="space-y-2">
                    <p className="font-semibold">Email</p>
                    <div className="flex border border-black rounded-md px-3 py-2 space-x-4">
                        <TfiEmail className="text-3xl" />
                        <input type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none placeholder:text-gray-700" placeholder="Enter your Email here"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold">Kata Sandi</p>
                    <div className="flex border border-black rounded-md px-3 py-2 space-x-4">
                        {show ? <FaRegEyeSlash className="text-3xl" onClick={() => setShow(!show)}/> : <FaRegEye className="text-3xl" onClick={() => setShow(!show)}/>}
                        <input type={show ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none placeholder:text-gray-700" placeholder="Masukkan Password Baru"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold">Konfirmasi Kata Sandi</p>
                    <div className="flex border border-black rounded-md px-3 py-2 space-x-4">
                        <FaRegEye className="text-3xl" />
                        <input type="text" 
                        value={Cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        className="outline-none placeholder:text-gray-700" placeholder="Konfirmasi Password"/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <button className="bg-black hover:bg-white text-white hover:text-black  
                    border border-black rounded-sm px-6 py-2" type="button" onClick={Send}
                    >Reset Password</button>
                </div>
            </div>
        </Auth>
        </>
    )
}
export default RSPassword