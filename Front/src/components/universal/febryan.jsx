import '../Styling.css';
import React from 'react';
import berdua from '../../assets/berdua.png';

function CardZev() {
    const [isFlipped, setIsFlipped] = React.useState(false);

    const handleMouseEnter = () => {
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    return (
        <div className='flex-row'>
            <div
                className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flip-card-inner border-1 border-blue rounded-[20px] ">
                    <div className="flip-card-front-gilang flex justify-center items-center border-1 rounded-lg  ">
                        <div className=" flex-col text-center text-white bg-blue-500 mt-[300px] py-2 items-center  justify-center px-20 rounded-md ">
                            <h1>Febryan</h1>
                            <h1>
                                Front-End Dev
                            </h1>
                        </div>
                    </div>


                    <div className="flip-card-back bg-white border-1 rounded-[20px] mt-[-364px]">
                        <div className="bg-berdua flex justify-center items-center">
                            <img src={berdua} alt="Berdua" className="rounded-full w-40 h-40 mt-[50px] object-cover" />
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
