import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
    createBrowserRouter, Router,
    RouterProvider
} from "react-router-dom";
import ListShifts from "./s3/pve/ListShifts";
import ShiftPage from "./s3/pve/ShiftPage";
import {GetShift} from "./s3/pve/getShift";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/three/salmon",
                element: <ListShifts/>
            },
            {
                path: "/three/salmon/:userId/:shiftId",
                element: <ShiftPage/>,
                //@ts-ignore
                loader: GetShift
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
