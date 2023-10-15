import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../Assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { RegisterRoute } from "../Utilities/API-Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/Features/alertSlice";

const Register = () => {
  // States
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // This is to Handle Changes in the Input feild
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // This is to Register the user
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading());
      const { name, email, password } = values;
      const { data } = await axios.post(RegisterRoute, {
        name,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        navigate("/login");
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Some Error Occured", toastOptions);
    }
  };

  return (
    <>
      <Container>
        <div className="register-container">
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>CWM Doctor's Appointment</h1>
          </div>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
            <h3>
              Already have an Account ?
              <Link to="/login">
                <b>Login</b>
              </Link>
            </h3>
            <button type="submit">Register</button>
          </form>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  background-color: #04364a;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
  width: 100vw;
  .register-container {
    background-color: #00000076;
    border-radius: 1rem;
    padding: 1rem;
    .brand {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      margin: 2rem 0;
      gap: 1rem;
      img {
        height: 4rem;
      }
      h1 {
        text-align: center;
        font-size: 3rem;
        color: white;
      }
    }
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 2rem;
      input {
        display: block;
        width: 80%;
        padding: 0.4rem 1rem;
        border-radius: 1rem;
        outline: none;
        font-size: 1.3rem;
        background-color: transparent;
        border: 2px solid #176b87;
        color: white;
      }
      h3 {
        color: white;
        font-size: 1.2rem;
        text-transform: uppercase;
      }
      a {
        text-decoration: none;
        color: #64ccc5;
        text-transform: uppercase;
        text-decoration: solid;
        margin: 0 1rem;
      }
      button {
        text-transform: uppercase;
        text-decoration: solid;
        padding: 0.2rem 2rem;
        font-size: 1.5rem;
        border: 1px solid black;
        border-radius: 1rem;
        color: #ffffff;
        background-color: #176b87;
        transition: 400ms ease-in-out;
        &:hover {
          background-color: #176b87b9;
        }
      }
    }
  }
`;

export default Register;
