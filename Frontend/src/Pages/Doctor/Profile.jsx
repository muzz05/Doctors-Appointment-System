import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TimePicker } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetDoctorDataRoute,
  UpdateDoctorDataRoute,
} from "../../Utilities/API-Routes";
import moment from "moment";
import dayjs from "dayjs";

const Profile = () => {
  // States
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  // This is to Get the Doctors data
  const GetDoctorData = async () => {
    const { data } = await axios.post(
      GetDoctorDataRoute,
      { userId: params.id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (data?.success) {
      setDoctor(data?.doctor);
    }
  };

  // This is to Handle Changes in the Input feild
  const handleChange = (event) => {
    setDoctor({ ...doctor, [event.target.name]: event.target.value });
  };

  // This is to Handle Time Change
  const handleTimeChange = (value, dateString) => {
    setDoctor({ ...doctor, timings: [...value] });
  };

  // This is to update the doctor data
  const handleUpdateDoctorData = async () => {
    const { data } = await axios.post(
      UpdateDoctorDataRoute,
      {
        ...doctor,
        timings: [
          dayjs(doctor.timings[0]).format("HH:mm"),
          dayjs(doctor.timings[1]).format("HH:mm"),
        ],
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (data.success) {
      navigate("/");
    }
  };

  useEffect(() => {
    GetDoctorData();
  }, []);

  return (
    <Layout>
      {doctor && (
        <Container>
          <h1>Manage Profile</h1>
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
                  value={doctor.firstName}
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
                  value={doctor.lastName}
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
                  value={doctor.phone}
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
                  value={doctor.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-md-4 input-block">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  value={doctor.website}
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
                  value={doctor.address}
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
                  value={doctor.specialization}
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
                  value={doctor.experience}
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
                  value={doctor.feesPerCustomer}
                  placeholder="Your Fees Per Customer"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-md-4 input-block">
                <label htmlFor="timings">Timings</label>
                <TimePicker.RangePicker
                  format={"HH:mm"}
                  defaultValue={[
                    dayjs(doctor.timings[0], "HH:mm"),
                    dayjs(doctor.timings[1], "HH:mm"),
                  ]}
                  onChange={handleTimeChange}
                  showTime={{
                    format: "HH:mm",
                  }}
                  onOk={handleTimeChange}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button className="app-button" onClick={handleUpdateDoctorData}>
              Sumbit
            </button>
          </div>
        </Container>
      )}
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

export default Profile;
