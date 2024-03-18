import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Pages/Profile'
import Homes from './Pages/Home'
import Izin_Sakit from './Pages/Izin-Sakit'
import Sidebar from './components/Sidebar'
import CustomWidth from './CustomWidth'
import Mnvbar from './components/MNavbar'
import ProfSet from './Pages/Profset'
import Checkin from './Pages/AbsenMasuk'
import Checkout from './Pages/AbsenKeluar'

function App() {
  const WMobile = CustomWidth() <= 767;
  return (
    <>
      <div className='flex p-2'>
        {WMobile ? <Mnvbar /> : <Sidebar />}
        <Routes>
          <Route path='/' element={<Homes />}></Route>
          <Route path='/Profile' element={<Profile />}></Route>
          <Route path='/Profset' element={<ProfSet />}></Route >
          <Route path='/Izin-Sakit' element={<Izin_Sakit />}></Route>
          <Route path='/AbsenMasuk' element={<Checkin/>}></Route>
          <Route path='/AbsenKeluar' element={<Checkout/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App