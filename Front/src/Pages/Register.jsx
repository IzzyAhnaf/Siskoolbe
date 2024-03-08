import { RiAccountCircleLine } from "react-icons/ri"
import Auth from "../Layout/Auth"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { BsFillPersonVcardFill } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [nik, setNik] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const HRegister = async () => {
        try{
        const response = await api.post('/register', { name, nik, email, password });
        response.status === 200 ? window.location.href = '/Siskoolbe/Login' : console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }
    return(
        <Auth type="register">
            <div className="font-inter flex flex-col space-y-3 placeholder:text-sm text-sm">
                <div className="space-y-1">
                    <p className="font-semibold">Nik</p>
                    <div className="flex border border-black rounded-md px-5 py-2 space-x-4">
                        <BsFillPersonVcardFill className="text-3xl" />
                        <input type="number" 
                        value={nik}
                        maxLength={16}
                        onChange={(e) => setNik(e.target.value)}
                        className="outline-none placeholder:text-gray-700 no-InDecrement" 
                        placeholder="Enter your Nik here"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="font-semibold">Name</p>
                    <div className="flex border border-black rounded-md px-5 py-2 space-x-4">
                        <RiAccountCircleLine className="text-3xl" />
                        <input type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none placeholder:text-gray-700" 
                        placeholder="Enter your Name here"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="font-semibold">Email</p>
                    <div className="flex border border-black rounded-md px-5 py-2 space-x-4">
                        <TfiEmail className="text-3xl" />
                        <input type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none placeholder:text-gray-700" 
                        placeholder="Enter your Email here"/>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="font-semibold">Password</p>
                    <div className="flex border border-black rounded-md px-5 py-2 space-x-4">
                        {show ? <FaRegEyeSlash className="text-3xl" onClick={() => setShow(!show)}/> : <FaRegEye className="text-3xl" onClick={() => setShow(!show)}/>}
                        <input type={show ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none placeholder:text-gray-700" 
                        placeholder="Enter your Password here"/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <button className="bg-black hover:bg-white text-white hover:text-black  
                    border border-black rounded-sm px-6 py-2 mt-4" type="button" onClick={HRegister}
                    >Register</button>
                </div>
            </div>
        </Auth>
    )
}

export default Register