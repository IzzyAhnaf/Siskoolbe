import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayerGroup, Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import CustomWidth from "../CustomWidth";

const MapComponent = (props) => {
  const position = [-6.439824346762288, 106.88345663522543];
  const greenOptions = { color: 'green', fillColor: 'green' }
  const WMobile = CustomWidth() <= 767;
  return (
    <>
    {!WMobile ? (
      <div className='flex flex-col w-11/12 item-centers justify-center h-3/4'>
        <div className="flex bg-sky-700 mt-4 mb-3 h-12 rounded-3xl items-center justify-center w-full mx-0">
              <svg className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="white" d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"></path></svg>
              <span className="font-semibold font-inter text-[14px] text-white mx-2">SMKN 1 Depok, Gang Bhakti Suci No.100, Cimpaeun, Tapos, Kota Depok, Jawa Barat, 16459</span>
            </div>
         <div className='flex flex-col justify-center items-center mx-0 w-full h-5/6'>
      <MapContainer 
        center={position} 
        zoom={18} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', justifyContent:'center', alignContent:'center', borderRadius:'24px'}} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          <LayerGroup>
        <Circle
          center={[-6.43990455525033, 106.88363177763982]}
          pathOptions={greenOptions}
          radius={50}
          stroke={false}
        />
      </LayerGroup>
        <Marker position={position}>
          <Popup>
            SMKN 1 Depok <br /> 2023
          </Popup>
        </Marker>
      </MapContainer>    
    </div>
      </div>
    ) : (
      <>
         <div className="flex flex-col justify-center items-center mx-6 w-11/12 h-80 rounded-xl">
      <MapContainer 
        center={position} 
        zoom={18} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', justifyContent:'center', alignContent:'center', borderRadius:'24px'}} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          <LayerGroup>
        <Circle
          center={[-6.43990455525033, 106.88363177763982]}
          pathOptions={greenOptions}
          radius={50}
          stroke={false}
        />
      </LayerGroup>
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>    
    </div>
      </>
    )}
    </>
  );
};

export default MapComponent;
