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
import { jwtDecode } from 'jwt-decode';
import _debounce from 'lodash/debounce';
import SidebarAdmin from './components/SidebarAdm'
import api from './api'
import EmptyPages from './Pages/EmptyPages'
import HomesAdmin from './Pages/HomesAdmin'
import Adminguru from './Pages/Admin_Guru'
import TambahMurid from './Pages/TambahMurid'
import AdminMurid from './Pages/Admin_Murid'
import AdminJurusan from './Pages/Admin_Jurusan'
import TambahGuru from './Pages/TambahGuru'
import TambahJurusan from './Pages/TambahJurusan'
import EditMurid from './Pages/Edit_Murid'
import EditGuru from './Pages/Edit_Guru'
import EditJurusan from './Pages/Edit_Jurusan'
import AMNavbar from './components/A_MNavbar'
import GrMnvbar from './components/GuruMNavbar'
import SidebarGuru from './components/GuruSidebar'
import HomesGuru from './Pages/HomesGuru'
import ProfileGuru from './Pages/ProfileGuru'
import ProfSetGr from './Pages/ProfSetGuru'
import CheckinGuru from './Pages/AbsenGuru_masuk'
import CheckoutGuru from './Pages/AbsenGuru_Keluar'
import Izin_Guru from './Pages/IzinGuru'

function App() {
  const WMobile = CustomWidth() <= 767;
  const DekstopLow = CustomWidth() <= 1366;
  const navTo = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [dataProfilsiswa, setDataProfilsiswa] = useState(
    {
      nama: '',
      email: '',
      agama: '',
      jenis_kelamin: '',
      tempat_lahir: '',
      tgl_lahir: '',
      nis: '',
      nisn: '',
      nik: '',
      alamat: '',
    });

  const token = sessionStorage.getItem('token') || getCookies.token;


  if (!token) {
    navTo('/Siskoolbe/login');
    return null;
  }

  const decoded = jwtDecode(token);

  const getProfile = _debounce(async () => {
    try {
      const resp = await api.get(decoded.role === 'siswa' ? '/siswa' : decoded.role === 'guru' ? '/guru' : '/admin', {
        headers: {
          Authorization: `${token}`
        }
      })
      if (resp.status === 200) {
        if (decoded.role === 'siswa') {
          const { nama, email, agama, jenis_kelamin, tempat_lahir, tgl_lahir, nis, nisn, nik, alamat } = resp.data[0]
          setDataProfilsiswa({
            nama: nama,
            email: email,
            agama: agama,
            jenis_kelamin: jenis_kelamin,
            tempat_lahir: tempat_lahir,
            tgl_lahir: tgl_lahir,
            nis: nis,
            nisn: nisn,
            nik: nik,
            alamat: alamat
          })
        }
      }
    } catch (err) {
      navTo('/Siskoolbe/login')
    }
  }, 60);

  useEffect(() => {
    console.log(token);
    token ? [sessionStorage.setItem('token', token), getProfile()] : navTo('/Siskoolbe/login')
    setTimeout(() => setLoading(false), 1000)
  }, []);

  useEffect(() => {
    if (location.pathname === '/Siskoolbe/' || (location.pathname === '/Siskoolbe/Admin'
    || location.pathname === '/Siskoolbe/Guru') && decoded.role === 'siswa') {
      navTo('/Siskoolbe/Siswa')
    } else if (location.pathname === '/Siskoolbe/' && decoded.role === 'guru') {
      navTo('/Siskoolbe/Guru')
    } else if ((location.pathname === '/Siskoolbe/' || location.pathname === '/Siskoolbe/Siswa'
      || location.pathname === '/Siskoolbe/Siswa/Profile' || location.pathname === '/Siskoolbe/Siswa/Profset'
      || location.pathname === '/Siskoolbe/Siswa/Izin-Sakit' || 
      location.pathname === '/Siskoolbe/Siswa/AbsenMasuk/:id/:nis' || location.pathname === '/Siskoolbe/Siswa/AbsenKeluar/:id/:nis') && decoded.role === 'admin') {
      navTo('/Siskoolbe/Admin')
    }
  }, [decoded.role, location])

  return (
    <>
      {!loading ? (
        <div className='flex p-2'>
          {decoded.role === 'siswa' ? (
            <>
              {WMobile ? <Mnvbar /> : <Sidebar />}
              <Routes>
                <Route path='/Siswa' element={<Homes nama={dataProfilsiswa.nama} token={token} WMobile={WMobile} DekstopLow={DekstopLow} />}></Route>
                <Route path='/Siswa/Profile' element={<Profile />}></Route>
                <Route path='/Siswa/Profset' element={<ProfSet />}></Route >
                <Route path='/Siswa/Izin-Sakit' element={<Izin_Sakit />}></Route>
                <Route path='/Siswa/AbsenMasuk/:id/:nis' element={<Checkin />}></Route>
                <Route path='/Siswa/AbsenKeluar/:id/:nis' element={<Checkout />}></Route>
              </Routes>
            </>
          ) : decoded.role === 'guru' ? (
            <>
             {WMobile ? <GrMnvbar /> : <SidebarGuru />}
            <Routes>
              <Route path='/Guru' element={<HomesGuru />}></Route>
              <Route path='/Guru/ProfileGuru' element={<ProfileGuru />}></Route>
              <Route path='/Guru/ProfSetGuru' element={<ProfSetGr />}></Route>
              <Route path='/Guru/IzinGuru' element={<Izin_Guru />}></Route>
              <Route path='/Guru/AbsenGuru_Masuk' element={<CheckinGuru />}></Route>
              <Route path='/Guru/AbsenGuru_keluar' element={<CheckoutGuru />}></Route>
            </Routes>
            </>
          ) : decoded.role === 'admin' ? (
            <>
              {WMobile ? <AMNavbar /> : <SidebarAdmin />}
              <Routes>
                <Route path='/Admin' element={<HomesAdmin />}></Route>
                <Route path='/Admin/Admin_Guru' element={<Adminguru />}></Route>
                <Route path='/Admin/Admin_Murid' element={<AdminMurid />}></Route>
                <Route path='/Admin/Admin_Jurusan' element={<AdminJurusan />}></Route>
                <Route path='/Admin/TambahMurid' element={<TambahMurid />}></Route>
                <Route path='/Admin/TambahGuru' element={<TambahGuru />}></Route>
                <Route path='/Admin/TambahJurusan' element={<TambahJurusan />}></Route>
                <Route path='/Admin/Edit_Murid' element={<EditMurid />}></Route>
                <Route path='/Admin/Edit_Guru' element={<EditGuru />}></Route>
                <Route path='/Admin/Edit_Jurusan/:id' element={<EditJurusan />}></Route>
              </Routes>
            </>
          ) : null
          }
        </div>
      ) : (
        <div className='flex items-center justify-center space-x-2 font-inter min-h-screen'>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)">...</span>
          </div>
          <p className='text-2xl'>Memuat</p>
        </div>
      )}
    </>
  )
}

export default App