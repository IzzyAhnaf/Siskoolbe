import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
import Homes from './Pages/siswa/Home.jsx'
import Profile from './Pages/siswa/Profile.jsx'
import ProfSet from './Pages/siswa/Profset.jsx'
import Izin_Sakit from './Pages/siswa/Izin-Sakit.jsx'
import Checkin from './Pages/siswa/AbsenMasuk.jsx'
import Checkout from './Pages/siswa/AbsenKeluar.jsx'
import HomesAdmin from './Pages/admin/HomesAdmin.jsx'
import TambahMurid from './Pages/admin/TambahMurid.jsx'
import TambahJurusan from './Pages/admin/TambahJurusan.jsx'
import TambahGuru from './Pages/admin/TambahGuru.jsx'
import EditGuru from './Pages/admin/Edit_Guru.jsx'
import EditMurid from './Pages/admin/Edit_Murid.jsx'
import EditJurusan from './Pages/admin/Edit_Jurusan.jsx'
import Adminguru from './Pages/admin/Admin_Guru.jsx'
import AdminMurid from './Pages/admin/Admin_Murid.jsx'
import AdminJurusan from './Pages/admin/Admin_Jurusan.jsx'
import HomesGuru from './Pages/guru/HomesGuru.jsx'
import ProfileGuru from './Pages/guru/ProfileGuru.jsx'
import ProfSetGr from './Pages/guru/ProfSetGuru.jsx'
import CheckinGuru from './Pages/guru/AbsenGuru_masuk.jsx'
import CheckoutGuru from './Pages/guru/AbsenGuru_Keluar.jsx'
import Izin_Guru from './Pages/guru/IzinGuru.jsx'
import SelectAuth from './Pages/SelectAuth.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import FGPassword from './Pages/FGPassword.jsx'
import RSPassword from './Pages/RSPassword.jsx'
import DetailIzin from './Pages/siswa/Detail-Izin.jsx'
import AboutUS from './Pages/AboutUs.jsx'
import AdminKelas from './Pages/admin/Admin_Kelas.jsx'
import AdminDetailJurusan from './Pages/admin/Admin_DetailJurusan.jsx'
import AdminDetailKelas from './Pages/admin/Admin_DetailKelas.jsx'


const router = createBrowserRouter([
  {
    path: '/Siskoolbe/',
    element: <App />,

    children: [
      {
        path: '/Siskoolbe/AboutUS',
        element: <AboutUS />
      },
      {
        path: '/Siskoolbe/Siswa',
        element: <Homes />
      },
      {
        path: '/Siskoolbe/Siswa/Profile',
        element: <Profile />
      },
      {
        path: '/Siskoolbe/Siswa/Profset',
        element: <ProfSet />
      },
      {
        path: '/Siskoolbe/Siswa/Izin-Sakit',
        element: <Izin_Sakit />
      },
      {
        path: '/Siskoolbe/Siswa/AbsenMasuk/:id/:nis',
        element: <Checkin />
      },
      {
        path: '/Siskoolbe/Siswa/AbsenKeluar/:id/:nis',
        element: <Checkout />
      },
      {
        path: '/Siskoolbe/Siswa/Absen/:id',
        element: <DetailIzin />
      },
      // Guru
      {
        path: '/Siskoolbe/Admin',
        element: <HomesAdmin />
      },
      {
        path: '/Siskoolbe/Admin/TambahMurid',
        element: <TambahMurid />
      },
      {
        path: '/Siskoolbe/Admin/TambahJurusan',
        element: <TambahJurusan />
      },
      {
        path: '/Siskoolbe/Admin/TambahGuru',
        element: <TambahGuru />
      },
      {
        path: '/Siskoolbe/Admin/Edit_Guru/:id',
        element: <EditGuru />
      },
      {
        path: '/Siskoolbe/Admin/Edit_jurusan/:id',
        element: <EditMurid />,
      },
      {
        path: '/Siskoolbe/Admin/Edit_Murid/:id',
        element: <EditJurusan />
      },
      {
        path: '/Siskoolbe/Admin/Admin_Guru',
        element: <Adminguru />
      },
      {
        path: '/Siskoolbe/Admin/Admin_Murid',
        element: <AdminMurid />
      },
      {
        path: '/Siskoolbe/Admin/Admin_Jurusan',
        element: <AdminJurusan />
      },
      {
        path: '/Siskoolbe/Admin/Admin_DetailJurusan/:id',
        element: <AdminDetailJurusan />
      },
      {
        path: '/Siskoolbe/Admin/Admin_DetailKelas/:id',
        element: <AdminDetailKelas />
      },
      {
        path: '/Siskoolbe/Admin/Admin_Kelas/:id',
        element: <AdminKelas />
      },
      // Guru
      {
        path: '/Siskoolbe/Guru',
        element: <HomesGuru />
      },
      {
        path: '/Siskoolbe/Guru/ProfileGuru',
        element: <ProfileGuru />
      },
      {
        path: '/Siskoolbe/Guru/ProfSetGuru',
        elemen: <ProfSetGr />
      },
      {
        path: '/Siskoolbe/Guru/AbsenMasuk/:id',
        element: <CheckinGuru />
      },
      {
        path: '/Siskoolbe/Guru/AbsenKeluar/:id',
        element: <CheckoutGuru />
      },
      {
        path: '/Siskoolbe/Guru/IzinGuru',
        element: <Izin_Guru />
      },
    ],
  },
  {
    path: '/Siskoolbe/SelectAuth',
    element: <SelectAuth />
  },
  {
    path: '/Siskoolbe/Login',
    element: <Login />
  },
  {
    path: '/Siskoolbe/Register',
    element: <Register />
  },
  {
    path: '/Siskoolbe/Forgotpassword',
    element: <FGPassword />
  },
  {
    path: '/Siskoolbe/ResetPassword',
    element: <RSPassword />
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)