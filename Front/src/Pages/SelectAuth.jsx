import { useNavigate } from "react-router-dom";
import { MobileWidth } from "../MobileWidth";

const SelectAuth = () => {
    const navTo = useNavigate();
    const WMobile = MobileWidth() <= 767;
    return (
        <div className="bg-[#1E6CB1] flex flex-col items-center justify-center h-screen text-white">
            <img src="logo-onedek.png" alt="" className="bg-[#D9D9D9] rounded-2xl size-48" />
            <h3 className="text-3xl font-inter font-bold mt-4">SMKN 1 Depok</h3>
            {WMobile && (
                <>
                    <div className="w-5/6 mt-3">
                        <p className="font-inter text-center text-sm">
                        SMK Negeri 1 Depok adalah sebuah Sekolah Menengah Kejuruan (SMK) Negeri pertama di Kota Depok dan telah mendapat status sekolah PK (Pusat Keunggulan) dan status sekolah BLUD (Badan Layanan Umum Daerah)
                        </p>
                    </div>
                </>
            )}
            <div className="font-inter grid grid-cols-1 space-y-4 mt-12">
                <button type="button" className="rounded-md border border-white 
                bg-white text-black hover:text-white hover:bg-black hover:border-black px-20 py-1"
                onClick={() => navTo('/Siskoolbe/Login')}>Sign In</button>
                <button type="button" className="rounded-md border border-white 
                bg-white text-black hover:text-white hover:bg-black hover:border-black px-20 py-1"
                onClick={() => navTo('/Siskoolbe/Register')}>Sign Up</button>
            </div>
        </div>
    );
};

export default SelectAuth