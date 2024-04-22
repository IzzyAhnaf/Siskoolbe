import { MdDateRange } from "react-icons/md";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const CustomDatePicker = ({ selectedDate, handleChange, WMobile }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDatePicker = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (date) => {
        handleChange(date);
        setIsOpen(false);
    };

    const clearDate = () => {
        handleChange(null);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <div className="h-full flex items-center">
                <MdDateRange
                    className="text-blue-500 text-xl cursor-pointer"
                    onClick={toggleDatePicker}
                />
            </div>
            {isOpen && (
                <div className={`absolute top-full ${WMobile ? 'left-0' : 'left-6'} z-10`}>
                    <button className="text-sm bg-red-500 text-white py-1 px-2"
                    style={{borderRadius: '10px 10px 0 0'}} onClick={clearDate}>Bersih</button>
                    <Calendar
                        className={`bg-white ${WMobile ? 'w-[220px]' : 'w-[350px]'}`}
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                </div>
            )}
        </div>
    );
};
