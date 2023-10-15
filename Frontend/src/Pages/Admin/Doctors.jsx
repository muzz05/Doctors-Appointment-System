import React, { useState, useEffect } from "react";
import Layout from "./../../Components/Layout";
import {
  ChangeAccountStatusRoute,
  GetAllDoctorsRoute,
} from "../../Utilities/API-Routes";
import axios from "axios";
import styled from "styled-components";

const Doctors = () => {
  // States
  const [doctors, setDoctors] = useState([]);

  // This is to fetch all the users
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(GetAllDoctorsRoute, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data?.success) {
        setDoctors(data?.doctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // This is to handle change in Account Status
  const handleChangeAccountStatus = async (doctorId, status) => {
    const { data } = await axios.post(
      ChangeAccountStatusRoute,
      { doctorId, status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    getAllDoctors();
  };

  // This is to fetch the data when the page is first loaded
  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <Layout>
      <Container>
        <h1> Doctors List</h1>
        <div className="doctors-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors?.map((doctor) => {
                return (
                  <tr key={doctor._id}>
                    <td>{doctor.firstName + " " + doctor.lastName}</td>
                    <td>{doctor.status}</td>
                    <td>{doctor.phone}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleChangeAccountStatus(doctor._id, "Approved");
                        }}
                      >
                        {doctor.status === "Pending" ? "Approve" : "Reject"}
                      </button>
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
  .doctors-table {
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

export default Doctors;
