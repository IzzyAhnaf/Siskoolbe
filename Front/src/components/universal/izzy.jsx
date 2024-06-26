import '../Styling.css';
import React from 'react';
import izzy from "../../assets/izzy.png"
import CustomWidth from '../../CustomWidth';


function CardIzzy() {
    const [isFlipped, setIsFlipped] = React.useState(false);

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
                <div className="flip-card-inner-izzy border-1 rounded-[20px] ">
                    <div className="flip-card-front flex justify-center items-center border-1 rounded-lg  ">
                        <div className={`flex-col text-center text-white bg-blue-500 mt-[300px] 
                        items-center justify-center ${WMobile ? 'px-16 py-1' : 'px-20 py-2'} rounded-md `}>
                            <h1>Izzy</h1>
                            <h1>
                                Back-End Dev
                            </h1>
                        </div>
                    </div>


                    <div className="flip-card-back border-1 bg-white rounded-[20px] ">
                        <div className=" flex justify-center items-center">
                            <img src={izzy} alt="" className="rounded-full w-40 h-40 mt-[50px] object-cover bg-white" />
                        </div>
                        <div className="text-center  text-black mt-[40px] ">
                            <p className="text-lg font-semibold">Nama: Izzy Ahnaf</p>
                            <p className="text-md my-5 ">"Jalan yang sulit sering kali mengarah ke tujuan yang indah"</p>
                            <p className="text-md">Email: izzyahnaf695@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CardIzzy;
