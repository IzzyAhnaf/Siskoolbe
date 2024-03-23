import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { IoMdSettings } from "react-icons/io";
import { RiFocus3Line } from "react-icons/ri";
import CustomWidth from "../CustomWidth";
import _debounce from 'lodash/debounce';
import { useParams } from 'react-router-dom';
import api from '../api';
import { CurrentTime } from '../CurrentTime';

const CheckoutGuru = () => {
  const mapRef = useRef(null);
  const WMobile = CustomWidth() <= 767;
  const [userPosition, setUserPosition] = useState(null); // Initialize userPosition to null
  const [userAddress, setUserAddress] = useState(""); // Initialize userAddress to empty string
  const circleRadius = 100; // Radius dalam meter untuk menentukan area absen

  // Set nilai default untuk center
  const [defaultCenter, setDefaultCenter] = useState(null); // Initialize defaultCenter to null

  // Define markerPosition
  const markerPosition = [-6.439830901148895, 106.8833946690733];

  const { id, nis } = useParams();

  useEffect(() => {
    const locateUser = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setDefaultCenter([latitude, longitude]); // Update defaultCenter to user's position

          // Fetch user's detailed address based on coordinates using reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
              const address = data.display_name; // Extract the detailed address from the response
              setUserAddress(address || "Lokasi Anda"); // Update userAddress state with the fetched address
            })
            .catch(error => {
              console.error('Error fetching user address:', error);
            });
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Handle errors here, such as informing the user and providing guidance on troubleshooting steps
        },
        {
          enableHighAccuracy: true, // Request high accuracy mode
          maximumAge: 0, // Force the device to get the current location instead of using a cached one
          timeout: 10000 // Set a timeout for location retrieval
        }
      );
    };

    locateUser();
  }, []);

  const absen = _debounce(async () => {
    try{
      const resp = await api.post('/absenkeluarsiswa', {id, nis, time: CurrentTime()}, {headers: {Authorization: `${sessionStorage.getItem("token")}`}})
      if(resp.status === 200){
        alert("Absen Berhasil")
        window.location.href = '/Siskoolbe/Siswa'
      }else{
        alert("Absen Gagal")
      }
    }catch(err){
      alert("Absen Gagal")
    }
  }, 50)

  const handleAbsenClick = () => {
    const currentTime = new Date();
    const absenTimeopen = new Date();
    absenTimeopen.setHours(15, 20, 0, );


    if (!userPosition) {
      alert('Tunggu hingga lokasi Anda ditentukan.');
      return;
    }

    const distance = calculateDistance(userPosition, markerPosition);

    if (distance > circleRadius) {
      alert('Kamu tidak bisa absen di luar area ini.');
    } else {
      if(currentTime < absenTimeopen){
        alert('Waktu absen belum dimulai.');
        return;
      }else{
        absen();
      }
    }
  };

  const calculateDistance = (point1, point2) => {
    const lat1 = point1[0];
    const lon1 = point1[1];
    const lat2 = point2[0];
    const lon2 = point2[1];

    const R = 6371e3; // Radius bumi dalam meter
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Jarak dalam meter
    return distance;
  };

  const handleFocusUserLocation = () => {
    if (userPosition && mapRef.current) {
      mapRef.current.setView(userPosition, 17);
    }
  };
  return (
    <>
      {!WMobile ? (
        defaultCenter && (
          <div className='flex flex-col w-screen item-centers justify-center h-screen bg-[#D9D9D9] mx-4'>
            <div className="flex bg-sky-700 mt-4 mb-3 mx-[120px] h-16 rounded-3xl items-center px-2 py-2 ">
              <svg className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="white" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"></path></svg>
              <span className="font-semibold font-inter text-[14px] text-white mx-2">{userAddress || "Lokasi Anda"}</span>
            </div>
            <MapContainer ref={mapRef} className="justify-center items-center w-11/12 h-3/4 rounded-xl mx-10 z-0"
              center={defaultCenter}
              zoom={17}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {userPosition && (
                <>
                  <Marker position={userPosition}>
                    <Popup>Lokasi Anda</Popup>
                  </Marker>
                </>
              )}
              <Marker position={markerPosition}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              <Circle center={markerPosition} radius={circleRadius} pathOptions={{ color: 'red' }} />
            </MapContainer>
            <button className="absolute bottom-36 right-5 mr-40"><RiFocus3Line className='w-12 h-12 absolute bg-white rounded-full px-2' style={{color:'#1E6CB1'}} onClick={handleFocusUserLocation}/></button>
            <button onClick={handleAbsenClick} className='bg-[#FF0000] text-white rounded-md py-2 px-5 mt-5 content-center text-base w-94 text-center mx-56'>Absen Keluar</button>
          </div>
        )
      ) : (
        <>
        {defaultCenter && (
          <div className="flex flex-col w-screen">
          <div className="flex flex-row">
              <div className="flex flex-col">
                <span className="font-semibold font-inter text-xl mt-6 mx-6">Ilham</span>
                <span className="font-semibold font-inter text-lg mt-2 mx-6">Student</span>
              </div>
              <img className="w-20 h-20 mt-2 ml-36" src="https://i.pinimg.com/564x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" alt="" />
              <IoMdSettings className="absolute ml-80 mt-2 w-6 h-6" onClick={() => navTo('./Profile')} />
            </div>
            <div className="flex flex-col items-center rounded-xl bg-[#D9D9D9] w-11/12 justify-center h-[470px] pb-6 mx-2 mt-1 z-0">
            <MapContainer ref={mapRef} className="justify-center items-center w-full h-96 z-0"
                center={defaultCenter}
                zoom={17}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', justifyContent:'center', alignContent:'center', borderRadius:'12px'}} 
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {userPosition && (
                  <>
                    <Marker position={userPosition}>
                      <Popup>Lokasi Anda</Popup>
                    </Marker>
                  </>
                )}
                <Marker position={markerPosition}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                <Circle center={markerPosition} radius={circleRadius} pathOptions={{ color: 'red' }} />
              </MapContainer>
              <button className="absolute bottom-60 right-8"><RiFocus3Line className='w-8 h-8 bg-white red rounded-full px-2' style={{color:'#1E6CB1'}} onClick={handleFocusUserLocation}/></button>
              <button onClick={handleAbsenClick} className='bg-[#FF0000] text-white py-3 rounded-md px-12 mt-12 text-[14px] w-4/5 mx-56'>Absen Masuk</button>
            </div>
          </div>
        )}
        </>
      )}
    </>
  );
}

export default CheckoutGuru;
