import { useContext, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgetPass from "./AuthModule/component/ForgetPass/ForgetPass";
import Login from "./AuthModule/component/Login/Login";
import Register from "./AuthModule/component/Register/Register";
import RequestPass from "./AuthModule/component/RequestPass/RequestPass";
import ResetPassword from "./AuthModule/component/ResetPassword/ResetPassword";
import Favorites from "./FavoritesModule/Component/Favorites/Favorites";
import Home from "./HomeModule/Component/Home/Home";
import Recipes from "./RecipesModule/Component/Recipes/Recipes";
import AuthLayout from "./SharedModule/Component/AuthLayout/AuthLayout";
import Header from "./SharedModule/Component/Header/Header";
import MasterLayout from "./SharedModule/Component/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Component/NotFound/NotFound";
import ProtectedRoute from "./SharedModule/Component/ProtectedRoute/ProtectedRoute";
import { AuthContext } from "./Context/AuthContext";
import VerfiyEmail from "./AuthModule/component/verfiyEmail/verfiyEmail";

useState;
function App() {
  let { userData, saveUserData } = useContext(AuthContext);
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute userData={userData}>
          <MasterLayout userData={userData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: "true", element: <Home /> },
        { path: "/dashboard/favorites", element: <Favorites /> },

        { path: "/dashboard/Recipes", element: <Recipes /> },
      ],
    },

    {
      path: "/",
      element: <AuthLayout userData={userData} />,
      errorElement: <NotFound />,
      children: [
        { index: "true", element: <Login saveUserData={saveUserData} /> },
        { path: "/login", element: <Login saveUserData={saveUserData} /> },
        { path: "/forgetPass", element: <ForgetPass /> },
        { path: "/requestPass", element: <RequestPass /> },
        { path: "/verfiy", element: <VerfiyEmail /> },
        { path: "/resetPassword", element: <ResetPassword /> },
        {
          path: "/register",
          element: <Register />,
        },
        { path: "/header", element: <Header /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
