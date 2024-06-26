import React, { useState } from 'react';
import '../Styling.css'; // Pindahkan import ini ke atas file jika diperlukan
import gilang from "../../assets/gilang.png";
import CustomWidth from '../../CustomWidth';

function CardGilang() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseEnter = () => {
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    const WMobile = CustomWidth() <= 767;

    return (
        <div className='flex-row'>
            <div
                className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flip-card-inner-gilang border-3 border-blue-950 rounded-[20px] absolute">
                    <div className="flip-card-front absolute flex justify-center items-center border-1 rounded-lg  ">
                        <div className={`flex-col text-center text-white bg-blue-500 mt-[300px] 
                        items-center justify-center ${WMobile ? 'px-16 py-1' : 'px-20 py-2'} rounded-md `}>
                            <h1>Gilang</h1>
                            <h1>
                                UI/UX
                                Designer
                            </h1>
                        </div>
                    </div>



                    <div className="flip-card-back bg-white border-1 rounded-[20px]">
                        <div className=" flex justify-center items-center">
                            <img src={gilang} alt="Berdua" className="rounded-full w-40 h-40 mt-[50px] object-cover bg-white" />
                        </div>
                        <div className="text-center  text-black mt-[40px] ">
                            <p className="text-lg font-semibold">Nama: Gilang Aliansyah</p>
                            <p className="text-md my-5">"Sudah terlambat jika menyesal. Realita akan terus bergerak dengan kejamnya"</p>
                            <p className="text-md">Email: gilangaliansyah35@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CardGilang;
