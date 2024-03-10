import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Jewellery from './Jewellery.jsx'
import JewelleryList from './JewelleryList.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/jewellery",
    element: <Jewellery/>,
    children: [
      {
        path: "/jewellery/:pageNumber",
        element: <JewelleryList />
        
      }, 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
