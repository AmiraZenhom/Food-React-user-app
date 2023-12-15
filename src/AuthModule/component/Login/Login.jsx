//eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import Logo from "../../../assets/images/1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext, UserAuth } from "../../../Context/AuthContext";
import GoogleButton from "react-google-button";
import PreLoader from "../../../SharedModule/Component/PreLoader/PreLoader";

// eslint-disable-next-line react/prop-types
export default function Login({ saveUserData }) {
  const [showLoading, setShowLoading] = useState(false);
  // const { googleSignIn, user } = UserAuth();
  const { googleSignIn, user } = UserAuth();

  const { baseUrl } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate("/dashboard");
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setShowLoading(true);
    axios
      .post(`${baseUrl}/Users/Login`, data)
      .then((Response) => {
        setTimeout(toast("Wow Login !"), 2000);
        localStorage.setItem("userToken", Response.data.token);
        saveUserData();
        setShowLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast(error?.response?.data?.message || "error");
        setShowLoading(false);
      });
  };
  return showLoading ? (
    <div className="prePosition">
      {" "}
      <PreLoader />
    </div>
  ) : (
    <>
      <div className="Auth-container container-fluid  ">
        <div className="row bg-overLay vh-100 justify-content-center align-items-center  ">
          <div className="col-md-6 ">
            <div className=" bg-white p-2">
              <div className="logo text-center">
                <img className="w-25" src={Logo} alt="logo " />
              </div>
              <form
                className=" w-75  m-auto  "
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2>Log In</h2>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>

                <div className="form-group ">
                  <input
                    type="email"
                    className="form-control my-4"
                    placeholder="Enter Your E-mail"
                    {...register("email", { required: true })}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <span className="w-75 text-danger">email is required</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control my-2"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span className="w-75 text-danger">
                      password is required
                    </span>
                  )}
                </div>
                <div className="my-2 d-flex justify-content-between">
                  <Link to="/register">
                    <p>Register Now?</p>
                  </Link>
                  <Link to="/requestPass">
                    <p>Forgot Password?</p>
                  </Link>
                </div>
                <button className="btn btn-success w-100 my-1">Login</button>
                <div>
                  <div>
                    <div className="max-w-[240px] m-auto py-4 ms-5">
                      <GoogleButton onClick={handleGoogleSignIn} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
