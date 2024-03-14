import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Pages/Profile'
import Homes from './Pages/Home'
import Izin_Sakit from './Pages/Izin-Sakit'
import Sidebar from './components/Sidebar'
import CustomWidth from './CustomWidth'


function App() {
  const WMobile = CustomWidth() <= 767;
  return (
    <>
      <div className='flex p-2'>
        {WMobile ? '' : <Sidebar/>}
        <Routes>
          <Route path='/' element={<Homes />}></Route>
          <Route path='/Profile' element={<Profile />}></Route>
          <Route path='/Izin-Sakit' element={<Izin_Sakit />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
