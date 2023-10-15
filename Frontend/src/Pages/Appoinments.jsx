import React, { useEffect, useState } from "react";
import Layout from "./../Components/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import { GetUserAppoinmnentsRoute } from "./../Utilities/API-Routes";
import styled from "styled-components";
import dayjs from "dayjs";

const Appoinments = () => {
  // States
  const [appoinments, setAppoinments] = useState([]);
  const { user } = useSelector((state) => state.user);

  // This is to get all the user appoinments
  const getAllUserAppoinments = async () => {
    const { data } = await axios.post(
      GetUserAppoinmnentsRoute,
      { userId: user?._id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (data?.success) {
      setAppoinments(data.appoinments);
    }
  };

  useEffect(() => {
    getAllUserAppoinments();
  }, []);

  return (
    <Layout>
      <Container>
        <h1>Appoinments</h1>
        <div className="appoinment-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {appoinments?.map((appoinment) => {
                return (
                  <tr key={appoinment.doctorId + appoinment.userId}>
                    <td>{appoinment.doctorId}</td>
                    <td>{appoinment.status}</td>
                    <td>
                      {appoinment.doctorInfo.firstName +
                        " " +
                        appoinment.doctorInfo.lastName}
                    </td>
                    <td>{dayjs(appoinment.date).format("DD-MM-YY")}</td>
                    <td>{dayjs(appoinment.time).format("HH:mm")}</td>
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
          margin: 0.3rem auto;
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

export default Appoinments;
