import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import Chats from "./components/chats/Chats"
import ChatHome from "./components/chat/Home"
import ChatPage from "./components/chat/ChatPage"
import { createClient } from "@supabase/supabase-js";

import { BrowserRouter as Router, Route } from "react-router-dom"
import  Integrate  from "./Integrate";
//import socketIO from 'socket.io-client';
//const socket = socketIO.connect('http://localhost:4000');

function App() {
  const supabase = createClient("https://hbegcuuhguxmddbkyktw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZWdjdXVoZ3V4bWRkYmt5a3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3Mzg1OTEsImV4cCI6MTk5OTMxNDU5MX0.sDI46hOTnVntEEdpklm3D2hnoGhoNobTNtx0qzLjKQU");

  const currentUser = supabase.auth.admin.getUserById(1)



  //const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={"light"}>
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
       
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
   
    {
      path: "/chat",
      element: <Integrate />,
    },
    {
      path: "/register",
      element: <Register />,
    },
   
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
