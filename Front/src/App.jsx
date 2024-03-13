import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Pages/Profile'
import Homes from './Pages/Home'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homes />}></Route>
        <Route path='/Profile' element={<Profile />}></Route>

      </Routes>
    </>
  )
}

export default App
