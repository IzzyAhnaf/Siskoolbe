import { TfiEmail } from "react-icons/tfi"
import Auth from "../Layout/Auth"
import { Link } from "react-router-dom"
import { useState } from "react";
import api from "../api";

const FGPassword = () => {
    const [email, setEmail] = useState('');
    const SEmail = async () => {
        try{
            const response = await api.post('/forgotpassword', { email });
            response.status === 200 && console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }
    return(
        <>
        <Auth type="forgotpassword">
            <div className="font-inter flex flex-col space-y-12">
                <div className="space-y-2">
                    <p className="font-semibold">Email</p>
                    <div className="flex border border-border-[#818283] rounded-md px-3 py-2 space-x-4">
                        <TfiEmail className="text-3xl" color="#1652C7"/>
                        <input type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none placeholder:text-gray-700" placeholder="Masukkan Email"/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <button className="bg-[#1E6CB1] hover:bg-white text-white hover:text-black  
                    border border-[#1E6CB1] hover:shadow-md rounded-sm px-6 py-1" type="button" onClick={SEmail}
                    >Send Email</button>
                </div>
            </div>
        </Auth>
        </>
    )
}
export default FGPassword