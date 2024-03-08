import { useNavigate } from "react-router-dom";

const SelectAuth = () => {
    const navTo = useNavigate();
    return (
        <div className="bg-black flex flex-col items-center justify-center h-screen text-white">
            <img src="logo-onedek.png" alt="" className="bg-[#D9D9D9] rounded-lg size-48" />
            <h3 className="text-3xl font-inter font-bold mt-4">SMKN 1 Depok</h3>
            <div className="font-inter grid grid-cols-1 space-y-4 mt-12">
                <button type="button" className="rounded-md border border-white bg-black text-white hover:text-black hover:bg-white px-20 py-1"
                onClick={() => navTo('/Siskoolbe/Login')}>Sign In</button>
                <button type="button" className="rounded-md border border-white bg-black text-white hover:text-black hover:bg-white px-20 py-1"
                onClick={() => navTo('/Siskoolbe/Register')}>Sign Up</button>
            </div>
        </div>
    );
};

export default SelectAuth