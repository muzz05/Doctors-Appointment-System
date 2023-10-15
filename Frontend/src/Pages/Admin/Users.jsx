import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { DeleteUserRoute, GetAllUsersRoute } from "../../Utilities/API-Routes";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  // States
  const [users, setUsers] = useState([]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // This is to fetch all the users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(GetAllUsersRoute, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // This is to delete the user
  const handleDeleteUser = async (id) => {
    const { data } = await axios.delete(`${DeleteUserRoute}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (data?.success) {
      toast.success(data.message, toastOptions);
      getAllUsers();
    }
  };

  // This is to fetch the data when the page is first loaded
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <Container>
        <h1> Users List</h1>
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Doctor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isDoctor ? "Yes" : "No"}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDeleteUser(user._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
      <ToastContainer />
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
  .users-table {
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

export default Users;
