import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './components/siswa/Sidebar'
import CustomWidth from './CustomWidth'
import { getCookies } from './setCookies'
import { jwtDecode } from 'jwt-decode';
import _debounce from 'lodash/debounce';
import SidebarAdmin from './components/admin/SidebarAdm'
import api from './api'
import Homes from './Pages/siswa/Home'
import Checkin from './Pages/siswa/AbsenMasuk'
import Profile from './Pages/siswa/Profile'
import ProfSet from './Pages/siswa/Profset'
import Izin_Sakit from './Pages/siswa/Izin-Sakit'
import Checkout from './Pages/siswa/AbsenKeluar'
import HomesGuru from './Pages/guru/HomesGuru'
import ProfileGuru from './Pages/guru/ProfileGuru'
import ProfSetGr from './Pages/guru/ProfSetGuru'
import Izin_Guru from './Pages/guru/IzinGuru'
import CheckinGuru from './Pages/guru/AbsenGuru_masuk'
import CheckoutGuru from './Pages/guru/AbsenGuru_Keluar'
import HomesAdmin from './Pages/admin/HomesAdmin'
import Adminguru from './Pages/admin/Admin_Guru'
import AdminMurid from './Pages/admin/Admin_Murid'
import AdminJurusan from './Pages/admin/Admin_Jurusan'
import TambahMurid from './Pages/admin/TambahMurid'
import TambahGuru from './Pages/admin/TambahGuru'
import TambahJurusan from './Pages/admin/TambahJurusan'
import EditMurid from './Pages/admin/Edit_Murid'
import EditGuru from './Pages/admin/Edit_Guru'
import EditJurusan from './Pages/admin/Edit_Jurusan'
import GrMnvbar from './components/guru/GuruMNavbar'
import Mnvbar from './components/siswa/MNavbar'
import AMNavbar from './components/admin/A_MNavbar'
import DetailIzin from './Pages/siswa/Detail-Izin'
import AboutUS from './Pages/AboutUs'


function App() {
  const WMobile = CustomWidth() <= 767;
  const DekstopLow = CustomWidth() <= 1366;
  const navTo = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
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
      gambar_profil: null,
    });

  const [dataProfilAdmin, setDataProfilAdmin] = useState({
    nama: '',
    email: '',
    noHp: '',
    nik: '',
    gambar_profil: null,
    
  })
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
          const { nama, email, agama, jenis_kelamin, tempat_lahir, tgl_lahir, nis, nisn, nik, alamat, gambar_profil } = resp.data[0]
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
            alamat: alamat,
            gambar_profil: 'data:image/png;base64,' + gambar_profil
          })
          setSelectedImage('data:image/png;base64,' + gambar_profil)
        } else if(decoded.role === 'admin'){
          setDataProfilAdmin({
            nama: resp.data[0].nama,
            email: resp.data[0].email,
            noHp: resp.data[0].no_hp,
            nik: resp.data[0].nik,
            gambar_profil: 'data:image/png;base64,' + resp.data[0].gambar_profil
          })
        }
      }
    } catch (err) {
      navTo('/Siskoolbe/login')
    }
  }, 60);

  useEffect(() => {
    token ? [sessionStorage.setItem('token', token), getProfile()] : navTo('/Siskoolbe/login')
    setTimeout(() => setLoading(false), 1000)
  }, []);


  useEffect(() => {
    const { pathname } = location;
    const { role } = decoded;

    if (pathname === '/Siskoolbe/') {
      if (role === 'siswa') {
        navTo('/Siskoolbe/Siswa', { replace: true });
      } else if (role === 'guru') {
        navTo('/Siskoolbe/Guru', { replace: true });
      } else if (role === 'admin') {
        navTo('/Siskoolbe/Admin', { replace: true });
      } else {
        navTo('/Siskoolbe/login', { replace: true });
      }
    } else if (pathname.startsWith('/Siskoolbe/Admin')) {
      if (role === 'siswa') {
        navTo('/Siskoolbe/Siswa', { replace: true });
      } else if(role === 'guru') {
        navTo('/Siskoolbe/Guru', { replace: true });
      } else if (role === undefined) {
        navTo('/Siskoolbe/login', { replace: true });
      }
    } else if(pathname.startsWith('/Siskoolbe/Guru')) {
      if (role === 'siswa') {
        navTo('/Siskoolbe/Siswa', { replace: true });
      } else if(role === 'admin') {
        navTo('/Siskoolbe/Admin', { replace: true });
      } else if (role === undefined) {
        navTo('/Siskoolbe/login', { replace: true });
      }
    } else if (pathname.startsWith('/Siskoolbe/Siswa')) {
      if (role === 'admin') {
        navTo('/Siskoolbe/Admin', { replace: true });
      } else if(role === 'guru') {
        navTo('/Siskoolbe/Guru', { replace: true });
      }else if (role === undefined) {
        navTo('/Siskoolbe/login', { replace: true });
      }
    }
  }, [decoded.role, location]);

  return (
    <>
      {!loading ? (
        <div className='flex p-2 h-screen'>
          {decoded.role === 'siswa' ? (
            <>
              {WMobile ? <Mnvbar /> : <Sidebar nama={dataProfilsiswa.nama} gambar_profil={selectedImage}/>}
              <Routes>
                <Route path='/Siswa' element={<Homes nama={dataProfilsiswa.nama} token={token} WMobile={WMobile} DekstopLow={DekstopLow} />}></Route>
                <Route path='/Siswa/Profile' element={<Profile getProfileImage={selectedImage} setSelectedImage={setSelectedImage} />}></Route>
                <Route path='/Siswa/Profset' element={<ProfSet />}></Route >
                <Route path='/Siswa/Izin-Sakit' element={<Izin_Sakit />}></Route>
                <Route path='/Siswa/Absen/:id' element={<DetailIzin WMobile={WMobile} />}></Route>
                <Route path='/Siswa/AbsenMasuk/:id/:nis' element={<Checkin />}></Route>
                <Route path='/Siswa/AbsenKeluar/:id/:nis' element={<Checkout />}></Route>
                <Route path='/AboutUs' element={<AboutUS /> }></Route>
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
              <Route path='/AboutUs' element={<AboutUS /> }></Route>
            </Routes>
            </>
          ) : decoded.role === 'admin' ? (
            <>
              {WMobile ? <AMNavbar /> : <SidebarAdmin nama={dataProfilAdmin.nama} gambar_profil={selectedImage} />}
              <Routes>
                <Route path='/Admin' element={<HomesAdmin />}></Route>
                <Route path='/Admin/Admin_Guru' element={<Adminguru />}></Route>
                <Route path='/Admin/Admin_Murid' element={<AdminMurid />}></Route>
                <Route path='/Admin/Admin_Jurusan' element={<AdminJurusan />}></Route>
                <Route path='/Admin/TambahMurid' element={<TambahMurid />}></Route>
                <Route path='/Admin/TambahGuru' element={<TambahGuru />}></Route>
                <Route path='/Admin/TambahJurusan' element={<TambahJurusan />}></Route>
                <Route path='/Admin/Edit_Murid/:id' element={<EditMurid />}></Route>
                <Route path='/Admin/Edit_Guru/:id' element={<EditGuru />}></Route>
                <Route path='/Admin/Edit_Jurusan/:id' element={<EditJurusan />}></Route>
                <Route path='/AboutUs' element={<AboutUS /> }></Route>
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