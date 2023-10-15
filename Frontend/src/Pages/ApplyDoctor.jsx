import React, { useState } from "react";
import Layout from "./../Components/Layout";
import styled from "styled-components";
import { TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../Redux/Features/alertSlice";
import axios from "axios";
import { ApplyDoctorRoute } from "../Utilities/API-Routes";
import moment from "moment";
import dayjs from "dayjs";

const ApplyDoctor = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    specialization: "",
    experience: "",
    feesPerCustomer: 0,
    timings: undefined,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // This is to Handle Changes in the Input feild
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // This is to Handle Time Change
  const handleTimeChange = (value, dateString) => {
    setValues({
      ...values,
      timings: [...value],
    });
  };

  // This is to Apply for Doctor
  const handleApplyDoctor = async (e) => {
    e.preventDefault();
    dispatch(showLoading());
    const { data } = await axios.post(
      ApplyDoctorRoute,
      {
        ...values,
        userId: user._id,
        timings: [
          dayjs(values.timings[0]).format("HH:mm"),
          dayjs(values.timings[1]).format("HH:mm"),
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch(hideLoading());
    if (data.success) {
      navigate("/");
    }
  };
  return (
    <Layout>
      <Container>
        <h1>Apply Doctor</h1>
        <div className="form-section">
          <h2>Personal Details:</h2>
          <div className="form row">
            <div className="col-md-4 input-block">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Your First Name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-4 input-block">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Your Last Name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-4 input-block">
              <label htmlFor="phone">Phone number</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Your Phone Number"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-4 input-block">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-4 input-block">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                name="website"
                id="website"
                placeholder="Your Website"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-4 input-block">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Your Address"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="form-section">
          <h2>Professional Details:</h2>
          <div className="form row">
            <div className="col-md-4 input-block">
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                name="specialization"
                id="specialization"
                placeholder="Your Specialization"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-4 input-block">
              <label htmlFor="experience">Experience</label>
              <input
                type="text"
                name="experience"
                id="experience"
                placeholder="Your Experience"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-4 input-block">
              <label htmlFor="feesPerCustomer">Fees Per Customer</label>
              <input
                type="text"
                name="feesPerCustomer"
                id="feesPerCustomer"
                placeholder="Your Fees Per Customer"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-4 input-block">
              <label htmlFor="timings">Timings</label>
              <TimePicker.RangePicker
                format={"HH:mm"}
                onChange={handleTimeChange}
                value={values.timings}
                showTime={{
                  format: "HH:mm",
                }}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="app-button" onClick={handleApplyDoctor}>
            Sumbit
          </button>
        </div>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  h1 {
    color: white;
    text-align: center;
    margin: 2rem 0rem;
  }
  h2 {
    color: white;
    margin: 2rem 1rem;
  }
  .form-section {
    margin: 1rem;
  }
  .form {
    .input-block {
      margin: 0.5rem 0rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      color: white;
      width: 90%;
      background-color: #176b87;
      outline: none;
      border: none;
      margin-bottom: 1.3rem;
      border-radius: 1rem;
      padding: 0.3rem 0.9rem;
      &::placeholder {
        color: #ffffff7d;
      }
    }
    .ant-picker {
      background-color: #176b87;
      border: none;
      &:hover {
        border: none;
      }
    }
    .ant-picker-active-bar {
      background-color: #ffffff7d;
      border-radius: 1rem;
    }
  }
  .app-button {
    background-color: #176b87;
    padding: 0.3rem 1.3rem;
    font-size: 1.2rem;
    color: white;
    border-radius: 1rem;
    border: none;
    outline: none;
    transition: 500ms ease-in-out;
    &:hover {
      background-color: #176b87b9;
    }
  }
`;

export default ApplyDoctor;
