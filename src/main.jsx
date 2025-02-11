import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './routes/Home.jsx'
import Pessoa from './routes/Pessoa.jsx'
import Verification from './routes/Verification.jsx'
import Card from './routes/Card.jsx'
import Finished from './routes/Finished.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/client/:type',
        element: <Pessoa />
      },
      {
        path: '/verification/:type',
        element: <Verification />
      },
      {
        path: '/embed',
        element: <Card />
      },
      {
        path: '/finished',
        element: <Finished />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
