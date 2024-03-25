import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homes from './Pages/Home.jsx'
import Profile from './Pages/Profile.jsx'
import Login from './Pages/Login.jsx'
import ProfSet from './Pages/Profset.jsx'
import Register from './Pages/Register.jsx'
import FGPassword from './Pages/FGPassword.jsx'
import RSPassword from './Pages/RSPassword.jsx'
import SelectAuth from './Pages/SelectAuth.jsx'
import Izin_Sakit from './Pages/Izin-Sakit.jsx'
import Checkin from './Pages/AbsenMasuk.jsx'
import Checkout from './Pages/AbsenKeluar.jsx'
import HomesAdmin from './Pages/HomesAdmin.jsx'
import Adminguru from './Pages/Admin_Guru.jsx'
import TambahMurid from './Pages/TambahMurid.jsx'
import TambahJurusan from './Pages/TambahJurusan.jsx'
import TambahGuru from './Pages/TambahGuru.jsx'
import AdminMurid from './Pages/Admin_Murid.jsx'
import AdminJurusan from './Pages/Admin_Jurusan.jsx'
import EditGuru from './Pages/Edit_Guru.jsx'
import EditJurusan from './Pages/Edit_Jurusan.jsx'
import EditMurid from './Pages/Edit_Murid.jsx'
import HomesGuru from './Pages/HomesGuru'
import ProfileGuru from './Pages/ProfileGuru'
import ProfSetGr from './Pages/ProfSetGuru'
import CheckinGuru from './Pages/AbsenGuru_masuk'
import CheckoutGuru from './Pages/AbsenGuru_Keluar'
import Izin_Guru from './Pages/IzinGuru'

const router = createBrowserRouter([
  {
    path: '/Siskoolbe/',
    element: <App />,

    children: [
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
        path: '/Siskoolbe/Admin',
        element: <HomesAdmin />
      },
      {
        path: '/Siskoolbe/Admin/TambahMurid',
        element: <TambahMurid />
      },
      {
        path: '/Siskoolbe/TambahJurusan',
        element: <TambahJurusan />
      },
      {
        path: '/Siskoolbe/TambahGuru',
        element: <TambahGuru />
      },
      {
        path: '/Siskoolbe/Edit_Guru',
        element: <EditGuru />
      },
      {
        path: '/Siskoolbe/Edit_jurusan',
        element: <EditMurid />
      },
      {
        path: '/Siskoolbe/Edit_Murid',
        element: <EditJurusan />
      },
      {
        path: '/Siskoolbe/Admin_Guru',
        element: <Adminguru />
      },
      {
        path: '/Siskoolbe/Admin_Murid',
        element: <AdminMurid />
      },
      {
        path: '/Siskoolbe/Admin_Jurusan',
        element: <AdminJurusan />
      },
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
        path: '/Siskoolbe/Guru/AbsenGuru_Masuk',
        element: <CheckinGuru />
      },
      {
        path: '/Siskoolbe/Guru/AbsenGuru_Keluar',
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