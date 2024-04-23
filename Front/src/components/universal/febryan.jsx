import '../Styling.css';
import React from 'react';
import febryan from "../../assets/febryan2.png";
import CustomWidth from '../../CustomWidth';

function CardZev() {
    const [isFlipped, setIsFlipped] = React.useState(false);

    const handleMouseEnter = () => {
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    const WMobile = CustomWidth() <= 767;

    return (
        <div className={`flex-row `}>
            <div
                className={`flip-card ${isFlipped ? 'is-flipped' : ''} relative`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flip-card-inner-febryan border-3 border-blue-950 rounded-[20px] absolute">
                    <div className="flip-card-front absolute flex justify-center items-center border-1 rounded-lg  ">
                        <div className={`flex-col text-center text-white bg-blue-500 mt-[300px] 
                        items-center justify-center ${WMobile ? 'px-16 py-1' : 'px-20 py-2'} rounded-md `}>
                            <h1>Febryan</h1>
                            <h1>
                                Front-End Dev
                            </h1>
                        </div>
                    </div>


                    <div className="flip-card-back bg-white border-1 rounded-[20px] ">
                        <div className=" flex justify-center items-center">
                            <img src={febryan} alt="Berdua" className="rounded-full w-40 h-40 mt-[50px] object-cover" />
                        </div>
                        <div className="text-center  text-black mt-[40px] ">
                            <p className="text-lg font-semibold">Nama: Febryan Triwibowo</p>
                            <p className="text-md">Quotes: "Sometimes I ba'tu blowwww"</p>
                            <p className="text-md">Email: zeverus1234@email.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default CardZev;
