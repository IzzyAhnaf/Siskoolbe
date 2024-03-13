import React from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import './Styling.css'; // Import file CSS untuk styling komponen Anda
import { GoPencil } from "react-icons/go";

const ProfilePicture = () => {
    const handleHover = (e) => {
        e.target.classList.add('hovered'); // Tambahkan kelas 'hovered' saat gambar dihover
    };

    const handleLeave = (e) => {
        e.target.classList.remove('hovered'); // Hapus kelas 'hovered' saat kursor meninggalkan gambar
    };

    return (
        <div>
            {/* Gambar dengan efek hover */}
            <div className="image-container">
                <GoPencil className="text-2xl absolute border-[1px] ml-[82px] rounded-full border-black  mt-[8px]" />
                <img
                    className="object-cover w-24 h-24 mx-2 rounded-full"
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    alt="avatar"
                    onMouseEnter={handleHover} // Panggil fungsi handleHover saat gambar dihover
                    onMouseLeave={handleLeave} // Panggil fungsi handleLeave saat kursor meninggalkan gambar
                />
                {/* Ikon kamera ditampilkan di tengah saat dihover */}
                <AiOutlineCamera className="camera-icon" />
            </div>
        </div>
    );
};

export default ProfilePicture;
