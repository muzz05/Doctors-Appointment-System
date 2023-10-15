import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DoctorListItem = ({ doctor }) => {
  // States
  const navigate = useNavigate();

  return (
    <Container>
      <div
        className="doctor-card"
        onClick={() => {
          navigate(`/book-appointment/${doctor._id}`);
        }}
      >
        <div className="full-name">
          <h5>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h5>
        </div>
        <div className="doctor-info">
          <p>
            <b>Specialization:</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience:</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation:</b> ${doctor.feesPerCustomer}
          </p>
          <p>
            <b>Timings:</b> {doctor.timings[0] + " - " + doctor.timings[1]}
          </p>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .doctor-card {
    cursor: pointer;
    border-radius: 1rem;
    background-color: #176b87;
    .full-name {
      border-bottom: 1px solid #00000076;
      h5 {
        padding: 1rem;
        margin: 0;
      }
    }
    .doctor-info {
      padding: 0.8rem;
      border-radius: 0 0 1rem 1rem;
      background-color: #547986c8;
    }
  }
`;

export default DoctorListItem;
