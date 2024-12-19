import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { 
  createBrowserRouter, 
  RouterProvider, 
  Route,  
} from "react-router-dom";
import Homepage from './routes/Homepage.jsx';
import Write from './routes/Write.jsx';
import SinglePostpage from './routes/SinglePostpage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import RegisterPage from './routes/RegisterPage.jsx';
import PostListPage from './routes/PostListPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/post",
        element: <PostListPage />
      },
      {
        path: "/:slug",
        element: <SinglePostpage />
      },
      {
        path: "/write",
        element: <Write />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
