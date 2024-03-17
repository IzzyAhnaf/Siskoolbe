import React from "react";
import MapComponent from "../components/Maps";
import { IoMdSettings } from "react-icons/io";
import CustomWidth from "../CustomWidth";

const Checkin = () => {
    const WMobile = CustomWidth() <= 767;

    const handleAbsenClick = () => {
        // Define your logic for handling the "Absen Masuk" button click here
        alert('Absen Masuk button clicked!');
    };

    return (
        <>
        {!WMobile ? (
             <div className="flex flex-col items-center rounded-xl bg-[#D9D9D9] mx-6 mt-0 w-screen">
             <MapComponent/>
             <button 
                className='bg-[#269400] text-white rounded-md py-2 px-5 mt-5 text-base text-center items-center w-3/5 font-medium' 
                type="button"
                onClick={handleAbsenClick} // Add onClick event handler
             >
                Absen Masuk
             </button>
             </div>
        ):(
            <>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <span className="font-semibold font-inter text-xl mt-6 mx-6">Ilham</span>
                  <span className="font-semibold font-inter text-lg mt-2 mx-6">Student</span>
                </div>
                <img className="w-20 h-20 mt-2 ml-36" src="https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" alt="" />
                <IoMdSettings className="absolute ml-80 mt-2 w-6 h-6" onClick={() => navTo('./Profile')} />
              </div>
              <div className="flex flex-col items-center rounded-xl bg-[#D9D9D9] mx-4 w-full justify-center h-full mt-2 py-4"> 
                <MapComponent />
                <button 
                    className='bg-[#269400] text-white rounded-md py-2 px-5 mt-5 text-base text-center items-center w-3/5 font-medium mb-5' 
                    type="button"
                    onClick={handleAbsenClick} // Add onClick event handler
                >
                    Absen Masuk
                </button>
              </div>
            </div>
            </>
        )}
        </>
        
    )
}
export default Checkin;
