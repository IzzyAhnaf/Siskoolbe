import { Link } from "react-router-dom";
import Auth from "../Layout/Auth";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import api from "../api";


const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const HLogin = async () => {
        try{
        const response = await api.post('/login', { email, password });
        response.status === 200 ? [localStorage.setItem('token', response.data.token), 
        window.location.href = '/Siskoolbe/'] : console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <Auth type="login">
            <div className="font-inter flex flex-col space-y-4">
                <div className="space-y-2">
                    <p className="font-semibold">Email</p>
                    <div className="flex border border-black rounded-md px-3 py-2 space-x-4">
                        <RiAccountCircleLine className="text-3xl" />
                        <input type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none placeholder:text-gray-700" placeholder="Enter your Email here"/>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="font-semibold">Password</p>
                    <div className="flex border border-black rounded-md px-3 py-2 space-x-4">
                        {show ? <FaRegEyeSlash className="text-3xl" onClick={() => setShow(!show)}/> : <FaRegEye className="text-3xl" onClick={() => setShow(!show)}/>}
                        <input type={show ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none placeholder:text-gray-700" 
                        placeholder="Enter your Password here"/>
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <Link to={"/Siskoolbe/forgotpassword"} className="text-black text-sm underline ml-auto">Forgot Your Password?</Link>
                    <button className="bg-[#1E6CB1] hover:bg-white text-white hover:text-black  
                    border border-[#1E6CB1] hover:shadow-md rounded-sm px-6 py-1" type="button" onClick={HLogin}
                    >Sign In</button>
                </div>
            </div>
        </Auth>
    );
};

export default Login