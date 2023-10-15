import React from "react";
import Layout from "../Components/Layout";
import { Badge, Tabs } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../Redux/Features/alertSlice";
import axios from "axios";
import {
  DeleteAllNotificationRoute,
  GetAllNotificationRoute,
} from "../Utilities/API-Routes";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This is to mark all read
  const handleMarkAllRead = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        GetAllNotificationRoute,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      window.location.reload();
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  // This is to delete all messages
  const handleDeleteAllRead = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        DeleteAllNotificationRoute,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      window.location.reload();
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  return (
    <Layout>
      <Container>
        <h1>Notification</h1>
        <Tabs>
          <Tabs.TabPane
            tab={
              <Badge
                count={user?.seenNotification.length}
                className="ant-tabs-tab-btn "
              >
                Seen
              </Badge>
            }
            key={0}
          >
            <div className="d-flex justify-content-end">
              <button className="app-button" onClick={handleDeleteAllRead}>
                Delete All
              </button>
            </div>
            <div className="content">
              {user?.seenNotification.map((notificationMsg) => {
                return (
                  <div
                    key={notificationMsg.message.length}
                    className="notification"
                    onClick={() => navigate(notificationMsg.data.onClickPath)}
                  >
                    {notificationMsg.message}
                  </div>
                );
              })}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <Badge
                count={user?.notification.length}
                className="ant-tabs-tab-btn "
              >
                Unseen
              </Badge>
            }
            key={1}
          >
            <div className="d-flex justify-content-end">
              <button className="app-button" onClick={handleMarkAllRead}>
                Mark All As Read
              </button>
            </div>
            <div className="content">
              {user?.notification.map((notificationMsg) => {
                return (
                  <div
                    key={notificationMsg.message.length}
                    className="notification"
                    onClick={() => navigate(notificationMsg.data.onClickPath)}
                  >
                    {notificationMsg.message}
                  </div>
                );
              })}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  h1 {
    color: white;
    text-align: center;
    margin-top: 2rem;
  }
  .ant-tabs-tab {
    padding: 0.5rem 1rem;
  }
  .ant-tabs-ink-bar {
    background-color: #176b87;
  }
  .ant-tabs-tab-btn {
    color: white;
    font-size: 1.4rem;
    padding: 0.3rem;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #176b87;
    font-size: 1.4rem;
  }
  .app-button {
    background-color: #176b87;
    margin: 0.8rem 0rem;
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
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    .notification {
      font-size: 1.1rem;
      padding: 0.4rem 0.8rem;
      margin: 0.3rem 0rem;
      border-radius: 0.5rem;
      color: white;
      background-color: #04364a;
      cursor: pointer;
    }
  }
`;

export default NotificationPage;
