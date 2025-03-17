import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Dashboard } from '../pages/Dashboard'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'userRegister',
    element: <Register />,
    errorElement: <div> Hubo un error!!</div>,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    errorElement: <div> Hubo un error!!</div>,
  },
])

export const CustomRouterProvider = () => (
  <RouterProvider router={router}></RouterProvider>
)
