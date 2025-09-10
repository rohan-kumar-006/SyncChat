import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/home/Home'
import Login from './pages/authentication/Login'
import Signup from './pages/authentication/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoutes>
                <Home />  
              </ProtectedRoutes>) 
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Signup />
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <App />
  </Provider >
)
