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
        path: '/Siskoolbe/Admin_Guru',
        element: <Adminguru />
      }
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