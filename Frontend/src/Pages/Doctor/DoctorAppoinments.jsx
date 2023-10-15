import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import {
  GetDoctorAppoinmentsRoute,
  UpdateAppoinmentStatusRoute,
} from "../../Utilities/API-Routes";
import styled from "styled-components";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import axios from "axios";

const DoctorAppoinments = () => {
  // States
  const [appoinments, setAppoinments] = useState([]);
  const { user } = useSelector((state) => state.user);

  // This is to get all the user appoinments
  const getAllDoctorAppoinments = async () => {
    const { data } = await axios.post(
      GetDoctorAppoinmentsRoute,
      { userId: user?._id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (data?.success) {
      setAppoinments(data.appoinments);
    }
    getAllDoctorAppoinments();
  };

  // This is to change the status of the Appoinment
  const handleChangeStatus = async (appoinmentId, status) => {
    const { data } = await axios.post(
      UpdateAppoinmentStatusRoute,
      { appoinmentId, status },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    getAllDoctorAppoinments();
  };

  useEffect(() => {
    getAllDoctorAppoinments();
  }, []);

  return (
    <Layout>
      <Container>
        <h1>Doctor Appoinments</h1>
        <div className="appoinment-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appoinments?.map((appoinment) => {
                return (
                  <tr key={appoinment.doctorId + appoinment.userId}>
                    <td>{appoinment.doctorId}</td>
                    <td>{appoinment.status}</td>
                    <td>{appoinment.userInfo.name}</td>
                    <td>{dayjs(appoinment.date).format("DD-MM-YY")}</td>
                    <td>{dayjs(appoinment.time).format("HH:mm")}</td>
                    <td>
                      {appoinment.status === "Pending" && (
                        <>
                          <button
                            onClick={() => {
                              handleChangeStatus(appoinment._id, "Approved");
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              handleChangeStatus(appoinment._id, "Rejected");
                            }}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    color: white;
    text-align: center;
    margin: 2rem 0rem;
  }
  .appoinment-table {
    width: 90%;
    table {
      width: 100%;
      border-collapse: collapse;
      th {
        background-color: #176b87;
        padding: 0.5rem 1rem;
        border: 1px solid #176b87;
      }
      td {
        padding: 0.3rem 1rem;
        border: 1px solid #176b87;
        button {
          background-color: #176b87;
          padding: 0.3rem 0.7rem;
          margin: 0.3rem 0.3rem;
          font-size: 1rem;
          color: white;
          border-radius: 1rem;
          border: none;
          outline: none;
          transition: 500ms ease-in-out;
          &:hover {
            background-color: #176b87b9;
          }
        }
      }
    }
  }
`;

export default DoctorAppoinments;
