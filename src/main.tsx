import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
    createBrowserRouter, Router,
    RouterProvider
} from "react-router-dom";
import ListShifts from "./s3/pve/ListShifts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/three/salmon",
        element: <ListShifts/>
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
