import React, { useEffect, useState } from "react";
import Layout from "./../Components/Layout";
import { useParams } from "react-router-dom";
import {
  BookAppoinmentRoute,
  BookingAvailabilityRoute,
  SingleDoctorDataRoute,
} from "../Utilities/API-Routes";
import axios from "axios";
import styled from "styled-components";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../Redux/Features/alertSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingPage = () => {
  // State
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isAvailable, setIsAvailable] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // This is to get Doctors Info
  const getSingleDoctorData = async () => {
    const { data } = await axios.post(
      SingleDoctorDataRoute,
      { doctorId: params.id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (data?.success) {
      setDoctor(data.doctor);
    }
  };

  // This is to book the appoinment
  const handleBookAppoinment = async (event) => {
    event.preventDefault();
    if (!date || !time) {
      return toast.error(
        "Enter Date And Time To Book Appoinment",
        toastOptions
      );
    }
    dispatch(showLoading());
    const { data } = await axios.post(
      BookAppoinmentRoute,
      {
        doctorId: params.id,
        userId: user._id,
        date,
        time,
        userInfo: user,
        doctorInfo: doctor,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    dispatch(hideLoading());
  };

  // This is to Check the Availability
  const handleAvailability = async (event) => {
    event.preventDefault();
    if (!date || !time) {
      return toast.error(
        "Enter Date And Time To Check Availability",
        toastOptions
      );
    }
    dispatch(showLoading());
    const { data } = await axios.post(
      BookingAvailabilityRoute,
      {
        doctorId: params.id,
        time,
        date,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    dispatch(hideLoading());
    if (data?.success) {
      setIsAvailable(true);
      toast.success(data.message, toastOptions);
    } else {
      toast.error(data.message, toastOptions);
    }
  };

  useEffect(() => {
    getSingleDoctorData();
  }, []);

  return (
    <Layout>
      {doctor && (
        <>
          <Container>
            <h1>Book Appoinment</h1>
            <div className="appoinment-info">
              <div className="row">
                <div className="col-md-7">
                  <h2>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h2>
                  <h4>
                    <b>Specialization:</b> {doctor.specialization}
                  </h4>
                  <h4>
                    <b>Experience:</b> {doctor.experience}
                  </h4>
                  <h4>
                    <b>Fees Per Consultation:</b> ${doctor.feesPerCustomer}
                  </h4>
                  <h4>
                    <b>Timings:</b>{" "}
                    {doctor.timings[0] + " - " + doctor.timings[1]}
                  </h4>
                </div>
                <div className="col-md-5">
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <DatePicker
                      className="date-picker"
                      onChange={(value) => {
                        setDate(dayjs(value).format("DD-MM-YY"));
                      }}
                    />
                    <TimePicker
                      format={"HH:mm"}
                      className="time-range-picker"
                      onChange={(value) => {
                        setTime(dayjs(value).format("HH:mm"));
                      }}
                    />
                    <div className="button-box">
                      <button onClick={handleAvailability}>
                        Check Availability
                      </button>
                      <button onClick={handleBookAppoinment}>
                        Book Appoinment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <ToastContainer />
        </>
      )}
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: white;
    text-align: center;
    margin: 2rem 0rem;
  }
  .appoinment-info {
    border-radius: 1rem;
    padding: 1.5rem;
    padding-left: 4rem;
    background-color: #176b87;
    width: 80%;
    margin: 1rem;
    margin-top: 4rem;
    h2 {
      margin: 1rem 0;
      margin-bottom: 2rem;
    }
    h4 {
      color: #e0d0d0dd;
      b {
        color: white;
        margin-right: 1.4rem;
      }
    }
    .ant-picker {
      background-color: #00000076;
      border: none;
      &:hover {
        border: none;
      }
    }
    .ant-picker-active-bar {
      background-color: #ffffff7d;
      border-radius: 1rem;
    }
    .ant-picker-input {
      svg {
        color: #176b87;
      }
      input {
        color: white;
        &::placeholder {
          color: white;
        }
      }
    }
    .anticon-swap-right {
      svg {
        color: #176b87;
      }
    }
    .anticon-clock-circle {
      svg {
        color: #176b87;
      }
    }
  }
  .date-picker {
    width: 100%;
    margin: 0.6rem 0rem;
  }
  .time-range-picker {
    width: 100%;
    margin: 0.6rem 0rem;
  }
  .button-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
    button {
      text-transform: uppercase;
      padding: 0.4rem 4rem;
      margin: 0.6rem;
      border: none;
      border-radius: 1rem;
      color: #ffffff;
      background-color: #00000076;
      transition: 400ms ease-in-out;
      &:hover {
        background-color: #00000060;
      }
    }
  }
`;

export default BookingPage;
