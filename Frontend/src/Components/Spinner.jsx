import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Container>
      <div className="d-flex justify-content-center">
        <div className="spinner-border spinner-styled" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #04364a;
  .spinner-styled {
    color: #ffffff6f;
  }
`;

export default Spinner;
