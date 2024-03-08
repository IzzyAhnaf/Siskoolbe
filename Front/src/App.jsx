import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homes from './Pages/Home'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Homes />}></Route>
        
      </Routes>
    </>
  )
}

export default App
