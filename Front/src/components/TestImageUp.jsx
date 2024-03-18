import React, { useState, useRef } from 'react';
import { BiImageAlt } from 'react-icons/bi';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [showIcon, setShowIcon] = useState(true);
    const fileInputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        setShowIcon(false);
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please drop an image file.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileChange = (e) => {
        setShowIcon(false);
        const file = e.target.files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please choose an image file.');
        }
    };

    const handleDelete = () => {
        setImage(null);
        setShowIcon(true);
    };

    return (
        <div
            className="image-uploader"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {showIcon && (
                <div className="icon-container">
                    <BiImageAlt className="image-icon" />
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <div
                className="drop-area"
                onClick={() => fileInputRef.current.click()}
                style={{ display: image ? 'none' : 'block' }}
            >
                <p>Drag & Drop your image here</p>
            </div>
            {image && (
                <div className="image-preview">
                    <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
