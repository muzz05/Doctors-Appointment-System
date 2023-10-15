import React from "react";
import styled from "styled-components";
import Logo from "../Assets/logo.svg";
import { AdminMenu, UserMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

const Layout = ({ children }) => {
  // States
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Doctor Menu Details
  const DoctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor/appoinments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // Rendering Menu List
  const SidebarMenu = user?.isAdmin
    ? AdminMenu
    : user?.isDoctor
    ? DoctorMenu
    : UserMenu;

  return (
    <Main>
      <div className="sidebar">
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h3>CWM Doc Appointment</h3>
        </div>
        <hr />
        <div className="menu">
          {SidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
          <div className="menu-item">
            <i className="fa-solid fa-right-from-bracket"></i>
            <Link
              onClick={() => {
                localStorage.clear();
              }}
              to="/login"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="header">
          <div className="user-info">
            <Badge count={user?.notification.length} size="small">
              <i
                className="fa-solid fa-bell"
                onClick={() => {
                  navigate("/notification");
                }}
              ></i>
            </Badge>
            <Link to="/profile">{user?.name}</Link>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </Main>
  );
};

const Main = styled.div`
  background-color: #04364a;
  display: grid;
  grid-template-columns: 20% 80%;
  height: 100vh;
  width: 100vw;
  .sidebar {
    background-color: #00000076;
    margin: 1rem;
    border-radius: 1rem;
    padding: 1rem;
    .brand {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      img {
        height: 2.5rem;
      }
      h3 {
        text-align: center;
        color: white;
      }
    }
    hr {
      color: #176b87;
    }
    .menu {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      .menu-item {
        display: flex;
        align-items: center;
        border-radius: 1rem;
        i {
          color: white;
          font-size: 1.3rem;
          padding: 0.7rem;
        }
        a {
          color: white;
          text-decoration: none;
          font-size: 1.3rem;
          padding: 0rem 1rem;
        }
      }
      .active {
        background-color: #176b87;
      }
    }
  }
  .content {
    margin: 1rem 1rem 0rem 0rem;
    .header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 10vh;
      background-color: #00000076;
      margin-bottom: 1rem;
      border-radius: 1rem;
      padding: 1rem;
      color: white;
      i {
        padding: 0.2rem;
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
      }
      a {
        color: white;
        text-decoration: none;
        font-size: 1.3rem;
        padding: 0rem 1.4rem;
      }
    }
    .body {
      background-color: #00000076;
      border-radius: 1rem;
      padding: 1rem;
      color: white;
      height: 85vh;
      overflow-y: auto;
    }
  }
  @media screen and (min-width: 900px) and (max-width: 1200px) {
    grid-template-columns: 30% 70%;
  }
  @media screen and (min-width: 1200px) and (max-width: 1460px) {
    grid-template-columns: 25% 75%;
  }
`;

export default Layout;
