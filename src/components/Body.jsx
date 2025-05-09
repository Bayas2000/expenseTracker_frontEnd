import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Login'
import Main from './Main'
import '../index.css'
import SignUp from './Signup'

const body = () => {

  const appRouter = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <SignUp />
    },
    {
      path: '/home',
      element: <Main />
    }
  ])


  return (
    <div >
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default body