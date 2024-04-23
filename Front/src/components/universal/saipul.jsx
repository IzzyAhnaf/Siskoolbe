import '../Styling.css';
import React from 'react';
import ipul from "../../assets/febryan2.png"
import CustomWidth from '../../CustomWidth';

function CardIpul() {
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
                <div className="flip-card-inner-saipul border-1 rounded-[20px] ">
                    <div className="flip-card-front flex justify-center items-center border-1 rounded-lg  ">
                        <div className={`flex-col text-center text-white bg-blue-500 mt-[300px] 
                        items-center justify-center ${WMobile ? 'px-16 py-1' : 'px-20 py-2'} rounded-md `}>
                            <h1>Saipul</h1>
                            <h1>
                                Front-End Dev
                            </h1>
                        </div>
                    </div>


                    <div className="flip-card-back border-1 bg-white rounded-[20px]  ">
                        <div className="bg-berdua flex justify-center items-center">
                            <img src={ipul} alt='' className="rounded-full w-40 h-40 mt-[50px] object-cover bg-white" />
                        </div>
                        <div className="text-center  text-black mt-[40px] ">
                            <p className="text-lg font-semibold">Nama: Syaiful Ilham</p>
                            <p className="text-md">Quotes: "Quote goes here"</p>
                            <p className="text-md">Email: @email.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CardIpul;
