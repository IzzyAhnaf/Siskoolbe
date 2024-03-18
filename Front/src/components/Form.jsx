import React, { useState } from 'react';
import "./Styling.css"
import CustomWidth from '../CustomWidth';


const Form = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        nis: '',
        nisn: '',
        phoneNumber: '',
        selectedClass: '',
        gender: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    const WMobile = CustomWidth() <= 767;

    return (
        <>
            {!WMobile ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className='container3 '>
                        <h1 className='font-bold text-2xl mt-4'>Change User Information Here</h1>
                        <div className="mb-4 flex flex-row ">
                            <div className='mt-4'>
                                <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[90px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                            <div className='mt-4 ml-2'>
                                <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px] border-black rounded-md bg-transparent  py-1 p-[90px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    autoComplete='none'
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4 flex flex-row">
                            <div className=''>
                                <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px] border-black rounded-md bg-transparent  py-1 p-[266px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    autoComplete='none'
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4 flex flex-row">
                            <div>
                                <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    NIS
                                </label>
                                <input
                                    type="text"
                                    id="nis"
                                    name="nis"
                                    value={formData.nis}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[90px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    autoComplete='none'
                                    required
                                />
                            </div>
                            <div className='ml-2'>
                                <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    NISN
                                </label>
                                <input
                                    type="text"
                                    id="nisn"
                                    name="nisn"
                                    value={formData.nisn}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[90px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    autoComplete='none'
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4 flex flex-row">
                            <div>
                                <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[90px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    autoComplete='none'
                                    required
                                />
                            </div>
                            <div className='ml-2'>
                                <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    NIK
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[90px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    autoComplete='none'
                                    required
                                />
                            </div>

                        </div>

                        <div className="mb-2 flex flex-row">
                            <div className=''>
                                <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                    Class
                                </label>
                                <select
                                    id="selectedClass"
                                    name="selectedClass"
                                    value={formData.selectedClass}
                                    onChange={handleInputChange}
                                    className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[124px] py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    required
                                >
                                    <option value="">Select Class</option>
                                    <option value="classA">Class A</option>
                                    <option value="classB">Class B</option>
                                    <option value="classC">Class C</option>
                                </select>
                            </div>
                            <div className='ml-2'>
                                <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                    Gender
                                </label>
                                <div className="flex items-center space-x-4">
                                    <select
                                        id="selectedClass"
                                        name="selectedClass"
                                        value={formData.selectedClass}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[114px] py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="classA">Male</option>
                                        <option value="classB">Female</option>
                                    </select>

                                </div>
                            </div>
                        </div>


                    </div>
                </form>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <div className=' justify-center items-center ml-2'>
                            <h1 className='font-bold text-[20px] mt-4'>Change User Information Here</h1>
                        </div>
                        <div className={`container5 items-center justify-center flex flex-col ${WMobile ? 'overflow-y-auto mt-[12px] slim-scroll t-[200px] h-[380px] pt-[100px] pb-[20px]' : DekstopLow ? 'overflow-y-auto slim-scroll h-96' : ''}`}>
                            <div className="comtaimer5 mb-4 flex flex-col justify-center items-center">

                                <div className='mt-4'>

                                    <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div className='mt-4'>
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent  py-1 p-[60px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>



                                <div className=''>
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent  py-1 p-[60px] text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>



                                <div>
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        NIS
                                    </label>
                                    <input
                                        type="text"
                                        id="nis"
                                        name="nis"
                                        value={formData.nis}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div >
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        NISN
                                    </label>
                                    <input
                                        type="text"
                                        id="nisn"
                                        name="nisn"
                                        value={formData.nisn}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>



                                <div>
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[60px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        autoComplete='none'
                                        required
                                    />
                                </div>
                                <div className=''>
                                    <label htmlFor="address" className="block text-sm" style={{ fontStyle: 'italic' }}>
                                        Class
                                    </label>
                                    <select
                                        id="selectedClass"
                                        name="selectedClass"
                                        value={formData.selectedClass}
                                        onChange={handleInputChange}
                                        className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[98px] py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        <option value="classA">Class A</option>
                                        <option value="classB">Class B</option>
                                        <option value="classC">Class C</option>
                                    </select>
                                </div>



                                <div>
                                    <label htmlFor="address" className="block text-sm " style={{ fontStyle: 'italic' }}>
                                        Gender
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <select
                                            id="selectedClass"
                                            name="selectedClass"
                                            value={formData.selectedClass}
                                            onChange={handleInputChange}
                                            className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[90px] py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="classA">Male</option>
                                            <option value="classB">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </form>
                </>
            )}
        </>
    );
};



export default Form;
