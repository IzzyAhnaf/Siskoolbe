import React from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import './Styling.css'; 
import { GoPencil } from "react-icons/go";
import CustomWidth from '../CustomWidth';

const ProfilePicture = ({gambar_profil}) => {
    const handleHover = (e) => {
        e.target.classList.add('hovered'); 
    };

    const handleLeave = (e) => {
        e.target.classList.remove('hovered');
    };

    const WMobile = CustomWidth() <= 767;

    return (
        <div>
            <div className="image-container">
                <img
                    className="object-cover w-24 h-24 mx-2 rounded-full"
                    src={gambar_profil}
                    onError={(e) => (e.target.src = 'https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg')}
                    alt="avatar"
                    onMouseEnter={handleHover} 
                    onMouseLeave={handleLeave} 
                />
                <AiOutlineCamera className="camera-icon" />
            </div>
        </div>
    );
};

export default ProfilePicture;
