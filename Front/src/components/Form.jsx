import React, { useState } from 'react';
import "./Styling.css"

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

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className='container3 '>
                <h1 className='font-bold text-2xl mt-4'>Change User Information Here</h1>
                <div className="mb-4 flex flex-row ">
                    <div className='mt-4'>
                        <label htmlFor="address" className="block text-sm mb-2" style={{ fontStyle: 'italic' }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="block flex-1 border-[1px] border-black rounded-md bg-transparent p-[90px] py-1  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            autoComplete='none'
                            required
                        />
                    </div>
                    <div className='mt-4 ml-2'>
                        <label htmlFor="address" className="block text-sm mb-2" style={{ fontStyle: 'italic' }}>
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
                        <label htmlFor="address" className="block text-sm mb-2" style={{ fontStyle: 'italic' }}>
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
                        <label htmlFor="address" className="block text-sm mb-2" style={{ fontStyle: 'italic' }}>
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
                        <label htmlFor="address" className="block text-sm mb-2" style={{ fontStyle: 'italic' }}>
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
                        <label htmlFor="address" className="block text-sm mb-2" style={{ fontStyle: 'italic' }}>
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
                        <label htmlFor="address" className="block text-sm mb-2" style={{ fontStyle: 'italic' }}>
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
                </div>

                <div className="mb-2 flex flex-row">
                    <div>
                        <label htmlFor="address" className="block text-sm mb-2" style={{ fontStyle: 'italic' }}>
                            Gender
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label htmlFor="male">Male</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                </div>


            </div>
        </form>
    );
};

export default Form;
