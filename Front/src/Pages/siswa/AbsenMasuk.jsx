import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { IoMdSettings } from "react-icons/io";
import { RiFocus3Line } from "react-icons/ri";
import CustomWidth from "../../CustomWidth";
import { useNavigate, useParams } from 'react-router-dom';
import _debounce from 'lodash/debounce';
import api from '../../api';
import { CurrentTime } from '../../CurrentTime';
import Swal from 'sweetalert2';

const Checkin = () => {
  const navTo = useNavigate();
  const mapRef = useRef(null);
  const WMobile = CustomWidth() <= 767;
  const [userPosition, setUserPosition] = useState(null);
  const [userAddress, setUserAddress] = useState(""); 
  const circleRadius = 100; 

  const { id, nis } = useParams();

  const [defaultCenter, setDefaultCenter] = useState(null); 

  const markerPosition = [-6.439830901148895, 106.8833946690733];

  useEffect(() => {
    const locateUser = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setDefaultCenter([latitude, longitude]); 

          // Fetch user's detailed address based on coordinates using reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`)
            .then(response => response.json())
            .then(data => {
              const address = data.display_name; 
              setUserAddress(address || "Lokasi Anda");
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
      const resp = await api.post('/absenmasuksiswa', {id, nis, time: CurrentTime()}, {headers: {Authorization: `${sessionStorage.getItem("token")}`}})
      if(resp.status === 200){
        Swal.fire(
          'Berhasil',
          'Absen Berhasil',
          'success'
        ).then(() => {
          navTo('/Siskoolbe/Siswa', { replace: true });
        })
      }else{
        Swal.fire(
          'Gagal',
          'Absen Gagal',
          'error'
        )
      }
    }
    catch(err){
      Swal.fire(
        'Gagal',
        'Absen Gagal',
        'error'
      )
    }
  }, 50)

  const handleAbsenClick = () => {

    const currentTime = new Date();
    const absenTimelimit = new Date();
    const absenTimeopen = new Date();
    absenTimelimit.setHours(7, 30, 0);
    absenTimeopen.setHours(6, 0, 0);

    
    if (!userPosition) {
      Swal.fire(
        'Gagal',
        'Tunggu hingga lokasi Anda ditentukan.',
        'error'
      )
      return;
    }

    const distance = calculateDistance(userPosition, markerPosition);

    if (distance > circleRadius) {
      Swal.fire(
        'Gagal',
        'Kamu tidak bisa absen di luar area ini.',
        'error'
      ) 
      return;
    } else {
      if (currentTime > absenTimelimit) {
        Swal.fire(
          'Gagal',
          'Waktu absen melebihi batas.',
          'error'
        )
        return;
      }else if (currentTime < absenTimeopen) {
        Swal.fire(
          'Gagal',
          'Waktu absen belum dimulai.',
          'error'
        )
        return;
      }else{
        absen()
      }
    }
  };

  const absenChecker = _debounce(async () => {
    try{
      const resp = await api.get(`/absenChecker/${id}`, {headers: {Authorization: `${sessionStorage.getItem("token")}`}})
      if(resp.status === 200){

      }
    }catch(err){
      navTo('/Siskoolbe/Siswa', { replace: true });
    }
  })

  useEffect(() => {
    absenChecker();
    return () => {
      absenChecker.cancel();
    }
  }, [])

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
          <div className='flex flex-col w-full items-center justify-center rounded-lg h-full bg-[#D9D9D9] mx-4'>
            <div className="flex bg-sky-700 mt-4 w-11/12 mx-10 h-16 items-center px-2 py-2"
            style={{borderRadius: '10px 10px 0 0'}}>
              <svg className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="white" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"></path></svg>
              <span className="font-semibold font-inter text-[14px] text-white mx-2">{userAddress || "Lokasi Anda"}</span>
            </div>
            <MapContainer ref={mapRef} className="justify-center items-center w-11/12 h-3/4 mx-10 z-0"
              style={{ borderRadius: '0 0 10px 10px' }}
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
            <button className="absolute bottom-40 right-0 mr-32"><RiFocus3Line className='w-12 h-12 absolute bg-white rounded-full px-2' style={{color:'#1E6CB1'}} onClick={handleFocusUserLocation}/></button>      
            <button onClick={handleAbsenClick} 
            className='bg-[#269400] text-white rounded-md py-2 px-5 mt-5 content-center text-base w-11/12 text-center mx-10'>
              Absen Masuk
            </button>
          </div>
        )
      ) : (
        <>
        {defaultCenter && (
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-col items-center rounded-xl bg-[#D9D9D9] justify-center h-[85%] pb-6 mx-2 mt-1 z-0">
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
                </Marker>
                <Circle center={markerPosition} radius={circleRadius} pathOptions={{ color: 'red' }} />
              </MapContainer>
              <button className='relative w-full pt-4' onClick={handleFocusUserLocation}>
              <RiFocus3Line className='w-8 h-8 bg-white red rounded-full px-2 absolute right-2'
                style={{color:'#1E6CB1'}}/>
              </button>
              <button onClick={handleAbsenClick} className='bg-[#269400] text-white py-3 rounded-md px-12 mt-12 text-[14px] w-4/5 mx-56'>Absen Masuk</button>
            </div>
          </div>
        )}
        </>
      )}
    </>
  );
}

export default Checkin;
