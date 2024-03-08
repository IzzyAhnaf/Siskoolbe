import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homes from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import FGPassword from './Pages/FGPassword.jsx'
import RSPassword from './Pages/RSPassword.jsx'
import SelectAuth from './Pages/SelectAuth.jsx'

const router = createBrowserRouter([
  {
    path: '/Siskoolbe/',
    element: <App />,

    children: [
      {

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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
