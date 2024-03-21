import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Profile from './Pages/Profile'
import Homes from './Pages/Home'
import Izin_Sakit from './Pages/Izin-Sakit'
import Sidebar from './components/Sidebar'
import CustomWidth from './CustomWidth'
import Mnvbar from './components/MNavbar'
import ProfSet from './Pages/Profset'
import Checkin from './Pages/AbsenMasuk'
import Checkout from './Pages/AbsenKeluar'
import { getCookies } from './setCookies'
import {jwtDecode} from 'jwt-decode';
import _debounce from 'lodash/debounce';
import api from './api'
import EmptyPages  from './Pages/EmptyPages'
import HomesAdmin from './Pages/HomesAdmin'

function App() {
  const WMobile = CustomWidth() <= 767;
  const DekstopLow = CustomWidth() <= 1366;
  const navTo = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [dataProfilsiswa, setDataProfilsiswa] = useState(
    {
    nama : '', 
    email : '', 
    agama : '',
    jenis_kelamin : '',
    tempat_lahir : '',
    tgl_lahir : '',
    nis: '',
    nisn : '',
    nik: '',
    alamat : '',
    });
  
  const token = sessionStorage.getItem('token') || getCookies.token;

    
  if (!token) {
    navTo('/Siskoolbe/login');
    return null; 
  }

  const decoded = jwtDecode(token);

  const getProfile = _debounce(async () => {
    try{
      const resp = await api.get(decoded.role === 'siswa' ? '/siswa' : decoded.role === 'guru' ? '/guru' : '/admin',{
        headers: {
          Authorization: `${token}`
        }
      })
      const {nama, email, agama, jenis_kelamin, tempat_lahir, tgl_lahir, nis, nisn, nik, alamat} = resp.data[0]
      if(resp.status === 200){
        if(decoded.role === 'siswa'){
          setDataProfilsiswa({
            nama : nama,
            email : email, 
            agama : agama,
            jenis_kelamin :jenis_kelamin,
            tempat_lahir : tempat_lahir,
            tgl_lahir : tgl_lahir,
            nis: nis,
            nisn : nisn,
            nik: nik,
            alamat : alamat
          })
        }
      }
    }catch(err){
      navTo('/Siskoolbe/login')
    }
  }, 60);

  useEffect(() => {
    console.log(token);
    token ? [sessionStorage.setItem('token', token), setLoading(true), getProfile()] : navTo('/Siskoolbe/login')
  }, []);

  useEffect(() => {
    if(location.pathname === '/Siskoolbe/' && decoded.role === 'siswa'){
      navTo('/Siskoolbe/Siswa')
    }else if(location.pathname === '/Siskoolbe/' && decoded.role === 'guru'){
      navTo('/Siskoolbe/Guru')
    }else if(location.pathname === '/Siskoolbe/' && decoded.role === 'admin'){
      navTo('/Siskoolbe/Admin')
    }
  }, [decoded.role, location])

  return (
    <>
      {loading ? (
      <div className='flex p-2'>
        {decoded.role === 'siswa' ? (
        <>
          {WMobile ? <Mnvbar /> : <Sidebar />}
          <Routes>
            <Route path='/Siswa' element={<Homes nama={dataProfilsiswa.nama} token={token} WMobile={WMobile} DekstopLow={DekstopLow}/>}></Route>
            <Route path='/Siswa/Profile' element={<Profile />}></Route>
            <Route path='/Siswa/Profset' element={<ProfSet />}></Route >
            <Route path='/Siswa/Izin-Sakit' element={<Izin_Sakit />}></Route>
            <Route path='/Siswa/AbsenMasuk/:id/:nis' element={<Checkin/>}></Route>
            <Route path='/Siswa/AbsenKeluar/:id/:nis' element={<Checkout/>}></Route>
          </Routes>
        </>
        ) : decoded.role === 'guru' ? (
        <Routes>
          <Route path='/Guru' element={<Homes />}></Route>
        </Routes>
          ) : decoded.role === "admin" ? (
        <Routes>
          <Route path='/Admin' element={<HomesAdmin />}></Route>
        </Routes>
          ) : 
            window.location.href = '/Siskoolbe/login'
          }
      </div>
      ):(
        <>
        <div className="flex text-center items-center justify-center text-5xl font-inter font-bold h-screen">
          <p>Loading</p>
        </div>
        </>
      )}
    </>
  )
}

export default App