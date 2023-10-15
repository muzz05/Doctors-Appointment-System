import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  GetAllApprovedDoctorsRoute,
  GetUserRoute,
} from "../Utilities/API-Routes";
import Layout from "../Components/Layout";
import styled from "styled-components";
import DoctorListItem from "../Components/DoctorListItem";

const HomePage = () => {
  // States
  const [doctors, setDoctors] = useState([]);

  // This to get the user data
  const getUserData = async () => {
    const { data } = await axios.post(
      GetUserRoute,
      {},
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
    );
  };

  // This is to get all the Doctors Data
  const getDoctorsData = async () => {
    const { data } = await axios.get(GetAllApprovedDoctorsRoute, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (data?.success) {
      setDoctors(data.doctors);
    }
  };

  useEffect(() => {
    getUserData();
    getDoctorsData();
  }, []);
  return (
    <Layout>
      <Container>
        <h1>Home</h1>
        <div className="doctors-list">
          <div className="row">
            {doctors &&
              doctors.map((doctor) => {
                return (
                  <div
                    className="col-md-3"
                    key={`Doctor-item-Home-${doctor._id}`}
                  >
                    <DoctorListItem doctor={doctor} />
                  </div>
                );
              })}
          </div>
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
  .doctors-list {
    margin: 2rem;
  }
`;

export default HomePage;
